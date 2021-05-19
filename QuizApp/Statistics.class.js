"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistics = void 0;
var Statistics = /** @class */ (function () {
    function Statistics() {
        this._playedGames = 0;
        this._amountRightAnswers = 0;
        this._amountAnswers = 0;
    }
    Object.defineProperty(Statistics.prototype, "playedGames", {
        get: function () {
            return this._playedGames;
        },
        set: function (playedGames) {
            this._playedGames = playedGames;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Statistics.prototype, "amountRightAnswers", {
        get: function () {
            return this._amountRightAnswers;
        },
        set: function (amountRightAnswers) {
            this._amountRightAnswers = amountRightAnswers;
        },
        enumerable: false,
        configurable: true
    });
    Statistics.prototype.viewStats = function () {
    };
    return Statistics;
}());
exports.Statistics = Statistics;
