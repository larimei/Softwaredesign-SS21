import prompts from "prompts";
import ConsoleHandling from "./Handler/ConsoleHandling";
import { User } from "./User.class";

ConsoleHandling.printInput("Welcome to the Questionary.");

    (async () => {
      const response = await prompts({
        type: "select",
        name: "value",
        message: "What do you want to do?",
        choices: [
          {
            title: "Login",
            description: "You already have an account and want to login.",
            value: 1,
          },
          {
            title: "Register",
            description: "You don't have an account and want to register.",
            value: 2,
          },
          {
            title: "Nah, don't want anything of'em.",
            description: "Just continue as unsigned user.",
            value: 3,
          },
        ],
        initial: 0,
      });

      let actualUser: User = new User();

      switch (response.value) {
        case 1:
          actualUser.logIn();
          break;
        case 2:
          actualUser.register();
          break;
        case 3:
          actualUser.seeFunctions();
          break;
      }
    })();
