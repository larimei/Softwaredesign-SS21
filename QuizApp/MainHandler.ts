import { RegisteredUser } from './RegisteredUser.class';
import ConsoleHandling from "./Handler/ConsoleHandling";
import * as readline from "readline";
import { register } from "ts-node";
import { userInfo } from "node:os";
import { User } from "./User.class";

export class MainHandler {
  private _answerRegistered: String = "";
  public registeredBool: boolean = false;


  public async viewUserOptions(): Promise<void> {
    let answer: String = await ConsoleHandling.showPossibilities(
      [
        "1. Wenn du schon registriert bist, logge dich hier ein.",
        "2. Oder fahre hier als unregistrierter User fort.",
      ],
      "Was willst du tun? (default 1): ",
      ""
    );

    this.handleAnswer(answer);
  }

  public async handleAnswer(answer: String) {
    switch (answer) {
      case "1":
        let registeredUser: RegisteredUser = new RegisteredUser();
        registeredUser.LogIn();
        break;
      case "2":
        let unregisteredUser: User = new User();
        unregisteredUser.viewFunctions();
        break;
    }
  }

}
