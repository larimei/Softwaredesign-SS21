import { RegisteredUser } from "./RegisteredUser.class";
import { Statistics } from "./Statistics.class";
import ConsoleHandling from "./Handler/ConsoleHandling";
import FileHandler from "./Handler/FileHandler";
import { PromptObject } from "prompts";
import { v4 as uuidv4 } from "uuid";
import { Questionary } from "./Questionary.class";
import { UserFacade } from "./UserFacade.class";

export class User {
  public statistic: Statistics;
  public userFacade: UserFacade;

  constructor() {
    this.statistic = new Statistics(uuidv4());
    this.userFacade = new UserFacade();
  }

  public async seeFunctions() {
    let array: PromptObject = {
      type: "select",
      name: "value",
      message: "What do you want to do next?",
      choices: [
        {
          title: "List all Questionaries",
          description: "List all questionaries you can do.",
          value: 1,
        },
        {
          title: "Search for questionaries",
          value: 2,
          description: "Search for a specific questionariy.",
        },
        {
          title: "See my statistics",
          value: 3,
          description: "See your statistics about already done questionaries.",
        },
      ],
      initial: 0,
    };
    let response = await ConsoleHandling.question(array);

    switch (response) {
      case 1:
        this.listQuestionaries(0);
        break;
      case 2:
        this.searchQuestionaries();
        break;
      case 3:
        this.seeStatistics();
        break;
    }
  }

  public async logIn() {
    let actualUser = await this.userFacade.logIn();
    actualUser.seeFunctions();
  }

  public async register() {
    let actualUser = await this.userFacade.register();
    actualUser.seeFunctions();
  }

  public seeStatistics() {
    let statistic = this.statistic.questionaries;
    ConsoleHandling.printInput("done Questionaries: " + statistic.length);
    let index: number = 1;
    for (let questionary of statistic) {
      ConsoleHandling.printInput("Questionary " + index + ":" + questionary);
      index++;
    }
    this.seeFunctions();
  }

  public async searchQuestionaries() {
    let questionaries = FileHandler.readArrayFile("questionaries.json");
    let choices: any[] = [];
    let disabled: boolean;
    let description: string;

    let searchArray: PromptObject = {
      type: "text",
      name: "value",
      message: "What Questionary do you want to search?",
    };

    let search = await ConsoleHandling.question(searchArray);
    let regex = new RegExp(search, "i");

    for (let questionary of questionaries) {
      if (questionary.title.match(regex)) {
        description = this.isDisabled(
          questionary.authorId,
          questionary.title,
          questionary.startDate,
          questionary.endDate
        );
        if (description == "false") {
          disabled = false;
          description = "";
        } else {
          disabled = true;
        }
        let choice = {
          title: questionary.title + " " + description,
          value: questionary.id,
          disabled: disabled,
        };
        choices.push(choice);
      }
    }

    let promptArray: PromptObject = {
      type: "select",
      name: "value",
      message: "What Questionary do you want to do?",
      choices: choices,
      initial: 0,
    };

    let id = await ConsoleHandling.question(promptArray);

    this.doQuestionary(id);
  }

  public async listQuestionaries(index: number) {
    let questionaries: Questionary[] =
      FileHandler.readArrayFile("questionaries.json");
    let choices: any[] = [];
    let disabled: boolean;
    let description: string;

    for (let i = 0; i < 10; i++) {
      if (questionaries[index]) {
        description = this.isDisabled(
          questionaries[index].authorId,
          questionaries[index].title,
          questionaries[index].startDate,
          questionaries[index].endDate
        );

        if (description == "false") {
          disabled = false;
          description = "";
        } else {
          disabled = true;
        }
        let choice = {
          title: questionaries[index].title + " " + description,
          value: questionaries[index].id,
          disabled: disabled,
        };
        choices.push(choice);
        index++;
      }
    }

    if (questionaries.length > 10) {
      choices.push({ title: "See more Questionaries", value: "see more" });
    }

    let promptArray: PromptObject = {
      type: "select",
      name: "value",
      message: "What Questionary do you want to do?",
      choices: choices,
      initial: 0,
    };

    let id = await ConsoleHandling.question(promptArray);

    if (id == "see more") {
      this.listQuestionaries(index);
    } else {
      this.doQuestionary(id);
    }
  }

  public async doQuestionary(id: string) {
    let data = FileHandler.readArrayFile("Questionaries.json");
    let questionary = data.find((element) => element.id == id);

    for (let question of questionary.questions) {
      let choices = [];
      for (let answer of question.answers) {
        let choice = {
          title: answer,
          value: answer,
        };
        choices.push(choice);
      }

      let promptArray: PromptObject = {
        type: "select",
        name: "value",
        message: question.question,
        choices: choices,
        initial: 0,
      };

      let response = await ConsoleHandling.question(promptArray);
    }

    ConsoleHandling.printInput("Great. You are finished with the questionary.");

    this.seeFunctions();
  }

  public isDisabled(
    author: string,
    title: string,
    start: Date,
    end: Date
  ): string {
    for (let doneQuestionary of this.statistic.questionaries) {
      if (doneQuestionary == title) {
        return "(Disabled: You have already done this Questionary.)";
      }
    }

    let startDate = new Date(start);
    let endDate = new Date(end);

    if (startDate > new Date(Date.now())) {
      return (
        "(Disabled: Start is on " +
        startDate.getDate() +
        "." +
        startDate.getMonth() +
        "." +
        startDate.getFullYear() +
        ")"
      );
    }

    if (endDate < new Date(Date.now())) {
      return (
        "(Disabled: It has ended on " +
        endDate.getDate() +
        "." +
        endDate.getMonth() +
        "." +
        endDate.getFullYear() +
        ")"
      );
    }

    return "false";
  }
}
