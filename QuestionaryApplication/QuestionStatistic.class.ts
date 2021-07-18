import { AnswerStatistic } from "./AnswerStatistic.class";
import { Questionary } from "./Questionary.class";

export class QuestionStatistic {
  public title: string = "";
  public answers: AnswerStatistic[] = [];

  constructor(questionary: Questionary, question: any) {
    this.title = question.question;
    for (let answer of question.answers) {
      let answerStatistic = new AnswerStatistic(questionary, question, answer);
      this.answers.push(answerStatistic);
    }
  }

  public setAnswerStatistic(answer: string) {
    let found = this.answers.findIndex((element) => element.answer == answer);
    this.answers[found].addAnswer();
  }
}
