import { BooleanGambit } from 'flarum/common/query/IGambit';
export default class SolutionGambit extends BooleanGambit {
    key(): string;
    filterKey(): string;
}
