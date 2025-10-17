import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import GlobalSearch, { GlobalSearchSource } from 'flarum/common/components/GlobalSearch';
import SolutionGlobalSearchSource from '../components/SolutionGlobalSearchSource';

export default function extendSearch() {
  extend(GlobalSearch.prototype, 'sourceItems', function (items: ItemList<GlobalSearchSource>) {
    if (app.forum.attribute<boolean>('solutionSearchEnabled')) {
      items.add('solution', new SolutionGlobalSearchSource(), 110);
    }
  });
}
