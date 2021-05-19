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
exports.TextQuestion = void 0;
var Question_class_1 = require("./Question.class");
var TextQuestion = /** @class */ (function (_super) {
    __extends(TextQuestion, _super);
    function TextQuestion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._answer = "";
        return _this;
    }
    return TextQuestion;
}(Question_class_1.Question));
exports.TextQuestion = TextQuestion;
