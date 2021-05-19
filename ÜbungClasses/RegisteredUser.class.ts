import { Quiz } from "./Quiz.class";
import { User } from "./User.class";

export class RegisteredUser extends User {
    private _username: string = "";
    private _password: string = "";
    private _createdQuizzes: Quiz[] = [];

    public get username() {
        return this._username
    }

    public set username(username: string) {
      this._username = username;
    }

    public get password() {
        return this._password
    }

    public set password(password: string) {
        this._password = password;
    }

    public LogIn() {
    }

    public createQuiz() {
    }

    public playPrivateQuiz() {        
    }
    
}