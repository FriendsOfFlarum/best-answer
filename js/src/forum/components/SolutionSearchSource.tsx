import app from 'flarum/forum/app';
import Discussion from 'flarum/common/models/Discussion';
import LinkButton from 'flarum/common/components/LinkButton';
import { SearchSource } from 'flarum/forum/components/Search';
import type Mithril from 'mithril';
import BestAnswerBadge from './BestAnswerBadge';
import SolutionSearchItem from './SolutionSearchItem';

export default class SolutionSearchSource implements SearchSource {
  protected results = new Map<string, Discussion[]>();
  queryString: string | null = null;

  async search(query: string): Promise<void> {
    query = query.toLowerCase();

    this.results.set(query, []);

    this.setQueryString(query);

    const params = {
      filter: { q: this.queryString || query },
      page: { limit: this.limit() },
      include: this.includes().join(','),
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
      /** @ts-ignore */
      const tags = discussion.tags();

      return (
        <SolutionSearchItem query={query} discussion={discussion} bestAnswerPost={bestAnswerPost} mostRelevantPost={mostRelevantPost} tags={tags} />
      );
    }) as Array<Mithril.Vnode>;

    return [
      <li className="Dropdown-header">
        <BestAnswerBadge /> {app.translator.trans('fof-best-answer.forum.search.discussions_solutions_heading')}
      </li>,
      <li>
        <LinkButton icon="fas fa-search" href={app.route('index', { q: this.queryString })}>
          {app.translator.trans('fof-best-answer.forum.search.all_discussions_solutions_button', { query })}
        </LinkButton>
      </li>,
      ...results,
    ];
  }

  includes(): string[] {
    return ['mostRelevantPost', 'bestAnswerPost', 'tags'];
  }

  limit(): number {
    return 3;
  }

  queryMutators(): string[] {
    return ['is:solved'];
  }

  setQueryString(query: string): void {
    this.queryString = query + ' ' + this.queryMutators().join(' ');
  }
}
