"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
var RegisteredUser_class_1 = require("./RegisteredUser.class");
var Quiz = /** @class */ (function () {
    function Quiz() {
        this._quizTitle = "";
        this._public = false;
        this._questions = [];
        this._creator = new RegisteredUser_class_1.RegisteredUser;
        this._amountOfPlayedTimes = 0;
    }
    Object.defineProperty(Quiz.prototype, "quizTitle", {
        get: function () {
            return this._quizTitle;
        },
        set: function (quizTitle) {
            this._quizTitle = quizTitle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "public", {
        get: function () {
            return this._public;
        },
        set: function (publicVar) {
            this._public = publicVar;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "amountOfPlayedTimes", {
        get: function () {
            return this._amountOfPlayedTimes;
        },
        set: function (amountOfPlayedTimes) {
            this._amountOfPlayedTimes = amountOfPlayedTimes;
        },
        enumerable: false,
        configurable: true
    });
    Quiz.prototype.startQuiz = function () {
    };
    Quiz.prototype.loadQuestions = function () {
    };
    Quiz.prototype.giveResults = function () {
    };
    return Quiz;
}());
exports.Quiz = Quiz;
