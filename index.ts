import ConsoleHandling from "./QuizApp/Handler/ConsoleHandling";
import { MainHandler } from "./QuizApp/MainHandler";
import { User } from "./QuizApp/User.class";

ConsoleHandling.printInput("Willkommen zum Quiz.");
let main: MainHandler = new MainHandler();
main.viewUserOptions();






//ConsoleHandling.closeConsole();

//Frage ob registriert
//ja -> funktionen des registrierten users (logIn, playPublic, viewStatistics)
//nein -> funktionen user (signIn, olayPublic,, viewStats)

// ja -> einloggen -> greift auf existierenden User zu -> frage ob statistik anschauen, quiz erstellen oder quiz spielen
// -> seine eigenen oder public?
// nein -> will er sich registrieren? -> ja -> erstellt neuen user (er muss name und password eingeben) -> dann wie oben
// nein -> frage ob statistik anschauen oder quiz spielen
// quiz spielen -> zeigt alle verfügbaren quizze -> eins auswählen -> spielen
