import app from 'flarum/forum/app';
import extractText from 'flarum/common/utils/extractText';
import type Discussion from 'flarum/common/models/Discussion';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import DeckColumns from 'ext:flarum/deck/forum/extenders/DeckColumns';
import DiscussionListSource from 'ext:flarum/deck/forum/columns/DiscussionListSource';
import type { DeckRealtimeEvent, DeckRealtimeResult } from 'ext:flarum/deck/forum/columns/DeckColumnType';

/** Broadcast through flarum/realtime when a best answer is set or removed (see extend.php). */
export const BEST_ANSWER_EVENT = 'bestAnswerEvent';

const hasQnATags = (): boolean => app.store.all<Tag>('tags').some((tag) => tag.isQnA());

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

  return new DeckColumns().add(
    'fof-best-answer-unsolved',
    {
      icon: 'far fa-circle-question',
      label: () => extractText(app.translator.trans('fof-best-answer.forum.deck.unsolved_questions')),
      title: () => extractText(app.translator.trans('fof-best-answer.forum.deck.unsolved_questions')),
      isAvailable: hasQnATags,
      createSource: () => new UnsolvedQuestionsSource(),
    },
    34
  );
}
