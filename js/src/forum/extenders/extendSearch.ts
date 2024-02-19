import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import Search, { SearchSource } from 'flarum/forum/components/Search';
import SolutionSearchSource from '../components/SolutionSearchSource';

export default function extendSearch() {
  extend(Search.prototype, 'sourceItems', function (items: ItemList<SearchSource>) {
    if (app.forum.attribute<boolean>('solutionSearchEnabled')) {
      items.add('solution', new SolutionSearchSource(), 110);
    }
  });
}
