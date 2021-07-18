import prompts, { PromptObject } from "prompts";
import ConsoleHandling from "./Handler/ConsoleHandling";
import { v4 as uuidv4 } from "uuid";
import { Question } from "./Question.class";
import FileHandler from "./Handler/FileHandler";

export class Questionary {
  public title: string = "";
  public startDate: Date = new Date();
  public endDate: Date = new Date();
  public questions: Question[] = [];
  public authorId: string;
  public id: string;

  constructor(author: string, id?: string) {
    this.authorId = author;
    if (id) {
      let data = FileHandler.readArrayFile("Questionaries.json");
      let found = data.find((element) => element.id == id);
      this.id = id;
      this.startDate = new Date(found.startDate);
      this.endDate = new Date(found.endDate);
      this.title = found.title;
      for (let question of found.questions) {
        this.questions.push(new Question(question.question, question));
      }
    } else {
      this.id = uuidv4();
    }
  }

  public async addInformation() {
    let questions: PromptObject[] = [
      {
        type: "text",
        name: "value",
        message: "What is the title of your questionary?",
      },
      {
        type: "date",
        name: "value",
        message: "When is the start date of your questionary?",
        initial: new Date(Date.now()),
      },
      {
        type: "date",
        name: "value",
        message: "When is the end date of your questionary?",
        initial: new Date(Date.now()),
      },
    ];

    this.title = await ConsoleHandling.question(questions[0]);
    this.startDate = new Date(await ConsoleHandling.question(questions[1]));
    this.endDate = new Date(await ConsoleHandling.question(questions[2]));

    await this.addQuestions();
  }

  public async addQuestions() {
    let questions: PromptObject = {
      type: "text",
      name: "value",
      message: "What is your question?",
    };
    let questionString = await ConsoleHandling.question(questions);

    let question = new Question(questionString);
    await question.addAnswers();

    this.pushAnswers(question);

    if (this.questionsArray.length < 5) {
      await this.addQuestions();
    } else {
      let toggleQuestions: PromptObject = {
        type: "toggle",
        name: "value",
        message: "Want to add another question?",
        initial: true,
        active: "yes",
        inactive: "no",
      };
      if (await ConsoleHandling.question(toggleQuestions)) {
        await this.addQuestions();
      }
    }
  }

  public pushAnswers(question: Question) {
    this.questions.push(question);
  }

  public get questionsArray(): Question[] {
    return this.questions;
  }
}
