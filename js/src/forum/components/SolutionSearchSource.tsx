import app from 'flarum/forum/app';
import LinkButton from 'flarum/common/components/LinkButton';
import extractText from 'flarum/common/utils/extractText';
import type Discussion from 'flarum/common/models/Discussion';
import type Post from 'flarum/common/models/Post';
import type { GlobalSearchSource } from 'flarum/forum/components/GlobalSearch';
import type Mithril from 'mithril';
import BestAnswerGambit from '../../common/gambits/BestAnswerGambit';
import SolutionSearchItem from './SolutionSearchItem';

export default class SolutionSearchSource implements GlobalSearchSource {
  protected results = new Map<string, Discussion[]>();

  public resource: string = 'discussions';

  title(): string {
    return extractText(app.translator.trans('fof-best-answer.forum.search.solutions_heading'));
  }

  isCached(query: string): boolean {
    return this.results.has(query.toLowerCase());
  }

  async search(query: string, limit: number): Promise<void> {
    query = query.toLowerCase();

    this.results.set(query, []);

    const params = {
      filter: { q: this.solvedQuery(query) },
      page: { limit },
      include: 'mostRelevantPost,bestAnswerPost,tags',
    };

    return app.store.find<Discussion[]>('discussions', params).then((results) => {
      this.results.set(query, results);
      m.redraw();
    });
  }

  solvedQuery(query: string): string {
    return `${query} ${new BestAnswerGambit().fromFilter('', false)}`;
  }

  view(query: string): Array<Mithril.Vnode> {
    query = query.toLowerCase();

    return (this.results.get(query) || []).map((discussion) => <SolutionSearchItem query={query} discussion={discussion} />) as Array<Mithril.Vnode>;
  }

  customGrouping(): boolean {
    return false;
  }

  fullPage(query: string): Mithril.Vnode {
    const filter = app.search.gambits.apply('discussions', { q: this.solvedQuery(query) });
    const q = filter.q || null;
    delete filter.q;

    return (
      <li>
        <LinkButton icon="fas fa-search" href={app.route('index', { q, filter })}>
          {app.translator.trans('fof-best-answer.forum.search.all_discussions_solutions_button', { query })}
        </LinkButton>
      </li>
    );
  }

  gotoItem(id: string): string | null {
    const discussion = app.store.getById<Discussion>('discussions', id);

    if (!discussion) return null;

    return app.route.discussion(discussion, (discussion.bestAnswerPost() as Post | null | undefined)?.number());
  }
}
