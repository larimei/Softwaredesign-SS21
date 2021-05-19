"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleHandling_1 = __importDefault(require("./Handler/ConsoleHandling"));
var MainHandler_1 = require("./MainHandler");
ConsoleHandling_1.default.printInput("Willkommen zum Quiz.");
var main = new MainHandler_1.MainHandler();
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
