import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { ITest } from 'src/app/shared/interfaces/test.interface';
import { MainService } from '../../main.service';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  getTestsList: Subject<ITest[]> = new Subject<ITest[]>()
  getOnceTest: Subject<ITest> = new Subject<ITest>()

  constructor(private firestore: AngularFirestore, private mainService: MainService) { }

  getTests(){
    this.firestore.collection('tests').get().toPromise()
      .then( docs => {
        let tempList = []
        docs.forEach( doc => {
          tempList.push(doc.data())
        })
        this.getTestsList.next(tempList)
      })
      .catch( err => {
        this.mainService.notifyEvent(err.message) 
      })
  };

  deleteTest(id:string){
    this.firestore.collection('tests').doc(id).delete()
      .then( () => {
        this.mainService.notifyEvent('Тест видалено!')
      })
      .catch( err => {
        this.mainService.notifyEvent(err.message)
      })
  };

  getTestsByID(iD:string){
    this.firestore.collection('tests').doc(iD).snapshotChanges().subscribe( docData => {
      this.getOnceTest.next(docData.payload.data() as ITest)
    })
  };

  getUrlId():string{
    return this.mainService.getIdViaUrl()
  }
}
