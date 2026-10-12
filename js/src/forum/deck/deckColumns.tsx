import app from 'flarum/forum/app';
import extractText from 'flarum/common/utils/extractText';
import type Discussion from 'flarum/common/models/Discussion';
import type Post from 'flarum/common/models/Post';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import DeckColumns from 'ext:flarum/deck/forum/extenders/DeckColumns';
import DiscussionListSource from 'ext:flarum/deck/forum/columns/DiscussionListSource';
import PostListSource from 'ext:flarum/deck/forum/columns/PostListSource';
import type { DeckRealtimeEvent, DeckRealtimeResult } from 'ext:flarum/deck/forum/columns/DeckColumnType';

/** Broadcast through flarum/realtime when a best answer is set or removed (see extend.php). */
export const BEST_ANSWER_EVENT = 'bestAnswerEvent';

const hasQnATags = (): boolean => app.store.all<Tag>('tags').some((tag) => tag.isQnA());

/** From the post's own data, so it works without the discussion loaded. */
const discussionIdOf = (post: Post): string | undefined => (post.data as any)?.relationships?.discussion?.data?.id;

/** `hasBestAnswer` holds the best answer's post id. */
const isBestAnswer = (post: Post, discussion: Discussion): boolean => String(discussion.hasBestAnswer()) === post.id();

const isQuestion = (discussion: Discussion): boolean => {
  const tags = discussion.tags();

  return Array.isArray(tags) && tags.some((tag) => tag?.isQnA());
};

/**
 * Deck's classes only exist while it's enabled, so the sources extending them
 * are declared when this runs, not when the module loads.
 */
export default function deckColumns(): DeckColumns {
  class UnsolvedQuestionsSource extends DiscussionListSource {
    constructor() {
      super({ filter: { qna: true, '-solved-discussions': true } }, (discussion) => !discussion.hasBestAnswer());
    }

    onRealtime(event: DeckRealtimeEvent): DeckRealtimeResult {
      const discussion = event.discussion;

      if (event.name !== BEST_ANSWER_EVENT || !discussion) return super.onRealtime(event);

      const shown = this.shows(discussion);

      if (discussion.hasBestAnswer()) {
        if (!shown) return;

        this.removeFromList(discussion);

        return 'updated';
      }

      if (shown) return 'updated';

      // Reopened, it belongs here again, though its last activity may be older than anything shown.
      if (isQuestion(discussion)) {
        this.moveToTop(discussion);

        return 'inserted';
      }
    }
  }

  class BestAnswersSource extends PostListSource {
    constructor() {
      super({ filter: { solution: true } });
    }

    // A new post is never already a best answer.
    protected matches(): boolean {
      return false;
    }

    protected mayMatchNewDiscussion(): boolean {
      return false;
    }

    onRealtime(event: DeckRealtimeEvent): DeckRealtimeResult {
      const discussion = event.discussion;

      if (event.name !== BEST_ANSWER_EVENT || !discussion) return super.onRealtime(event);

      // A discussion has one best answer, so any other of its posts shown here was replaced or removed.
      const replaced = this.shownPosts().filter((post) => discussionIdOf(post) === discussion.id() && !isBestAnswer(post, discussion));

      replaced.forEach((post) => this.removePost(post.id()!));

      const answer = discussion.hasBestAnswer() ? app.store.getById<Post>('posts', String(discussion.hasBestAnswer())) : undefined;

      if (answer && this.insert(answer)) return 'inserted';

      return replaced.length ? 'updated' : undefined;
    }

    prune(): void {
      const stale = this.shownPosts().filter((post) => {
        const discussion = app.store.getById<Discussion>('discussions', discussionIdOf(post) ?? '');

        return discussion && !isBestAnswer(post, discussion);
      });

      if (!stale.length) return;

      stale.forEach((post) => this.removePost(post.id()!));
      this.refill();
    }

    protected shownPosts(): Post[] {
      return this.state.getPages().flatMap((page) => page.items);
    }
  }

  return new DeckColumns()
    .add(
      'fof-best-answer-unsolved',
      {
        icon: 'far fa-circle-question',
        label: () => extractText(app.translator.trans('fof-best-answer.forum.deck.unsolved_questions')),
        title: () => extractText(app.translator.trans('fof-best-answer.forum.deck.unsolved_questions')),
        isAvailable: hasQnATags,
        createSource: () => new UnsolvedQuestionsSource(),
      },
      34
    )
    .add(
      'fof-best-answer-best-answers',
      {
        icon: 'fas fa-check',
        label: () => extractText(app.translator.trans('fof-best-answer.forum.deck.best_answers')),
        title: () => extractText(app.translator.trans('fof-best-answer.forum.deck.best_answers')),
        isAvailable: hasQnATags,
        createSource: () => new BestAnswersSource(),
      },
      33
    );
}
