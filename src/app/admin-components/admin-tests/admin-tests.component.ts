import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITest } from 'src/app/shared/interfaces/test.interface';
import { TestsService } from 'src/app/shared/services/admin/test/tests.service';

@Component({
  selector: 'app-admin-tests',
  templateUrl: './admin-tests.component.html',
  styleUrls: ['./admin-tests.component.scss']
})
export class AdminTestsComponent implements OnInit {
  tests:ITest[] = []
  testsSubscriber: Subscription

  constructor(private testService: TestsService) { }

  ngOnInit(): void {
    this.testsSubscriber = this.testService.getTestsList.subscribe( testsList => {
      this.tests = testsList
      console.log(testsList)
    })
    this.testService.getTests()
  }

  ngOnDestroy(){
    !this.testsSubscriber || this.testsSubscriber.unsubscribe()
  }

  deletetest(iD:string){
    if (confirm('Ви дійсно хочете видалити тест?')){
      this.testService.deleteTest(iD)
      let i = this.tests.findIndex( test => test.id == iD)
      this.tests.splice(i, 1)
    }
  }
}
