import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';

export default function extendIndexPage() {
  extend(IndexPage.prototype, 'sidebarItems', function (items) {
    const tag = this.currentTag();

    if (!tag?.isQnA?.()) return;

    const canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;
    const cta = items.get('newDiscussion');
    cta.children = app.translator.trans(
      canStartDiscussion ? 'fof-best-answer.forum.index.ask_question' : 'fof-best-answer.forum.index.cannot_ask_question'
    );

    if (items.has('startDiscussion')) {
      items.setContent('startDiscussion', cta);
    }
  });

  extend(IndexPage.prototype, 'viewItems', function (items) {
    if (!app.forum.attribute('showBestAnswerFilterUi')) {
      return;
    }

    const tag = this.currentTag();

    if (!tag?.isQnA?.()) {
      if (app.discussions.bestAnswer) {
        delete app.discussions.bestAnswer;
        app.discussions.refresh();
      }

      return;
    }

    const options = ['all', 'solved', 'unsolved'];

    const selected = app.discussions.bestAnswer as unknown as number;

    items.add(
      'solved-filter',
      Dropdown.component(
        {
          buttonClassName: 'Button',
          label: app.translator.trans(
            `fof-best-answer.forum.filter.${options[selected] || Object.keys(options).map((key) => options[Number(key)])[0]}_label`
          ),
          accessibleToggleLabel: app.translator.trans('fof-best-answer.forum.filter.accessible_label'),
        },
        Object.keys(options).map((value) => {
          const label = options[Number(value)];
          const active = (selected || Object.keys(options)[0]) === value;

          return Button.component(
            {
              icon: active ? 'fas fa-check' : true,
              active: active,
              onclick: () => {
                app.discussions.bestAnswer = value;
                if (value === '0') {
                  delete app.discussions.bestAnswer;
                }
                app.discussions.refresh();
              },
            },
            app.translator.trans(`fof-best-answer.forum.filter.${label}_label`)
          );
        })
      )
    );
  });
}
