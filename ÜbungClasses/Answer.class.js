"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
var Answer = /** @class */ (function () {
    function Answer() {
        this._answer = "";
        this._isCorrect = false;
    }
    Object.defineProperty(Answer.prototype, "answer", {
        get: function () {
            return this._answer;
        },
        set: function (answer) {
            this._answer = answer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Answer.prototype, "isCorrect", {
        get: function () {
            return this._isCorrect;
        },
        set: function (isCorrect) {
            this._isCorrect = isCorrect;
        },
        enumerable: false,
        configurable: true
    });
    Answer.prototype.showSolution = function () {
    };
    return Answer;
}());
exports.Answer = Answer;
