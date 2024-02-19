import Discussion from 'flarum/common/models/Discussion';
import commonExtend from '../common/extend';
import Extend from 'flarum/common/extenders';
import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';

export default [
  ...commonExtend,

  new Extend.Model(Discussion) //
    .hasOne<Post>('bestAnswerPost')
    .hasOne<User>('bestAnswerUser')
    .attribute<boolean>('hasBestAnswer')
    .attribute<boolean>('canSelectBestAnswer')
    .attribute('bestAnswerSetAt', Model.transformDate),

  new Extend.Model(User) //
    .attribute<number>('bestAnswerCount'),
];
