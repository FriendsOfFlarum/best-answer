import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionsSearchSource from 'flarum/forum/components/DiscussionsSearchSource';

export default function extendDiscussionsSearchSource() {
  @ts-ignore
  extend(DiscussionsSearchSource.prototype, 'queryMutators', function (mutators: string[]) {
    // This will only apply when using flarum/core 1.8.6 or newer
    if (app.forum.attribute<boolean>('removeSolutionResultsFromMainSearch')) {
      mutators.push('-is:solved');
    }
  });
}
