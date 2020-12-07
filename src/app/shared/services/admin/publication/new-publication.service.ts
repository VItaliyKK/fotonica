import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { IPublication } from '../../../interfaces/publication.interface';
import { MainService } from '../../main.service';

@Injectable({
  providedIn: 'root'
})
export class NewPublicationService {
  getPublicationData: Subject<IPublication> = new Subject<IPublication>()
  getPublicationContentData: Subject<string> = new Subject<string>() 
  currentPublication:IPublication
  currentPublicationContent:string

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private mainService:MainService) { }

  getDownloadUrlPhoto(filePath: string): Promise<any> {
    return this.storage.ref(filePath).getDownloadURL().toPromise()
  };

  private uploadPublicationPhotos(publicationPhotos: File[]) {
    let filesPromises = publicationPhotos.map(file => {
      const type = file.type.slice(file.type.indexOf('/') + 1);
      const randomName = this.firestore.createId()
      const filePath = `publications/photos/${randomName}.${type}`;
      return this.storage.upload(filePath, file);
    })
    Promise.all(filesPromises).then( photosData => {
      photosData.forEach( photo => {
        this.currentPublication.slidePhotos.push(photo.metadata.name)
      })
      this.addNewPublicationToDatabase(this.currentPublication).then( () => {
        this.addNewPublicationContentToDatabase(this.currentPublicationContent).then( () => {
          this.mainService.notifyEvent('Публікація додана!')
        })
      })
    })
  };

  addNewPublication(content: string, logo: File, photos: File[]) {
    this.currentPublicationContent = content
    this.currentPublication.id = this.firestore.createId()
    if (logo != null) {
      const type = logo.type.slice(logo.type.indexOf('/') + 1);
      const randomName = this.firestore.createId()
      const filePath = `publications/logo/${randomName}.${type}`;
      this.storage.upload(filePath, logo).then( res => {
        this.currentPublication.titlePhoto = res.metadata.name
        if (photos.length > 0) {
          this.uploadPublicationPhotos(photos)
        } else {
          this.addNewPublicationToDatabase(this.currentPublication).then( () => {
            this.addNewPublicationContentToDatabase(this.currentPublicationContent).then( () => {
              this.mainService.notifyEvent('Публікація додана!')
            })
          })
        }
      })
    } else {
      if (photos.length > 0) {
        this.uploadPublicationPhotos(photos)
      } else {
        this.addNewPublicationToDatabase(this.currentPublication).then( () => {
          this.addNewPublicationContentToDatabase(this.currentPublicationContent).then( () => {
            this.mainService.notifyEvent('Публікація додана!')
          })
        })
      }
    }
  };

  private addNewPublicationToDatabase(newPupl:IPublication): Promise<void>{
    return this.firestore.collection('publications').doc(newPupl.id).set(newPupl)
  };

  private addNewPublicationContentToDatabase(content:string): Promise<void>{
    return this.firestore.collection('publications-content').doc(this.currentPublication.id).set({'content': content})
  };
}
