import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import SolvedFilter from '../components/SolvedFilter';
import type Tag from 'flarum/tags/common/models/Tag';

export default function extendIndexPage() {
  extend(IndexSidebar.prototype, 'items', function (items) {
    const tag = app.currentTag();

    if (!tag?.isQnA?.()) return;

    const canStartDiscussion = app.forum.attribute<boolean>('canStartDiscussion') || !app.session.user;

    if (!items.has('newDiscussion')) return;

    const cta = items.get('newDiscussion');
    cta.children = app.translator.trans(
      canStartDiscussion ? 'fof-best-answer.forum.index.ask_question' : 'fof-best-answer.forum.index.cannot_ask_question'
    );

    if (items.has('startDiscussion')) {
      items.setContent('startDiscussion', cta);
    }
  });

  extend(IndexPage.prototype, 'viewItems', function (items) {
    const currentTag: Tag | undefined = app.currentTag();

    if (!currentTag) return;

    items.add('solved-filter', <SolvedFilter currentTag={currentTag} />);
  });
}
