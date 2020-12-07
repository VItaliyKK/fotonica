import { Data } from '@angular/router';
import { IQuestionTest } from './test-question.interface';

export interface ITest{
    id: string;
    date: Data;
    name: string;
    questions: IQuestionTest[];
    resultAmount?: number;
}