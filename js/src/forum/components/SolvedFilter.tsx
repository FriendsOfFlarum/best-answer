import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';

export interface SolvedFilterAttrs extends ComponentAttrs {}

export default class SolvedFilter extends Component<SolvedFilterAttrs> {
  view() {
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
              app.discussions.refresh();
            },
          },
          app.translator.trans(`fof-best-answer.forum.filter.${label}_label`)
        );
      })
    );
  }
}
