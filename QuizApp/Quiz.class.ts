import { RegisteredUser } from './RegisteredUser.class';
import { Question } from "./Question.class";


export class Quiz {
    private _quizTitle: string = "";
    private _public: boolean = false;
    private _questions: Question[] = [];
    private _creator: RegisteredUser = new RegisteredUser;
    private _amountOfPlayedTimes: number = 0;

    public get quizTitle() {
        return this._quizTitle;
    }

    public set quizTitle(quizTitle: string) {
        this._quizTitle = quizTitle;
    }

    public get public() {
        return this._public;
    }

    public set public(publicVar: boolean) {
        this._public = publicVar;
    }

    public get amountOfPlayedTimes() {
        return this._amountOfPlayedTimes;
    }

    public set amountOfPlayedTimes(amountOfPlayedTimes: number) {
        this._amountOfPlayedTimes = amountOfPlayedTimes;
    }

    public startQuiz() {
    }

    public loadQuestions() {        
    }

    public giveResults() {
    }    
}