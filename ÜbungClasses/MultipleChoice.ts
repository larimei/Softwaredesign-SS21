import { Answer } from './Answer.class';
import { Question } from './Question.class';

export class MultipleChoice extends Question {
    _answers: string[] =[];
    _rightAnswer: string = "";
}