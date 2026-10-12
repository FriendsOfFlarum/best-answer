import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import GlobalDiscussionsSearchSource from 'flarum/forum/components/GlobalDiscussionsSearchSource';
import type Discussion from 'flarum/common/models/Discussion';
import BestAnswerGambit from '../../common/gambits/BestAnswerGambit';

export default function extendGlobalDiscussionsSearchSource() {
  // Core 2.x has no query mutator hook, and SearchModal's defaultFilters would
  // prefill the gambit into the visible input. So search with the gambit
  // appended, then re-key the results under the query the modal will view().
  override(GlobalDiscussionsSearchSource.prototype, 'search', function (this: GlobalDiscussionsSearchSource, original, query: string, limit: number) {
    if (!app.forum.attribute<boolean>('removeSolutionResultsFromMainSearch')) {
      return original(query, limit);
    }

    const results = (this as unknown as { results: Map<string, Discussion[]> }).results;
    const key = query.toLowerCase();
    const unsolvedQuery = `${key} ${new BestAnswerGambit().fromFilter('', true)}`;

    results.set(key, []);

    return original(unsolvedQuery, limit).then(() => {
      results.set(key, results.get(unsolvedQuery.toLowerCase()) ?? []);
      results.delete(unsolvedQuery.toLowerCase());
    });
  });
}
