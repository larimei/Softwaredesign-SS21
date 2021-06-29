export class Statistics {
    private _playedGames: number = 0;
    private _amountRightAnswers: number = 0;
    private _amountAnswers: number = 0;

    public get playedGames() {
        return this._playedGames
    }

    public set playedGames(playedGames: number) {
      this._playedGames = playedGames;
    }

    public get amountRightAnswers() {
        return this._amountRightAnswers
    }

    public set amountRightAnswers(amountRightAnswers: number) {
        this._amountRightAnswers = amountRightAnswers;
    }

    public viewStats() {
    }   
}