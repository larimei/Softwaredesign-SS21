"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionaryStatistics = void 0;
var FileHandler_1 = __importDefault(require("./Handler/FileHandler"));
var QuestionStatistic_class_1 = require("./QuestionStatistic.class");
var QuestionaryStatistics = /** @class */ (function () {
    function QuestionaryStatistics(questionary) {
        this.questions = [];
        var data = FileHandler_1.default.readArrayFile("QuestionaryStatistics.json");
        var found = data.find(function (element) { return element.id == questionary.id; });
        if (found !== undefined) {
            for (var _i = 0, _a = questionary.questions; _i < _a.length; _i++) {
                var question = _a[_i];
                var questionStatistic = new QuestionStatistic_class_1.QuestionStatistic(questionary, question);
                this.questions.push(questionStatistic);
            }
            this.id = found.id;
            this.doneTimes = found.doneTimes;
            this.title = found.title;
        }
        else {
            this.title = questionary.title;
            this.doneTimes = 0;
            this.id = questionary.id;
            for (var _b = 0, _c = questionary.questions; _b < _c.length; _b++) {
                var question = _c[_b];
                var questionStatistic = new QuestionStatistic_class_1.QuestionStatistic(questionary, question);
                this.questions.push(questionStatistic);
            }
            FileHandler_1.default.addData("QuestionaryStatistics.json", this);
        }
    }
    QuestionaryStatistics.prototype.setQuestionaryStatistic = function () {
        this.doneTimes++;
        FileHandler_1.default.changeData("QuestionaryStatistics.json", this.id, this);
    };
    QuestionaryStatistics.prototype.setAnswer = function (question, answer) {
        var found = this.questions.findIndex(function (element) { return element.title == question; });
        this.questions[found].setAnswerStatistic(answer);
    };
    return QuestionaryStatistics;
}());
exports.QuestionaryStatistics = QuestionaryStatistics;
