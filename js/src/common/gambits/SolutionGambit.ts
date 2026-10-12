import app from 'flarum/common/app';
import { BooleanGambit } from 'flarum/common/query/IGambit';

export default class SolutionGambit extends BooleanGambit {
  key(): string {
    return app.translator.trans('fof-best-answer.lib.gambits.solution.key', {}, true);
  }

  filterKey(): string {
    return 'solution';
  }
}
