import FileHandler from "./Handler/FileHandler";
import { Questionary } from "./Questionary.class";

export class AnswerStatistic {
  public answer: string;
  public amount: number = 0;

  constructor(questionary: Questionary, question: any, answer: string) {
    this.answer = answer;
    let data = FileHandler.readArrayFile("QuestionaryStatistics.json");
    let dataQuestionary = data.find((element) => element.id == questionary.id);
    if (dataQuestionary) {
      let dataQuestion = dataQuestionary.questions.find(
        (element: { title: string }) => element.title == question.question
      );
      let foundAnswer = dataQuestion.answers.find(
        (element: { answer: string }) => element.answer == answer
      );
      this.amount = foundAnswer.amount;
    }
  }

  public addAnswer() {
    this.amount++;
  }
}
