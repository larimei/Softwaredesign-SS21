import { QuestionaryStatistics } from "./QuestionaryStatistics.class";
import { Statistics } from "./Statistics.class";
import { Questionary } from "./Questionary.class";
import { PromptObject } from "prompts";
import ConsoleHandling from "./Handler/ConsoleHandling";
import { v4 as uuidv4 } from "uuid";
import FileHandler from "./Handler/FileHandler";

export class RegisteredUser {
  public id: string;
  public username: string = "";
  private password: string = "";
  public statistic: Statistics;
  public questionaries: Questionary[] = [];

  constructor(username: string, password: string, id?: string) {
    if (id) this.id = id;
    else this.id = uuidv4();
    this.username = username;
    this.password = password;
    this.statistic = new Statistics(this.id);
    let data = FileHandler.readArrayFile("Users.json");
    let found = data.find((element) => element.id == this.id);
    if (found) {
      for (let questionary of found.questionaries) {
        this.questionaries.push(new Questionary(this.id, questionary.id));
      }
    }
  }

  public async seeFunctions() {
    let functions: PromptObject = {
      type: "select",
      name: "value",
      message: "What do you want to do next?",
      choices: [
        {
          title: "List all Questionaries",
          description: "List all questionaries you can do.",
          value: "1",
        },
        {
          title: "Search for questionaries",
          value: "2",
          description: "Search for a specific questionariy.",
        },
        {
          title: "See my statistics",
          value: "3",
          description: "See your statistics about already done questionaries.",
        },
        {
          title: "See the statistics of my questionaries",
          value: "4",
          description: "Look at the statistics about your own questionaries.",
        },
        {
          title: "Create new questionary",
          value: "5",
          description: "Add a new questionary to your collection.",
        },
      ],
      initial: 0,
    };

    let response = await ConsoleHandling.question(functions);

    switch (response) {
      case "1":
        this.listQuestionaries(0);
        break;
      case "2":
        this.searchQuestionaries();
        break;
      case "3":
        this.seeStatistics();
        break;
      case "4":
        await this.seeQuestionaryStatistics();
        break;
      case "5":
        await this.createQuestionary();
        break;
    }
  }

  public async listQuestionaries(index: number) {
    let questionaries: Questionary[] =
      FileHandler.readArrayFile("questionaries.json");
    let choices: any[] = [];
    let disabled: boolean;
    let description: string;

    for (let i = 0; i < 10; i++) {
      if (questionaries[index]) {
        description = this.isDisabled(questionaries[index]);

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

    if (choices.length == 10) {
      choices.push({ title: "See more Questionaries", value: "see more" });
    } else if (questionaries.length > 10) {
      choices.push({
        title: "See Questionaries from the beginning",
        value: "start new",
      });
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
    } else if (id == "start new") {
      this.listQuestionaries(0);
    } else {
      this.doQuestionary(id);
    }
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
        description = this.isDisabled(questionary);
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

  public async doQuestionary(id: string) {
    let data = FileHandler.readArrayFile("Questionaries.json");
    let questionary = data.find((element) => element.id == id);
    let questionaryStatistic = new QuestionaryStatistics(questionary);

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
      questionaryStatistic.setAnswer(question.question, response);
    }

    this.statistic.setStatistic(questionary.title);
    questionaryStatistic.setQuestionaryStatistic();

    FileHandler.changeData("Users.json", this.id, this);

    ConsoleHandling.printInput("Great. You are finished with the questionary.");

    this.seeFunctions();
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

  public async seeQuestionaryStatistics() {
    let choices = [];
    let data = FileHandler.readArrayFile("QuestionaryStatistics.json");

    for (let questionary of this.questionaries) {
      let found = data.find((element) => element.id == questionary.id);
      console.log(questionary);
      if (found != undefined && found.doneTimes != 0) {
        let choice = {
          title: questionary.title + " (" + found.doneTimes + ")",
          value: questionary.id,
        };
        choices.push(choice);
      }
    }

    let promptArray: PromptObject = {
      type: "select",
      name: "value",
      message: "Of which questionary do you want to see the statistics?",
      choices: choices,
      initial: 0,
    };

    let response: string = "";

    if (choices.length == 0) {
      ConsoleHandling.printInput("Nobody answered your Questionaries. :(");
    } else {
      response = await ConsoleHandling.question(promptArray);
    }

    let foundQuestionary = data.find((element) => element.id == response);

    ConsoleHandling.printInput(foundQuestionary.title + "\n");

    for (let question of foundQuestionary.questions) {
      ConsoleHandling.printInput(question.title);
      let index: number = 0;
      for (let answer of question.answers) {
        ConsoleHandling.printInput(
          index + ".   " + answer.answer + " (" + answer.amount + ")"
        );
        index++;
      }
      ConsoleHandling.printInput("\n");
    }
    this.seeFunctions();
  }

  public async createQuestionary() {
    let questionary = new Questionary(this.id);
    await questionary.addInformation();

    FileHandler.addData("questionaries.json", questionary);
    this.questionaries.push(questionary);

    FileHandler.changeData("Users.json", this.id, this);

    new QuestionaryStatistics(questionary);

    this.seeFunctions();
  }

  public isDisabled(questionary: Questionary): string {
    if (questionary.authorId == this.id) {
      return "(Disabled: You are the author.)";
    }
    for (let doneQuestionary of this.statistic.questionaries) {
      if (doneQuestionary == questionary.title) {
        return "(Disabled: You have already done this Questionary.)";
      }
    }

    let startDate = new Date(questionary.startDate);
    let endDate = new Date(questionary.endDate);

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
