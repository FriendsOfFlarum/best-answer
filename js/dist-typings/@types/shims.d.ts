import 'flarum/common/models/Discussion';
import 'ext:flarum/tags/common/models/Tag';
import 'flarum/forum/states/DiscussionListState';
import 'flarum/common/models/User';

import type Post from 'flarum/common/models/Post';
import type Discussion from 'flarum/common/models/Discussion';
import type User from 'flarum/common/models/User';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import type DiscussionListState from 'flarum/forum/states/DiscussionListState';

declare module 'flarum/common/models/Discussion' {
  export default interface Discussion {
    /** The best answer post's id, or false when there is none. */
    hasBestAnswer(): number | false;
    bestAnswerPost(): Post | false;
    bestAnswerUser(): User | false;
    bestAnswerSetAt(): Date | null;
  }
}

declare module 'ext:flarum/tags/common/models/Tag' {
  export default interface Tag {
    isQnA(): boolean;
    qnaReminders(): boolean;
  }
}

declare module 'flarum/forum/states/DiscussionListState' {
  export default interface DiscussionListState {
    /** The solved filter's selected option: '1' for solved, '2' for unsolved, unset for all. */
    bestAnswer?: string;
  }
}

declare module 'flarum/common/models/User' {
  export default interface User {
    bestAnswerCount(): number;
  }
}

declare module 'flarum/common/models/Post' {
  export default interface Post {
    canSelectAsBestAnswer(): boolean;
  }
}
