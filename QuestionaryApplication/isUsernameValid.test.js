"use strict";
var isUsernameValid = require('./isUsernameValid');
describe("This is a simple test", function () {
    test("Check the isUsernameValid function", function () {
        expect(isUsernameValid("pitata")).toBe(true);
    });
});
