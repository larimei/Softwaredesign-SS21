"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = __importStar(require("readline"));
var ConsoleHandling = /** @class */ (function () {
    function ConsoleHandling() {
        // logger object with syslog levels as specified loglevels
        // logs into build_service.log in directory log and onto console of running node.js process
        this.consoleLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        if (ConsoleHandling.instance)
            throw new Error("Use ConsoleHandling.Instance() instead new ConsoleHandling()");
        ConsoleHandling.instance = this;
    }
    ConsoleHandling.getInstance = function () {
        return ConsoleHandling.instance;
    };
    ConsoleHandling.prototype.question = function (question) {
        var _this = this;
        var answer = "";
        return new Promise(function (resolve) {
            _this.consoleLine.question(question.toString(), function (_answer) {
                answer = _answer;
                resolve(answer);
            });
        });
    };
    ConsoleHandling.prototype.showPossibilities = function (showPossibilities, question, firstQuestion) {
        var _this = this;
        this.consoleLine.write("\n");
        this.consoleLine.write(firstQuestion);
        this.consoleLine.write("\n\n");
        for (var _i = 0, showPossibilities_1 = showPossibilities; _i < showPossibilities_1.length; _i++) {
            var possibility = showPossibilities_1[_i];
            this.consoleLine.write(possibility.toString());
            this.consoleLine.write("\n");
        }
        this.consoleLine.write("\n");
        return new Promise(function (resolve) { return _this.consoleLine.question(question.toString(), function (answer) {
            resolve(answer);
        }); });
    };
    ConsoleHandling.prototype.printInput = function (input) {
        this.consoleLine.write(input);
        this.consoleLine.write("\n");
    };
    ConsoleHandling.prototype.closeConsole = function () {
        this.consoleLine.close();
    };
    ConsoleHandling.instance = new ConsoleHandling();
    return ConsoleHandling;
}());
exports.default = ConsoleHandling.getInstance();
