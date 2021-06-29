export class Answer {
    private _answer: string = "";
    private _isCorrect: boolean = false; 

    public get answer() {
        return this._answer;
    }

    public set answer(answer: string) {
        this._answer = answer;
    }

    public get isCorrect() {
        return this._isCorrect;
    }

    public set isCorrect(isCorrect: boolean) {
        this._isCorrect = isCorrect;
    }
    
    showSolution() {
        
    }

}