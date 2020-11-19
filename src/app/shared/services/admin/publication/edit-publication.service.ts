import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class EditPublicationService {
  getPublicationData: Subject<IPublication> = new Subject<IPublication>()
  getPublicationContentData: Subject<string> = new Subject<string>() 
  updatePublicationData: Subject<string> = new Subject<string>()
  currentPublication:IPublication

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }
  // ***
  getPublication(id:string): void{
    this.firestore.collection('publications').doc(id).snapshotChanges().subscribe( doc => {
      console.log('GetIPublication•');
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
    })
    this.firestore.collection('publications-content').doc(id).get().toPromise().then( content => {
      this.getPublicationContentData.next(content.data().content)
    })
  };
  // ***
  updateLogoPublication(logo:File): void{ 
    if (this.currentPublication.titlePhoto) { // if logo already exist
      this.deleteLogoPublication(this.currentPublication.id, this.currentPublication.titlePhoto).then( () => {
        this.currentPublication.titlePhoto = ''
        this.updateLogoPublication(logo)
      })
    } else {
      const type = logo.type.slice(logo.type.indexOf('/') + 1);
      const randomName = this.currentPublication.id
      const filePath = `publications/logo/${randomName}.${type}`;
      this.storage.upload(filePath, logo).then( res => {
        this.currentPublication.titlePhoto = res.metadata.name
        this.cleanUpdatePublication(this.currentPublication).then( () => {
          this.updatePublicationData.next('Основне фото публікації оновлено!')
        })
      })
    }
  };

  private cleanUpdatePublication(publication: IPublication): Promise<void>{
    return this.firestore.collection('publications').doc(publication.id).update(publication)
  }
  // ***
  deleteLogoPublication(id: string, name: string): Promise<any>{ 
    let deleteLogoPromises = []
    deleteLogoPromises[0] = this.firestore.collection('publications').doc(id).update({
      'titlePhoto': ''
    })
    deleteLogoPromises[1] = this.storage.ref('publications/logo/' + name).delete()
    return Promise.all(deleteLogoPromises)
  };
  // ***
  deletePublicationPhoto(name:string, iD:string): void{
    this.firestore.collection('publications').doc(iD).update({
      'slidePhotos': firebase.default.firestore.FieldValue.arrayRemove(name)
    }).then( () => {
      this.storage.ref('publications/photos/' + name).delete().subscribe( () => {
        this.updatePublicationData.next('Медіафайл із публікації видалено!')
      })
    })
  };
  // ***
  updateTitlePublication(iD: string, newPublicationTitle: string): void{
    this.firestore.collection('publications').doc(iD).update({
      'title': newPublicationTitle
    }).then( () => {
      this.updatePublicationData.next('Назву публікації змінено!')
    }).catch( err => {
      this.updatePublicationData.next(err.message)
    })
  };
  // ***
  updateContentPublication(iD:string, text:string): void{
    this.firestore.collection('publications-content').doc(iD).update({
      'content': text
    }).then( () => {
      this.updatePublicationData.next('Текст публікації змінено!')
    }).catch( err => {
      this.updatePublicationData.next(err.message)
    })
  };
  // ***
  addPublicationPhotos(files: File[], iD:string): void{
    let promises = files.map( (file, i) => {
      const type = file.type.slice(file.type.indexOf('/') + 1);
      const randomName = this.firestore.createId()
      const filePath = `publications/photos/${randomName}.${type}`;
      return this.storage.upload(filePath, file)
    })
    Promise.all(promises).then( res => {
      let pushedNamesPhoto = res.map( promise => {
        return this.firestore.collection('publications').doc(iD).update({
          'slidePhotos': firebase.default.firestore.FieldValue.arrayUnion(promise.metadata.name)
        })
      })
      Promise.all(pushedNamesPhoto).then( () => {
        this.updatePublicationData.next('Додано нові медіафайли до публікації!')
      })
    })
  };
}
