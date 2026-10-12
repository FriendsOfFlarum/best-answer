import app from 'flarum/common/app';
import { BooleanGambit } from 'flarum/common/query/IGambit';

export default class QuestionGambit extends BooleanGambit {
  key(): string {
    return app.translator.trans('fof-best-answer.lib.gambits.qna.key', {}, true);
  }

  filterKey(): string {
    return 'qna';
  }
}
