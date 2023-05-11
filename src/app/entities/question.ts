import { Answer } from "./answer";

export class Question {

    public category: string;
    public type: string;
    public difficulty: string;
    public question: string;
    public answers: Answer[] = [];
    public correctAnswer: Answer;




    public constructor(category: string, type: string, difficulty: string,
        question: string, answers: Answer[], correctAnswer: Answer) {
        this.category = category;
        this.type = type;
        this.difficulty = difficulty;
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}
