import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { ITest } from 'src/app/shared/interfaces/test.interface';
import { MainService } from '../../main.service';

@Injectable({
  providedIn: 'root'
})
export class EditTestService {
  getTest: Subject<ITest> = new Subject<ITest>()

  constructor(private firestore: AngularFirestore, private mainService: MainService) { }

  getTestsByID(iD:string){
    this.firestore.collection('tests').doc(iD).snapshotChanges().subscribe( docData => {
      this.getTest.next(docData.payload.data() as ITest)
    })
  };

  updateTest(test:ITest){
    this.firestore.collection('tests').doc(test.id).update(Object.assign({}, test))
      .then( () => {
        this.mainService.notifyEvent('Тест оновлено!')
      })
      .catch(err => {
        this.mainService.notifyEvent(err.message)
      })
  };
}
