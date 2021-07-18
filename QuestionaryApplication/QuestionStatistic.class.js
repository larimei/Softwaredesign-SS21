"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionStatistic = void 0;
var AnswerStatistic_class_1 = require("./AnswerStatistic.class");
var QuestionStatistic = /** @class */ (function () {
    function QuestionStatistic(questionary, question) {
        this.title = "";
        this.answers = [];
        this.title = question.question;
        for (var _i = 0, _a = question.answers; _i < _a.length; _i++) {
            var answer = _a[_i];
            var answerStatistic = new AnswerStatistic_class_1.AnswerStatistic(questionary, question, answer);
            this.answers.push(answerStatistic);
        }
    }
    QuestionStatistic.prototype.setAnswerStatistic = function (answer) {
        var found = this.answers.findIndex(function (element) { return element.answer == answer; });
        this.answers[found].addAnswer();
    };
    return QuestionStatistic;
}());
exports.QuestionStatistic = QuestionStatistic;
