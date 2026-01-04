import { extend } from 'flarum/common/extend';
import SortMap from 'ext:fof/user-directory/common/utils/SortMap';

export default function addBestAnswerCountSort() {
  if (!SortMap) {
    return;
  }

  extend(SortMap.prototype, 'sortMap', function (map) {
    map.most_best_answers = '-bestAnswerCount';
    map.least_best_answers = 'bestAnswerCount';
  });
};
