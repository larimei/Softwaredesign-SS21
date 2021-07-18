import FileHandler from "./Handler/FileHandler";

export function isUsernameValid(value: string): boolean {
    let users = FileHandler.readArrayFile("Users.json");
    let found = users.find((element) => element.username == value);
    if (found) return true;
    else {
      let regExp = /[^A-z0-9_\-]/;
      if (regExp.test(value)) {
        return true;
      } else {
        return false;
      }
    }
  }
  module.exports = isUsernameValid;