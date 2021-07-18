"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistics = void 0;
var FileHandler_1 = __importDefault(require("./Handler/FileHandler"));
var uuid_1 = require("uuid");
var Statistics = /** @class */ (function () {
    function Statistics(userId) {
        this.questionaries = [];
        var data = FileHandler_1.default.readArrayFile("Statistics.json");
        var found = data.find(function (element) { return element.user == userId; });
        if (found !== undefined) {
            this.questionaries = found.questionaries;
            this.user = found.user;
            this.id = found.id;
        }
        else {
            this.user = userId;
            this.id = uuid_1.v4();
            FileHandler_1.default.addData("Statistics.json", this);
        }
    }
    Statistics.prototype.setStatistic = function (questionary) {
        this.questionaries.push(questionary);
        FileHandler_1.default.changeData("Statistics.json", this.id, this);
    };
    return Statistics;
}());
exports.Statistics = Statistics;
