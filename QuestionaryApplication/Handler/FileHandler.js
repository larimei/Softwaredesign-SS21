"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var FileHandler = /** @class */ (function () {
    function FileHandler() {
    }
    FileHandler.prototype.readFile = function (pathToFile) {
        var jsonRaw = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../" + pathToFile));
        var json = JSON.parse(jsonRaw.toString());
        return json;
    };
    FileHandler.prototype.readArrayFile = function (pathToFile) {
        return this.readFile(pathToFile);
    };
    FileHandler.prototype.readObjectFile = function (pathToFile) {
        return this.readFile(pathToFile);
    };
    FileHandler.prototype.writeFile = function (pathToFile, dataToWrite) {
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "../" + pathToFile), JSON.stringify(dataToWrite));
    };
    return FileHandler;
}());
exports.FileHandler = FileHandler;
