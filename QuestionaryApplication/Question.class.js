"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
var QuestionType_enum_1 = require("./QuestionType.enum");
var Question = /** @class */ (function () {
    function Question() {
        this._question = "";
        this._questionType = QuestionType_enum_1.QuestionType.MultipleChoice;
    }
    Object.defineProperty(Question.prototype, "question", {
        get: function () {
            return this._question;
        },
        set: function (question) {
            this._question = question;
        },
        enumerable: false,
        configurable: true
    });
    Question.prototype.showAnswer = function () {
    };
    Question.prototype.selectAnswer = function () {
    };
    Question.prototype.typeInANswer = function () {
    };
    return Question;
}());
exports.Question = Question;
