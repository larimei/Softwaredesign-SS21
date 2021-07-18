import fs from "fs";
import path from "path";

class FileHandler {
  private static instance: FileHandler = new FileHandler();

  constructor() {
    if (FileHandler.instance)
      throw new Error(
        "Use ConsoleHandling.Instance() instead new ConsoleHandling()"
      );
    FileHandler.instance = this;
  }

  public static getInstance(): FileHandler {
    return FileHandler.instance;
  }

  private readFile(pathToFile: string): any {
    let jsonRaw = fs.readFileSync(path.resolve(__dirname, "../" + pathToFile));
    let json: any = JSON.parse(jsonRaw.toString());
    return json;
  }

  public readArrayFile(pathToFile: string): Array<any> {
    return this.readFile(pathToFile);
  }

  public writeFile(pathToFile: string, dataToWrite: any): void {
    fs.writeFileSync(
      path.resolve(__dirname, "../" + pathToFile),
      JSON.stringify(dataToWrite)
    );
  }

  public addData(pathToFile: string, dataToWrite: any): void {
    let data = this.readArrayFile(pathToFile);
    data.push(dataToWrite);
    this.writeFile(pathToFile, data);
  }

  public changeData(pathToFile: string, dataToChange: any, dataToWrite: any) {
    let data = this.readArrayFile(pathToFile);
    let foundIndex: number = data.findIndex(
      (element) => element.id == dataToChange
    );
    data[foundIndex] = dataToWrite;
    this.writeFile(pathToFile, data);
  }
}

export default FileHandler.getInstance();
