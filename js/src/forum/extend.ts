import Discussion from 'flarum/common/models/Discussion';
import commonExtend from '../common/extend';
import Extend from 'flarum/common/extenders';
import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';
import deckColumns from './deck/deckColumns';

export default [
  ...commonExtend,

  new Extend.Model(Discussion) //
    .hasOne<Post>('bestAnswerPost')
    .hasOne<User>('bestAnswerUser')
    .attribute<number | false>('hasBestAnswer')
    .attribute('bestAnswerSetAt', Model.transformDate),

  new Extend.Model(User) //
    .attribute<number>('bestAnswerCount'),

  new Extend.Model(Post) //
    .attribute<boolean>('canSelectAsBestAnswer'),

  ...('flarum-deck' in flarum.extensions ? [deckColumns()] : []),
];
