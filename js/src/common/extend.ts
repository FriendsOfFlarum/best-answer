import Extend from 'flarum/common/extenders';
import Tag from 'flarum/tags/common/models/Tag';

export default [
  new Extend.Model(Tag) //
    .attribute<boolean>('isQnA')
    .attribute<boolean>('reminders'),
];
