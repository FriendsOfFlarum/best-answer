import BestAnswerGambit from './gambits/BestAnswerGambit';
import QuestionGambit from './gambits/QuestionGambit';
import SolutionGambit from './gambits/SolutionGambit';
import Extend from 'flarum/common/extenders';
import Tag from 'ext:flarum/tags/common/models/Tag';

export default [
  new Extend.Model(Tag) //
    .attribute<boolean>('isQnA')
    .attribute<boolean>('qnaReminders'),
  new Extend.Search() //
    .gambit('discussions', BestAnswerGambit)
    .gambit('discussions', QuestionGambit)
    .gambit('posts', SolutionGambit),
];
