import 'flarum/common/models/Discussion'
import 'flarum/tags/common/models/Tag'
import 'flarum/forum/states/DiscussionListState'
import 'flarum/common/models/User'

import type Post from 'flarum/common/models/Post';
import type Discussion from 'flarum/common/models/Discussion';
import type User from 'flarum/common/models/User';
import type Tag from 'flarum/tags/common/models/Tag';
import type DiscussionListState from 'flarum/forum/states/DiscussionListState';

declare module 'flarum/common/models/Discussion' {
  export default interface Discussion {
    hasBestAnswer(): boolean | undefined;
    bestAnswerPost(): Post | null;
    bestAnswerUser(): User | null;
    canSelectBestAnswer(): boolean;
    bestAnswerSetAt(): Date | null;
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
    bestAnswer: string | undefined;
  }
}

declare module 'flarum/common/models/User' {
  export default interface User {
    bestAnswerCount(): number;
  }
}
