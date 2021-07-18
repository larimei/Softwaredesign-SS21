"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUsernameValid = void 0;
var FileHandler_1 = __importDefault(require("./Handler/FileHandler"));
function isUsernameValid(value) {
    var users = FileHandler_1.default.readArrayFile("Users.json");
    var found = users.find(function (element) { return element.username == value; });
    if (found)
        return true;
    else {
        var regExp = /[^A-z0-9_\-]/;
        if (regExp.test(value)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.isUsernameValid = isUsernameValid;
module.exports = isUsernameValid;
