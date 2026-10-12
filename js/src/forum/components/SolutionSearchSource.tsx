import app from 'flarum/forum/app';
import extractText from 'flarum/common/utils/extractText';
import type Discussion from 'flarum/common/models/Discussion';
import type { GlobalSearchSource } from 'flarum/forum/components/GlobalSearch';
import type Mithril from 'mithril';

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
      filter: { q: query },
      page: { limit },
      include: 'mostRelevantPost,bestAnswerPost,tags',
    };

    return app.store.find<Discussion[]>('discussions', params).then((results) => {
      this.results.set(query, results);
      m.redraw();
    });
  }

  view(query: string): Array<Mithril.Vnode> {
    return [];
  }

  customGrouping(): boolean {
    return false;
  }

  fullPage(query: string): Mithril.Vnode | null {
    return null;
  }

  gotoItem(id: string): string | null {
    return null;
  }
}
