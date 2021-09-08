import app from 'flarum/admin/app';
import EditTagModal from 'flarum/tags/components/EditTagModal';
import { extend } from 'flarum/common/extend';
import Stream from 'flarum/utils/Stream';
import Model from 'flarum/Model';
import Tag from 'flarum/tags/models/Tag';

export default function () {
    if (app.initializers.has('flarum-tags')) {
        Tag.prototype.isQnA = Model.attribute('isQnA');
        Tag.prototype.reminders = Model.attribute('reminders');

        extend(EditTagModal.prototype, 'oninit', function () {
            this.isQnA = Stream(this.tag.isQnA() || false);
            this.reminders = Stream(this.tag.reminders() || false);
        });

        extend(EditTagModal.prototype, 'fields', function (items) {
            items.add(
                'qna',
                <div className="Form-group">
                    <div>
                        <label className="checkbox">
                            <input type="checkbox" bidi={this.isQnA} />
                            {app.translator.trans('fof-best-answer.admin.edit_tag.qna_label')}
                        </label>
                    </div>
                </div>,
                10
            );

            items.add(
                'reminders',
                <div className="Form-group">
                    <div>
                        <label className="checkbox">
                            <input type="checkbox" bidi={this.reminders} />
                            {app.translator.trans('fof-best-answer.admin.edit_tag.reminders')}
                        </label>
                    </div>
                </div>
            );
        });

        extend(EditTagModal.prototype, 'submitData', function (data) {
            data.isQnA = this.isQnA();
            data.reminders = this.reminders();
        });
    }
}
