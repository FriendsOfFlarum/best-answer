import Badge, { IBadgeAttrs } from 'flarum/common/components/Badge';
import app from 'flarum/forum/app';

export default class BestAnswerBadge extends Badge {
  static initAttrs(attrs: IBadgeAttrs) {
    attrs.type = 'bestAnswer';
    attrs.icon = 'fas fa-check';
    attrs.label = app.translator.trans('fof-best-answer.forum.answered_badge') as string;
  }
}
