import { Answer } from "./Answer.class";
import { QuestionType } from "./QuestionType.enum";

export class Question{
    private _question: string = "";
    private _questionType: QuestionType = QuestionType.MultipleChoice;

    public get question() {
        return this._question;
    }

    public set question(question: string) {
        this._question = question;
    }

    public showAnswer() {
    }

    public selectAnswer() {        
    }

    public typeInANswer() {        
    }
}