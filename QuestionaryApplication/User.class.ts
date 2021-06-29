import ConsoleHandling from "./Handler/ConsoleHandling";
import { MainHandler } from "./MainHandler";
import { Statistics } from "./Statistics.class";

export class User {
  private _statistics: Statistics = new Statistics();

  public playPublicQuiz() {}

  public viewStatistics() {}

  public signIn() {}

  public async viewFunctions(): Promise<void> {
    let answer: String = await ConsoleHandling.showPossibilities(
      [
        "1. Spiele ein öffentliches Quiz.",
        "2. Schaue deine temporär gespeicherten Statistiken an.",
        "3. Registriere dich und werde Premium User.",
      ],
      "Was willst du tun? (default 1): ",
      "Hier sind deine Funktionen."
    );

    this.handleAnswer(answer);
  }

  public async handleAnswer(answer: String) {
    switch (answer) {
      case "1":
        this.playPublicQuiz();
        break;
      case "2":
        this.viewStatistics();
        break;
      case "3":
        this.signIn();
        break;
    }
    //await this.goNext();
  }

  public async goNext(): Promise<void> {
    let answer: String = await ConsoleHandling.question("Back to overview? ");
    switch (answer.toLowerCase()) {
      case "y":
      case "yes":
      default:
        this.viewFunctions();
        break;
      case "n":
      case "no":
        ConsoleHandling.closeConsole();
        break;
    }
  }
}
