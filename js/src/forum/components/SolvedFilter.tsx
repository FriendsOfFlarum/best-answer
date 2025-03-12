import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';
import type Tag from 'flarum/tags/common/models/Tag';

export interface SolvedFilterAttrs extends ComponentAttrs {
  currentTag: Tag;
  alwaysShow?: boolean;
}

export default class SolvedFilter extends Component<SolvedFilterAttrs> {
  view() {
    if (!this.shouldShowFilter()) return null;

    const selected = app.discussions.bestAnswer as unknown as number;
    const options = ['all', 'solved', 'unsolved'];

    return Dropdown.component(
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
              this.reloadDiscussions();
            },
          },
          app.translator.trans(`fof-best-answer.forum.filter.${label}_label`)
        );
      })
    );
  }

  reloadDiscussions(): void {
    app.discussions.refresh();
  }

  shouldShowFilter() {
    const { currentTag, alwaysShow } = this.attrs;

    if (alwaysShow) return true;

    if (!app.forum.attribute('showBestAnswerFilterUi')) return false;

    if (!currentTag?.isQnA?.()) {
      if (app.discussions.bestAnswer) {
        delete app.discussions.bestAnswer;
        app.discussions.refresh();
      }
      return false;
    }

    return true;
  }
}
