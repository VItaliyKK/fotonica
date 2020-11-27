export interface IQuestionTest{
    question: string;
    options: string[];
    answer?: string | number;
    selected?:string;
}