import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IQuestionTest } from 'src/app/shared/interfaces/test-question.interface';
import { ITest } from 'src/app/shared/interfaces/test.interface';
import { EditTestService } from 'src/app/shared/services/admin/test/edit-test.service';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit {
  showEditQuestionSettings:boolean = false
  testName:string = ''
  tempQuestion:IQuestionTest = { question: '', options:[]}
  tempAnswerEditQuestion:string = ''
  tempNameEditQuestion:string = ''
  test:ITest = {} as ITest
  gotTest: Subscription

  constructor(private testsEditService: EditTestService, private router: Router) { }

  ngOnInit(): void {
    this.gotTest = this.testsEditService.getTest.subscribe( t => {
      this.test = t
      console.log(t);
      
    })
    this.testsEditService.getTestsByID(this.router.url.slice(this.router.url.lastIndexOf('/') + 1))
  }

  ngOnDestroy(): void {
    !this.gotTest || this.gotTest.unsubscribe()
  }

  toggleQuestionBlock(){
    // показати/скрити блок добавлення нового питання
    this.showEditQuestionSettings = !this.showEditQuestionSettings
  }

  addNewVariantAnswerQuestion(){
    //додати варіант відповіді
    if (this.tempAnswerEditQuestion) {
      this.tempQuestion.options.push(this.tempAnswerEditQuestion)
      this.tempAnswerEditQuestion = ''
    }
  }

  setCorrectAnswer(value:string){
    //встановити відповідь
    this.tempQuestion.answer = value
  }

  addEditQuestion(){
    // Додати в список питань
    this.tempQuestion.question = this.tempNameEditQuestion
    this.test.questions.push(this.tempQuestion)
    this.showEditQuestionSettings = false
    this.tempNameEditQuestion = ''
    this.tempQuestion = {question:'',options:[]}
  }

  addVariantForExistQuestion(quest:IQuestionTest,value:string){
    // додати варіант для існуючого питання
    if (value) {
      quest.options.push(value)
    }
  };

  setVariantExistQuestion(question:IQuestionTest, value:string){
    // встановити правильну відповідь для існуючого питання
    question.answer = value
  };

  deleteVariantExistQuestion(question:IQuestionTest, option:string){
  // delete значення варіанту для існуючого питання
    let i = question.options.findIndex( opt => opt == option)
    if (option == question.answer) {
      question.answer = ''
    }  
    question.options.splice(i, 1)
  };

  updateTest(){
    this.testsEditService.updateTest(this.test)
  };
}
