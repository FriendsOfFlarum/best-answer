import { override } from 'flarum/common/extend';

export default () => {
  const FoFUserDirectory = require('@fof-user-directory');

  if (!FoFUserDirectory) return;

  override(FoFUserDirectory.SortMap.prototype, 'sortMap', (map) => ({
    ...map(),
    most_best_answers: '-bestAnswerCount',
    least_best_answers: 'bestAnswerCount',
  }));
};
