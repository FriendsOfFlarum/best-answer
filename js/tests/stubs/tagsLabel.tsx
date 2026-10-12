import type Tag from 'ext:flarum/tags/common/models/Tag';

export default function tagsLabel(tags: Tag[]) {
  return <span className="TagsLabel">{tags.map((tag) => tag.name()).join(', ')}</span>;
}
