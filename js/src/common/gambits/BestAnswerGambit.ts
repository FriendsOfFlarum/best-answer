import app from 'flarum/common/app';
import { BooleanGambit } from 'flarum/common/query/IGambit';

export default class BestAnswerGambit extends BooleanGambit {
  key(): string {
    return app.translator.trans('fof-best-answer.lib.gambits.solved-discussions.key', {}, true);
  }

  filterKey(): string {
    return 'solved-discussions';
  }
}
