import FileHandler from "./Handler/FileHandler";
import { v4 as uuidv4 } from "uuid";

export class Statistics {
  public questionaries: string[] = [];
  public id: string;
  public user: string;

  constructor(userId: string) {
    let data = FileHandler.readArrayFile("Statistics.json");
    let found = data.find((element) => element.user == userId);
    if (found !== undefined) {
      this.questionaries = found.questionaries;
      this.user = found.user;
      this.id = found.id;
    } else {
      this.user = userId;
      this.id = uuidv4();
      FileHandler.addData("Statistics.json", this);
    }
  }

  public setStatistic(questionary: string) {
    this.questionaries.push(questionary);
    FileHandler.changeData("Statistics.json", this.id, this);
  }
}
