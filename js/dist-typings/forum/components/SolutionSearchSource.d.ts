import Discussion from 'flarum/common/models/Discussion';
import { SearchSource } from 'flarum/forum/components/Search';
import type Mithril from 'mithril';
export default class SolutionSearchSource implements SearchSource {
    protected results: Map<string, Discussion[]>;
    queryString: string | null;
    search(query: string): Promise<void>;
    view(query: string): Array<Mithril.Vnode>;
    includes(): string[];
    limit(): number;
    queryMutators(): string[];
    setQueryString(query: string): void;
}
