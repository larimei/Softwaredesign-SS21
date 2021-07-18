"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var FileHandler = /** @class */ (function () {
    function FileHandler() {
        if (FileHandler.instance)
            throw new Error("Use ConsoleHandling.Instance() instead new ConsoleHandling()");
        FileHandler.instance = this;
    }
    FileHandler.getInstance = function () {
        return FileHandler.instance;
    };
    FileHandler.prototype.readFile = function (pathToFile) {
        var jsonRaw = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../" + pathToFile));
        var json = JSON.parse(jsonRaw.toString());
        return json;
    };
    FileHandler.prototype.readArrayFile = function (pathToFile) {
        return this.readFile(pathToFile);
    };
    FileHandler.prototype.writeFile = function (pathToFile, dataToWrite) {
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "../" + pathToFile), JSON.stringify(dataToWrite));
    };
    FileHandler.prototype.addData = function (pathToFile, dataToWrite) {
        var data = this.readArrayFile(pathToFile);
        data.push(dataToWrite);
        this.writeFile(pathToFile, data);
    };
    FileHandler.prototype.changeData = function (pathToFile, dataToChange, dataToWrite) {
        var data = this.readArrayFile(pathToFile);
        var foundIndex = data.findIndex(function (element) { return element.id == dataToChange; });
        data[foundIndex] = dataToWrite;
        this.writeFile(pathToFile, data);
    };
    FileHandler.instance = new FileHandler();
    return FileHandler;
}());
exports.default = FileHandler.getInstance();
