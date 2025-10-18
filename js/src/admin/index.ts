import app from 'flarum/admin/app';
import addBestAnswerCountSort from '../common/addBestAnswerCountSort';

export { default as extend } from './extend';

app.initializers.add(
  'fof-best-answer',
  () => {
    addBestAnswerCountSort();
  },
  5
);
