import { Component, OnInit } from '@angular/core';
import { IQuestionTest } from 'src/app/shared/interfaces/test-question.interface';
import { ITest } from 'src/app/shared/interfaces/test.interface';
import { NewTestService } from 'src/app/shared/services/admin/test/new-test.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit {
  questions: IQuestionTest[] = []
  questionName:string = ''
  showNewQuestionSettings:boolean = false
  tempQuestion:IQuestionTest = {question: '', options:[]}
  tempNameNewQuestion: string = ''
  tempAnswerNewQuestion:string = ''

  constructor(private newTestService: NewTestService) { }

  ngOnInit(): void {
  }

  setCorrectAnswer(variant:string){
    this.tempQuestion.answer = variant
    this.tempAnswerNewQuestion = ''
  }

  toggleQuestionBlock(){
    this.showNewQuestionSettings = !this.showNewQuestionSettings
    this.tempAnswerNewQuestion = ''
    this.tempNameNewQuestion = ''
  }

  addNewVariantAnswerQuestion(){
    if (this.tempAnswerNewQuestion) {
      this.tempQuestion.options.push(this.tempAnswerNewQuestion)
      this.tempAnswerNewQuestion = ''
    }
  }

  addNewQuestion() {
    if (this.tempNameNewQuestion && this.tempQuestion.answer && this.tempQuestion.options.length > 1){
      this.tempQuestion.question = this.tempNameNewQuestion
      this.questions.push(this.tempQuestion)
      this.tempQuestion = {question: '', options:[]} 
      this.toggleQuestionBlock()
    }
  };

  publishNewTest(){
    let newTest:ITest = {
      id: '',
      date: new Date(),
      name: this.questionName,
      questions: this.questions
    }
    this.newTestService.publishNewTest(newTest)
    this.questionName = ''
  }
}
