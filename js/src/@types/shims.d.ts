import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';
import Tag from 'flarum/tags/common/models/Tag';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';

declare module 'flarum/common/models/Discussion' {
  export default interface Discussion {
    hasBestAnswer(): boolean;
    bestAnswerPost(): Post;
    bestAnswerUser(): User;
    canSelectBestAnswer(): boolean;
    bestAnswerSetAt(): Date;
  }
}

declare module 'flarum/tags/common/models/Tag' {
  export default interface Tag {
    isQnA(): boolean;
    reminders(): boolean;
  }
}

declare module 'flarum/forum/states/DiscussionListState' {
  export default interface DiscussionListState {
    bestAnswer: string;
  }
}
