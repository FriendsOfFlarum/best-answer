import { BooleanGambit } from 'flarum/common/query/IGambit';
export default class QuestionGambit extends BooleanGambit {
    key(): string;
    filterKey(): string;
}
