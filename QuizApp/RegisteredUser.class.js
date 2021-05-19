"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredUser = void 0;
var User_class_1 = require("./User.class");
var RegisteredUser = /** @class */ (function (_super) {
    __extends(RegisteredUser, _super);
    function RegisteredUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._username = "";
        _this._password = "";
        _this._createdQuizzes = [];
        return _this;
    }
    Object.defineProperty(RegisteredUser.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (username) {
            this._username = username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegisteredUser.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (password) {
            this._password = password;
        },
        enumerable: false,
        configurable: true
    });
    RegisteredUser.prototype.LogIn = function () {
    };
    RegisteredUser.prototype.createQuiz = function () {
    };
    RegisteredUser.prototype.playPrivateQuiz = function () {
    };
    return RegisteredUser;
}(User_class_1.User));
exports.RegisteredUser = RegisteredUser;
