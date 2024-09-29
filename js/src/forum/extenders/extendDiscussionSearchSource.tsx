import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionsSearchSource from 'flarum/forum/components/DiscussionsSearchSource';

export default function extendDiscussionsSearchSource() {
  extend(DiscussionsSearchSource.prototype, 'queryMutators', function (mutators: string[]) {
    // This will only apply when using flarum/core 1.8.6 or newer
    if (app.forum.attribute<boolean>('solutionSearchEnabled')) {
      mutators.push('-is:solved');
    }
  });
}
