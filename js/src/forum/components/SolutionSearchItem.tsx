import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Link from 'flarum/common/components/Link';
import highlight from 'flarum/common/helpers/highlight';
import Discussion from 'flarum/common/models/Discussion';
import type Post from 'flarum/common/models/Post';
import type Mithril from 'mithril';
import tagsLabel from 'flarum/tags/common/helpers/tagsLabel';
import ItemList from 'flarum/common/utils/ItemList';
import type Tag from 'flarum/tags/common/models/Tag';

export interface SolutionSearchItemAttrs extends ComponentAttrs {
  query: string;
  discussion: Discussion;
  bestAnswerPost: Post;
  mostRelevantPost: Post;
  tags: false | (Tag | undefined)[];
}

export default class SolutionSearchItem extends Component<SolutionSearchItemAttrs> {
  query!: string;
  discussion!: Discussion;
  bestAnswerPost!: Post | null | undefined;
  mostRelevantPost!: Post | null | undefined;
  tags!: false | (Tag | undefined)[];

  oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
    super.oninit(vnode);

    this.query = this.attrs.query;
    this.discussion = this.attrs.discussion;
    this.bestAnswerPost = this.attrs.bestAnswerPost;
    this.mostRelevantPost = this.attrs.mostRelevantPost;
    this.tags = this.attrs.tags;
  }

  view() {
    return (
      <li className="SolutionSearchResult DiscussionSearchResult" data-index={'discussions' + this.discussion.id()}>
        <Link href={app.route.discussion(this.discussion, (this.bestAnswerPost && this.bestAnswerPost.number()) || 0)}>
          {this.viewItems().toArray()}
        </Link>
      </li>
    );
  }

  discussionTitle() {
    return this.discussion.title();
  }

  bestAnswerContent() {
    return this.bestAnswerPost?.contentPlain();
  }

  mostRelevantContent() {
    return this.mostRelevantPost?.contentPlain();
  }

  viewItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    app.forum.attribute<boolean>('showTagsInSearchResults') &&
      items.add('tags', <div className="SolutionSearchResult-tags">{tagsLabel(this.tags)}</div>, 100);

    items.add('discussion-title', <div className="DiscussionSearchResult-title">{highlight(this.discussionTitle(), this.query)}</div>, 90);

    !!this.mostRelevantPost &&
      items.add(
        'most-relevant',
        <div className="DiscussionSearchResult-excerpt">{highlight(this.mostRelevantContent() ?? '', this.query, 100)}</div>,
        80
      );

    !!this.bestAnswerPost &&
      items.add(
        'best-answer',
        <div className="DiscussionSearchResult-excerpt SolutionSearchResult-bestAnswer">
          {highlight(this.bestAnswerContent() ?? '', this.query, 100)}
        </div>,
        70
      );

    return items;
  }
}
