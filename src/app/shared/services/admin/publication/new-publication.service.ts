import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { IPublication } from '../../../interfaces/publication.interface';

@Injectable({
  providedIn: 'root'
})
export class NewPublicationService {
  addedNewPublication: Subject<string> = new Subject<string>()
  getPublicationData: Subject<IPublication> = new Subject<IPublication>()
  getPublicationContentData: Subject<string> = new Subject<string>() 
  // getPublicationPhotosData: Subject<Array<string>> = new Subject<Array<string>>()
  currentPublication:IPublication
  currentPublicationContent:string

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getDownloadUrlPhoto(filePath: string): Promise<any> {
    return this.storage.ref(filePath).getDownloadURL().toPromise()
  };

  // getPublication(id:string): void{
  //   this.firestore.collection('publications').doc(id).get().toPromise().then( publication => {
  //     this.currentPublication = publication.data() as IPublication
  //     if (this.currentPublication.titlePhoto) {
  //       this.storage.ref(`publications/logo/${this.currentPublication.titlePhoto}`).getDownloadURL().toPromise().then( url => {
  //         this.currentPublication.titlePhoto = url
  //         this.getPublicationData.next(this.currentPublication)
  //       })
  //     }
  //     if (this.currentPublication.slidePhotos.length > 0) {
  //       let photosUrlPromises = this.currentPublication.slidePhotos.map( photo => {
  //         return this.storage.ref(`publications/photos/${photo}`).getDownloadURL().toPromise()
  //       })
  //       Promise.all(photosUrlPromises).then( promises => {
  //         this.currentPublication.tempPhotos = []
  //         promises.forEach( photoUrl => {
  //           this.currentPublication.tempPhotos.push(photoUrl)
  //         })
  //         this.getPublicationData.next(this.currentPublication)
  //       })
  //     }
  //   })
  //   this.firestore.collection('publications-content').doc(id).get().toPromise().then( content => {
  //     this.getPublicationContentData.next(content.data().content)
  //     this.currentPublicationContent = content.data().content
  //   })
  // }

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
          this.addedNewPublication.next('Публікація додана!')
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
              this.addedNewPublication.next('Публікація додана!')
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
            this.addedNewPublication.next('Публікація додана!')
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
