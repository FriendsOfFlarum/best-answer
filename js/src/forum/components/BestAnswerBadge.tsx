import Badge, { IBadgeAttrs } from 'flarum/common/components/Badge';
import app from 'flarum/forum/app';
import extractText from 'flarum/common/utils/extractText';

export default class BestAnswerBadge extends Badge {
  static initAttrs(attrs: IBadgeAttrs) {
    attrs.type = 'bestAnswer';
    attrs.icon = 'fas fa-check';
    attrs.label = extractText(app.translator.trans('fof-best-answer.forum.answered_badge'));
  }
}
