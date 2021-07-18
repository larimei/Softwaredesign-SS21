const isUsernameValid = require('./isUsernameValid');

describe("This is a simple test", () => {
    test("Check the isUsernameValid function", () => {
    expect(isUsernameValid("pitata")).toBe(true);
    });
   });