import { override } from 'flarum/common/extend';
import SortMap from 'ext:fof-user-directory/common/utils/SortMap';

export default () => {
  if (SortMap) return;

  override(SortMap.prototype, 'sortMap', (map) => ({
    ...map(),
    most_best_answers: '-bestAnswerCount',
    least_best_answers: 'bestAnswerCount',
  }));
};
