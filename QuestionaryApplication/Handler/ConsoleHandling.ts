import prompts, { PromptObject } from 'prompts';
import * as readline from 'readline';

class ConsoleHandling {
  private static instance : ConsoleHandling = new ConsoleHandling()

  // logger object with syslog levels as specified loglevels
  // logs into build_service.log in directory log and onto console of running node.js process
  private consoleLine : readline.ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  constructor() {
    if(ConsoleHandling.instance)
      throw new Error("Use ConsoleHandling.Instance() instead new ConsoleHandling()")
    ConsoleHandling.instance = this
  }

  public static getInstance() : ConsoleHandling {
    return ConsoleHandling.instance
  }

  public async question(question: PromptObject) : Promise<any> {
    const response = await prompts(question);
    return response.value;
  }

  public printInput(input: string) {
    this.consoleLine.write(input);
    this.consoleLine.write("\n");
  }

  public closeConsole() {
    this.consoleLine.close();
  }
}

export default ConsoleHandling.getInstance();