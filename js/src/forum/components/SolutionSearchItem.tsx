import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Link from 'flarum/common/components/Link';
import highlight from 'flarum/common/helpers/highlight';
import ItemList from 'flarum/common/utils/ItemList';
import type Discussion from 'flarum/common/models/Discussion';
import type Post from 'flarum/common/models/Post';
import type Mithril from 'mithril';
import tagsLabel from 'ext:flarum/tags/common/helpers/tagsLabel';

export interface SolutionSearchItemAttrs extends ComponentAttrs {
  query: string;
  discussion: Discussion;
}

export default class SolutionSearchItem extends Component<SolutionSearchItemAttrs> {
  view() {
    const discussion = this.attrs.discussion;

    return (
      <li className="SolutionSearchResult DiscussionSearchResult" data-index={'solutions' + discussion.id()} data-id={discussion.id()}>
        <Link href={app.route.discussion(discussion, this.bestAnswerPost()?.number())}>{this.viewItems().toArray()}</Link>
      </li>
    );
  }

  bestAnswerPost(): Post | null | undefined {
    return this.attrs.discussion.bestAnswerPost() as Post | null | undefined;
  }

  viewItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();
    const { discussion, query } = this.attrs;
    const mostRelevantPost = discussion.mostRelevantPost();
    const bestAnswerPost = this.bestAnswerPost();

    if (app.forum.attribute<boolean>('showTagsInSearchResults')) {
      items.add('tags', <div className="SolutionSearchResult-tags">{tagsLabel(discussion.tags() || [])}</div>, 100);
    }

    items.add('title', <div className="SolutionSearchResult-title">{highlight(discussion.title(), query)}</div>, 90);

    if (mostRelevantPost && mostRelevantPost !== bestAnswerPost) {
      items.add(
        'mostRelevant',
        <div className="SolutionSearchResult-excerpt">{highlight(mostRelevantPost.contentPlain() ?? '', query, 100)}</div>,
        80
      );
    }

    if (bestAnswerPost) {
      items.add(
        'bestAnswer',
        <div className="SolutionSearchResult-excerpt SolutionSearchResult-bestAnswer">
          {highlight(bestAnswerPost.contentPlain() ?? '', query, 100)}
        </div>,
        70
      );
    }

    return items;
  }
}
