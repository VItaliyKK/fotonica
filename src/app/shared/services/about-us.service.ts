import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private firestore: AngularFirestore, private mainService: MainService) { }

  getAboutUs():Promise<any>{
    return this.firestore.collection('about-us').doc('about-us').get().toPromise()
  };

  updateAboutUsTemplate(html:string): void{
    this.firestore.collection('about-us').doc('about-us').update({content: html})
      .then( () => {
        this.mainService.notifyEvent('Дані оновлені!')
      })
      .catch(err => {
        this.mainService.notifyEvent(err.message)
      })
  };
}
