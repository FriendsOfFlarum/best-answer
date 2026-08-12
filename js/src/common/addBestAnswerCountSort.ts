import { extend } from 'flarum/common/extend';

export default function addBestAnswerCountSort() {
  // Extended by import path rather than by prototype: the user directory lazy
  // loads its page and everything it pulls in, SortMap included, so the module
  // does not exist yet when this runs. Passing the path defers the extension
  // until the chunk is loaded — and does nothing at all if the extension is
  // not installed, which is why no guard is needed here.
  extend('ext:fof/user-directory/common/utils/SortMap', 'sortMap', function (map: Record<string, string>) {
    map.most_best_answers = '-bestAnswerCount';
    map.least_best_answers = 'bestAnswerCount';
  });
}
