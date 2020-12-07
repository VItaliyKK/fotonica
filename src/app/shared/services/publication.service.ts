import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject, Subscription } from 'rxjs';
import { IPublication } from '../interfaces/publication.interface';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  getPublicationData: Subject<IPublication> = new Subject<IPublication>()
  getPublicationContentData: Subject<string> = new Subject<string>() 
  currentPublication:IPublication
  publicationSnapshotChanges: Subscription

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private mainService:MainService) { }

  getPublication(id:string): void{
    this.publicationSnapshotChanges = this.firestore.collection('publications').doc(id).snapshotChanges().subscribe( doc => {
      console.log('GetIPublication•', doc.payload.exists);
      if (doc.payload.exists) {
        this.currentPublication = doc.payload.data() as IPublication
        if (this.currentPublication.titlePhoto) {
          this.storage.ref(`publications/logo/${this.currentPublication.titlePhoto}`).getDownloadURL().toPromise().then( url => {
            this.currentPublication.tempLogo = url
          })
        }
        if (this.currentPublication.slidePhotos.length > 0) {
          let photosUrlPromises = this.currentPublication.slidePhotos.map( photo => {
            return this.storage.ref(`publications/photos/${photo}`).getDownloadURL().toPromise()
          })
          Promise.all(photosUrlPromises).then( promises => {
            this.currentPublication.tempPhotos = []
            promises.forEach( photoUrl => {
              this.currentPublication.tempPhotos.push(photoUrl)
            })
            this.getPublicationData.next(this.currentPublication)
          })
        } else {
          this.getPublicationData.next(this.currentPublication)
        }
      } else {
        this.mainService.notifyEvent('Помилка завантаження!')
      }
    })
    this.firestore.collection('publications-content').doc(id).get().toPromise().then( content => {
      console.log('publications-content',content.exists);
      if (content.exists) {
        this.getPublicationContentData.next(content.data().content)
      } else{
        this.mainService.notifyEvent('Помилка завантаження!')
      }
    })
  };
}
