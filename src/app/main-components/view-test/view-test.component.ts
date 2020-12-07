import { Component, OnInit } from '@angular/core';
import { IQuestionTest } from 'src/app/shared/interfaces/test-question.interface';
import { ITest } from 'src/app/shared/interfaces/test.interface';
import { TestsService } from 'src/app/shared/services/admin/test/tests.service';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.scss']
})
export class ViewTestComponent implements OnInit {
  showContent: 'start-test' | 'passing-test' | 'result-test' = 'start-test'
  test:ITest = {} as ITest

  constructor(private testService: TestsService) { }

  ngOnInit(): void {
    this.testService.getOnceTest.subscribe( tst => {
      this.test = tst
      console.log(this.test);
    })
    this.testService.getTestsByID(this.testService.getUrlId())
  }

  ngOnDestroy(): void {
    if(this.testService.getOnceTest){
      this.testService.getOnceTest.observers.length = 0
    }
  };

  startPassingTest(){
    this.showContent = "passing-test"
  };

  selectVariant(question:IQuestionTest, variant:string){
    question.selected = variant
  };

  getResultTest(){
    if (this.checkAllQuestionFill()) {
      this.test.resultAmount = this.test.questions.reduce(
        (accumulator, currentValue) => { 
          if(currentValue.selected == currentValue.answer){
            return accumulator + 1
          } else {
            return accumulator + 0
          }
        }, 0)
      this.showContent = "result-test"
    }
  };

  private checkAllQuestionFill():boolean{
    return this.test.questions.every( question => question.selected)
  }
}
