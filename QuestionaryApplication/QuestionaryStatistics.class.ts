import { Questionary } from "./Questionary.class";
import FileHandler from "./Handler/FileHandler";
import { QuestionStatistic } from "./QuestionStatistic.class";

export class QuestionaryStatistics {
  public id: string;
  public title: string;
  public questions: QuestionStatistic[] = [];
  public doneTimes: number;

  constructor(questionary: Questionary) {
    let data = FileHandler.readArrayFile("QuestionaryStatistics.json");
    let found = data.find((element) => element.id == questionary.id);
    if (found !== undefined) {
      for (let question of questionary.questions) {
        let questionStatistic = new QuestionStatistic(questionary, question);
        this.questions.push(questionStatistic);
      }
      this.id = found.id;
      this.doneTimes = found.doneTimes;
      this.title = found.title;
    } else {
      this.title = questionary.title;
      this.doneTimes = 0;
      this.id = questionary.id;
      for (let question of questionary.questions) {
        let questionStatistic = new QuestionStatistic(questionary, question);
        this.questions.push(questionStatistic);
      }
      FileHandler.addData("QuestionaryStatistics.json", this);
    }
  }

  public setQuestionaryStatistic() {
    this.doneTimes++;
    FileHandler.changeData("QuestionaryStatistics.json", this.id, this);
  }

  public setAnswer(question: string, answer: string) {
    let found = this.questions.findIndex(
      (element) => element.title == question
    );
    this.questions[found].setAnswerStatistic(answer);
  }
}
