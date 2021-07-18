import prompts, { PromptObject } from "prompts";
import ConsoleHandling from "./Handler/ConsoleHandling";
import FileHandler from "./Handler/FileHandler";

export class Question {
  public question: string = "";
  public answers: string[] = [];

  constructor(questionName: string, question?: any) {
    this.question = questionName;
    if (question) {
      for (let answer of question.answers) {
        this.answers.push(answer);
      }
    }
  }

  public async addAnswers() {
    let questions: PromptObject =
      {
        type: "text",
        name: "value",
        message: "What is your shown answer?",
      };
    let answerString = await ConsoleHandling.question(questions);

    this.pushAnswers(answerString);

    if (this.answerArray.length < 2) {
      await this.addAnswers();
    } else if (this.answerArray.length < 10) {
      let toggleQuestions: PromptObject = 
        {
          type: "toggle",
          name: "value",
          message: "Want to add another answer?",
          initial: true,
          active: "yes",
          inactive: "no",
        };
      if (await ConsoleHandling.question(toggleQuestions)) {
        await this.addAnswers();
      }
    }
  }

  public get answerArray(): string[] {
    return this.answers;
  }

  public pushAnswers(answer: string) {
    this.answerArray.push(answer);
  }
}
