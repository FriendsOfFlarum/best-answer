import { BooleanGambit } from 'flarum/common/query/IGambit';
export default class BestAnswerGambit extends BooleanGambit {
    key(): string;
    filterKey(): string;
}
