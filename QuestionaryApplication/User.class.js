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
exports.User = void 0;
var Statistics_class_1 = require("./Statistics.class");
var ConsoleHandling_1 = __importDefault(require("./Handler/ConsoleHandling"));
var FileHandler_1 = __importDefault(require("./Handler/FileHandler"));
var uuid_1 = require("uuid");
var UserFacade_class_1 = require("./UserFacade.class");
var User = /** @class */ (function () {
    function User() {
        this.statistic = new Statistics_class_1.Statistics(uuid_1.v4());
        this.userFacade = new UserFacade_class_1.UserFacade();
    }
    User.prototype.seeFunctions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var array, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        array = {
                            type: "select",
                            name: "value",
                            message: "What do you want to do next?",
                            choices: [
                                {
                                    title: "List all Questionaries",
                                    description: "List all questionaries you can do.",
                                    value: 1,
                                },
                                {
                                    title: "Search for questionaries",
                                    value: 2,
                                    description: "Search for a specific questionariy.",
                                },
                                {
                                    title: "See my statistics",
                                    value: 3,
                                    description: "See your statistics about already done questionaries.",
                                },
                            ],
                            initial: 0,
                        };
                        return [4 /*yield*/, ConsoleHandling_1.default.question(array)];
                    case 1:
                        response = _a.sent();
                        switch (response) {
                            case 1:
                                this.listQuestionaries(0);
                                break;
                            case 2:
                                this.searchQuestionaries();
                                break;
                            case 3:
                                this.seeStatistics();
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.logIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userFacade.logIn()];
                    case 1:
                        actualUser = _a.sent();
                        actualUser.seeFunctions();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userFacade.register()];
                    case 1:
                        actualUser = _a.sent();
                        actualUser.seeFunctions();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.seeStatistics = function () {
        var statistic = this.statistic.questionaries;
        ConsoleHandling_1.default.printInput("done Questionaries: " + statistic.length);
        var index = 1;
        for (var _i = 0, statistic_1 = statistic; _i < statistic_1.length; _i++) {
            var questionary = statistic_1[_i];
            ConsoleHandling_1.default.printInput("Questionary " + index + ":" + questionary);
            index++;
        }
        this.seeFunctions();
    };
    User.prototype.searchQuestionaries = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questionaries, choices, disabled, description, searchArray, search, regex, _i, questionaries_1, questionary, choice, promptArray, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionaries = FileHandler_1.default.readArrayFile("questionaries.json");
                        choices = [];
                        searchArray = {
                            type: "text",
                            name: "value",
                            message: "What Questionary do you want to search?",
                        };
                        return [4 /*yield*/, ConsoleHandling_1.default.question(searchArray)];
                    case 1:
                        search = _a.sent();
                        regex = new RegExp(search, "i");
                        for (_i = 0, questionaries_1 = questionaries; _i < questionaries_1.length; _i++) {
                            questionary = questionaries_1[_i];
                            if (questionary.title.match(regex)) {
                                description = this.isDisabled(questionary.authorId, questionary.title, questionary.startDate, questionary.endDate);
                                if (description == "false") {
                                    disabled = false;
                                    description = "";
                                }
                                else {
                                    disabled = true;
                                }
                                choice = {
                                    title: questionary.title + " " + description,
                                    value: questionary.id,
                                    disabled: disabled,
                                };
                                choices.push(choice);
                            }
                        }
                        promptArray = {
                            type: "select",
                            name: "value",
                            message: "What Questionary do you want to do?",
                            choices: choices,
                            initial: 0,
                        };
                        return [4 /*yield*/, ConsoleHandling_1.default.question(promptArray)];
                    case 2:
                        id = _a.sent();
                        this.doQuestionary(id);
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.listQuestionaries = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var questionaries, choices, disabled, description, i, choice, promptArray, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionaries = FileHandler_1.default.readArrayFile("questionaries.json");
                        choices = [];
                        for (i = 0; i < 10; i++) {
                            if (questionaries[index]) {
                                description = this.isDisabled(questionaries[index].authorId, questionaries[index].title, questionaries[index].startDate, questionaries[index].endDate);
                                if (description == "false") {
                                    disabled = false;
                                    description = "";
                                }
                                else {
                                    disabled = true;
                                }
                                choice = {
                                    title: questionaries[index].title + " " + description,
                                    value: questionaries[index].id,
                                    disabled: disabled,
                                };
                                choices.push(choice);
                                index++;
                            }
                        }
                        if (questionaries.length > 10) {
                            choices.push({ title: "See more Questionaries", value: "see more" });
                        }
                        promptArray = {
                            type: "select",
                            name: "value",
                            message: "What Questionary do you want to do?",
                            choices: choices,
                            initial: 0,
                        };
                        return [4 /*yield*/, ConsoleHandling_1.default.question(promptArray)];
                    case 1:
                        id = _a.sent();
                        if (id == "see more") {
                            this.listQuestionaries(index);
                        }
                        else {
                            this.doQuestionary(id);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.doQuestionary = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, questionary, _i, _a, question, choices, _b, _c, answer, choice, promptArray, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = FileHandler_1.default.readArrayFile("Questionaries.json");
                        questionary = data.find(function (element) { return element.id == id; });
                        _i = 0, _a = questionary.questions;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        question = _a[_i];
                        choices = [];
                        for (_b = 0, _c = question.answers; _b < _c.length; _b++) {
                            answer = _c[_b];
                            choice = {
                                title: answer,
                                value: answer,
                            };
                            choices.push(choice);
                        }
                        promptArray = {
                            type: "select",
                            name: "value",
                            message: question.question,
                            choices: choices,
                            initial: 0,
                        };
                        return [4 /*yield*/, ConsoleHandling_1.default.question(promptArray)];
                    case 2:
                        response = _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        ConsoleHandling_1.default.printInput("Great. You are finished with the questionary.");
                        this.seeFunctions();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.isDisabled = function (author, title, start, end) {
        for (var _i = 0, _a = this.statistic.questionaries; _i < _a.length; _i++) {
            var doneQuestionary = _a[_i];
            if (doneQuestionary == title) {
                return "(Disabled: You have already done this Questionary.)";
            }
        }
        var startDate = new Date(start);
        var endDate = new Date(end);
        if (startDate > new Date(Date.now())) {
            return ("(Disabled: Start is on " +
                startDate.getDate() +
                "." +
                startDate.getMonth() +
                "." +
                startDate.getFullYear() +
                ")");
        }
        if (endDate < new Date(Date.now())) {
            return ("(Disabled: It has ended on " +
                endDate.getDate() +
                "." +
                endDate.getMonth() +
                "." +
                endDate.getFullYear() +
                ")");
        }
        return "false";
    };
    return User;
}());
exports.User = User;
