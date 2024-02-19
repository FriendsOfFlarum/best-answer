import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';

declare module 'flarum/common/models/Discussion' {
  export default interface Discussion {
    hasBestAnswer(): boolean;
    bestAnswerPost(): Post;
    bestAnswerUser(): User;
    canSelectBestAnswer(): boolean;
    bestAnswerSetAt(): Date;
  }
}
