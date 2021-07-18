"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questionary = void 0;
var ConsoleHandling_1 = __importDefault(require("./Handler/ConsoleHandling"));
var uuid_1 = require("uuid");
var Question_class_1 = require("./Question.class");
var FileHandler_1 = __importDefault(require("./Handler/FileHandler"));
var Questionary = /** @class */ (function () {
    function Questionary(author, id) {
        this.title = "";
        this.startDate = new Date();
        this.endDate = new Date();
        this.questions = [];
        this.authorId = author;
        if (id) {
            var data = FileHandler_1.default.readArrayFile("Questionaries.json");
            var found = data.find(function (element) { return element.id == id; });
            this.id = id;
            this.startDate = new Date(found.startDate);
            this.endDate = new Date(found.endDate);
            this.title = found.title;
            for (var _i = 0, _a = found.questions; _i < _a.length; _i++) {
                var question = _a[_i];
                this.questions.push(new Question_class_1.Question(question.question, question));
            }
        }
        else {
            this.id = uuid_1.v4();
        }
    }
    Questionary.prototype.addInformation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questions, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        questions = [
                            {
                                type: "text",
                                name: "value",
                                message: "What is the title of your questionary?",
                            },
                            {
                                type: "date",
                                name: "value",
                                message: "When is the start date of your questionary?",
                                initial: new Date(Date.now()),
                            },
                            {
                                type: "date",
                                name: "value",
                                message: "When is the end date of your questionary?",
                                initial: new Date(Date.now()),
                            },
                        ];
                        _a = this;
                        return [4 /*yield*/, ConsoleHandling_1.default.question(questions[0])];
                    case 1:
                        _a.title = _f.sent();
                        _b = this;
                        _c = Date.bind;
                        return [4 /*yield*/, ConsoleHandling_1.default.question(questions[1])];
                    case 2:
                        _b.startDate = new (_c.apply(Date, [void 0, _f.sent()]))();
                        _d = this;
                        _e = Date.bind;
                        return [4 /*yield*/, ConsoleHandling_1.default.question(questions[2])];
                    case 3:
                        _d.endDate = new (_e.apply(Date, [void 0, _f.sent()]))();
                        return [4 /*yield*/, this.addQuestions()];
                    case 4:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Questionary.prototype.addQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questions, questionString, question, toggleQuestions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questions = {
                            type: "text",
                            name: "value",
                            message: "What is your question?",
                        };
                        return [4 /*yield*/, ConsoleHandling_1.default.question(questions)];
                    case 1:
                        questionString = _a.sent();
                        question = new Question_class_1.Question(questionString);
                        return [4 /*yield*/, question.addAnswers()];
                    case 2:
                        _a.sent();
                        this.pushAnswers(question);
                        if (!(this.questionsArray.length < 5)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.addQuestions()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        toggleQuestions = {
                            type: "toggle",
                            name: "value",
                            message: "Want to add another question?",
                            initial: true,
                            active: "yes",
                            inactive: "no",
                        };
                        return [4 /*yield*/, ConsoleHandling_1.default.question(toggleQuestions)];
                    case 5:
                        if (!_a.sent()) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.addQuestions()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Questionary.prototype.pushAnswers = function (question) {
        this.questions.push(question);
    };
    Object.defineProperty(Questionary.prototype, "questionsArray", {
        get: function () {
            return this.questions;
        },
        enumerable: false,
        configurable: true
    });
    return Questionary;
}());
exports.Questionary = Questionary;
