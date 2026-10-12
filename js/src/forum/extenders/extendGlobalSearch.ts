import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import GlobalSearch, { type GlobalSearchSource } from 'flarum/forum/components/GlobalSearch';
import type ItemList from 'flarum/common/utils/ItemList';
import SolutionSearchSource from '../components/SolutionSearchSource';

export default function extendGlobalSearch() {
  extend(GlobalSearch.prototype, 'sourceItems', function (items: ItemList<GlobalSearchSource>) {
    if (app.forum.attribute<boolean>('solutionSearchEnabled')) {
      items.add('solutions', new SolutionSearchSource(), 90);
    }
  });
}
