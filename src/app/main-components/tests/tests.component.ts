import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITest } from 'src/app/shared/interfaces/test.interface';
import { TestsService } from 'src/app/shared/services/admin/test/tests.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  testsListSubscriber: Subscription
  tests:ITest[] = []

  constructor(private testsService:TestsService) { }

  ngOnInit(): void {
    this.testsListSubscriber = this.testsService.getTestsList.subscribe( list => {
      this.tests = list
    })
    this.testsService.getTests()
  };

  ngOnDestroy(): void {
    !this.testsListSubscriber || this.testsListSubscriber.unsubscribe()
  };

}
