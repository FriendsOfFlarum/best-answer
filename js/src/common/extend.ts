import BestAnswerGambit from './gambits/BestAnswerGambit';
import Extend from 'flarum/common/extenders';
// @ts-ignore
import Tag from 'flarum/tags/models/Tag';

export default [
  new Extend.Model(Tag) //
    .attribute<boolean>('isQnA')
    .attribute<boolean>('reminders'),
  new Extend.Search().gambit('discussions', BestAnswerGambit),
];
