import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IQuestionTest } from 'src/app/shared/interfaces/test-question.interface';
import { ITest } from 'src/app/shared/interfaces/test.interface';
import { MainService } from '../../main.service';

@Injectable({
  providedIn: 'root'
})
export class NewTestService {

  constructor(private firestore: AngularFirestore, private mainService: MainService) { }

  publishNewTest(test:ITest){
    test.id = this.firestore.createId()
    this.firestore.collection('tests').doc(test.id).set(Object.assign({}, test))
      .then( () => {
        this.mainService.notifyEvent('Тест створено!')
      })
      .catch( err => {
        this.mainService.notifyEvent(err.message)
      })
  };

}
