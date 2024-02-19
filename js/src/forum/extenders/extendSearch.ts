import { extend } from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import Search, { SearchSource } from 'flarum/forum/components/Search';
import SolutionSearchSource from '../components/SolutionSearchSource';

export default function extendSearch() {
  extend(Search.prototype, 'sourceItems', function (items: ItemList<SearchSource>) {
    items.add('solution', new SolutionSearchSource(), 95);
    items.setPriority('discussions', 100);
    items.setPriority('users', 90);
  });
}
