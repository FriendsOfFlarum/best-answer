import app from 'flarum/forum/app';
import highlight from 'flarum/common/helpers/highlight';
import Discussion from 'flarum/common/models/Discussion';
import Link from 'flarum/common/components/Link';
import LinkButton from 'flarum/common/components/LinkButton';
import { SearchSource } from 'flarum/forum/components/Search';
import type Mithril from 'mithril';
import BestAnswerBadge from './BestAnswerBadge';
import tagsLabel from 'flarum/tags/helpers/tagsLabel';

export default class SolutionSearchSource implements SearchSource {
  protected results = new Map<string, Discussion[]>();

  async search(query: string): Promise<void> {
    query = query.toLowerCase();

    this.results.set(query, []);

    const params = {
      filter: { q: query + ' is:solved' },
      page: { limit: 3 },
      include: 'mostRelevantPost,bestAnswerPost,tags',
    };

    return app.store.find<Discussion[]>('discussions', params).then((results) => {
      this.results.set(query, results);
      m.redraw();
    });
  }

  view(query: string): Array<Mithril.Vnode> {
    query = query.toLowerCase();

    const results = (this.results.get(query) || []).map((discussion) => {
      const bestAnswerPost = discussion.bestAnswerPost();
      const mostRelevantPost = discussion.mostRelevantPost();
      const tags = discussion.tags();

      return (
        <li className="SolutionSearchResult DiscussionSearchResult" data-index={'discussions' + discussion.id()}>
          <Link href={app.route.discussion(discussion, (bestAnswerPost && bestAnswerPost.number()) || 0)}>
            <div className="SolutionSearchResult-tags">{tagsLabel(tags)}</div>
            <div className="DiscussionSearchResult-title">{highlight(discussion.title(), query)}</div>
            {!!mostRelevantPost && (
              <div className="DiscussionSearchResult-excerpt">{highlight(mostRelevantPost.contentPlain() ?? '', query, 100)}</div>
            )}
            {!!bestAnswerPost && (
              <div className="DiscussionSearchResult-excerpt SolutionSearchResult-bestAnswer">
                {highlight(bestAnswerPost.contentPlain() ?? '', query, 100)}
              </div>
            )}
          </Link>
        </li>
      );
    }) as Array<Mithril.Vnode>;

    return [
      <li className="Dropdown-header">
        <BestAnswerBadge /> {app.translator.trans('fof-best-answer.forum.search.discussions_solutions_heading')}
      </li>,
      <li>
        <LinkButton icon="fas fa-search" href={app.route('index', { q: query + ' is:solved' })}>
          {app.translator.trans('fof-best-answer.forum.search.all_discussions_solutions_button', { query })}
        </LinkButton>
      </li>,
      ...results,
    ];
  }
}
