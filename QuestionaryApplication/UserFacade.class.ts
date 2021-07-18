import { PromptObject } from "prompts";
import ConsoleHandling from "./Handler/ConsoleHandling";
import FileHandler from "./Handler/FileHandler";
import { RegisteredUser } from "./RegisteredUser.class";

export class UserFacade {
    public async register(): Promise<RegisteredUser> {
        let signInQuestions: PromptObject[] = [
          {
            type: "text",
            name: "value",
            message: "Type in your username.",
            validate: (value) =>
              this.isUsernameValid(value)
                ? `Username invalid (already exists or no special characters allowed)`
                : true,
          },
          {
            type: "password",
            name: "value",
            message: "Type in your password.",
            validate: (value) =>
              value.length < 4 ? `Password must have more letters` : true,
          },
        ];
    
        let username: string = String(await ConsoleHandling.question(signInQuestions[0])
        );
        let password: string = String(
          await ConsoleHandling.question(signInQuestions[1])
        );
    
        ConsoleHandling.printInput(
          "Great. You are signed in. What do you want to do next?"
        );
    
        let encryptedPassword = require("crypto")
          .createHash("sha256")
          .update(password)
          .digest("hex");
    
        let actualRegisteredUser = new RegisteredUser(username, encryptedPassword);
    
        FileHandler.addData("Users.json", actualRegisteredUser);
    
        return actualRegisteredUser;
      }
    
      public async logIn(): Promise<RegisteredUser> {
        let logInQuestions: PromptObject[] = [
          {
            type: "text",
            name: "value",
            message: "Type in your username.",
            validate: (value) =>
              !this.isUsernameValid(value) ? `Username not found` : true,
          },
          {
            type: "password",
            name: "value",
            message: "Type in your password.",
          },
        ];
    
        let username: string = String(
          await ConsoleHandling.question(logInQuestions[0])
        );
        let password: string = String(
          await ConsoleHandling.question(logInQuestions[1])
        );

        let encryptedPassword = require("crypto")
          .createHash("sha256")
          .update(password)
          .digest("hex");
    
        let actualRegisteredUser: RegisteredUser;
    
        if (!this.isPasswordValid(username, encryptedPassword)) {
          ConsoleHandling.printInput("Sorry, wrong password. Try again.");
          actualRegisteredUser = await this.logIn();
        } else {
          ConsoleHandling.printInput(
            "Great. You are logged in. What do you want to do next?"
          );
    
          let users = FileHandler.readArrayFile("Users.json");
          let found = users.find((element) => element.username == username);
    
          actualRegisteredUser = new RegisteredUser(username, encryptedPassword, found.id);
        }
        return actualRegisteredUser;
      }
    
      public isUsernameValid(value: string): boolean {
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
    
      public isPasswordValid(username: string, password: string) {
        let users = FileHandler.readArrayFile("Users.json");
        let found = users.find((element) => element.username == username);
        if (password == found.password) return true;
        else return false;
      }
}