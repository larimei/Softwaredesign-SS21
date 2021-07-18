"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerStatistic = void 0;
var FileHandler_1 = __importDefault(require("./Handler/FileHandler"));
var AnswerStatistic = /** @class */ (function () {
    function AnswerStatistic(questionary, question, answer) {
        this.amount = 0;
        this.answer = answer;
        var data = FileHandler_1.default.readArrayFile("QuestionaryStatistics.json");
        var dataQuestionary = data.find(function (element) { return element.id == questionary.id; });
        if (dataQuestionary) {
            var dataQuestion = dataQuestionary.questions.find(function (element) { return element.title == question.question; });
            var foundAnswer = dataQuestion.answers.find(function (element) { return element.answer == answer; });
            this.amount = foundAnswer.amount;
        }
    }
    AnswerStatistic.prototype.addAnswer = function () {
        this.amount++;
    };
    return AnswerStatistic;
}());
exports.AnswerStatistic = AnswerStatistic;
