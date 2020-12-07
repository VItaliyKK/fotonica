import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';
import { MainService } from '../../main.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  publicationsList: IPublication[] = []
  getPublicationsList: Subject<IPublication[]> = new Subject<IPublication[]>()

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private mainService:MainService) { }
  // ***
  getPublications(){
    this.publicationsList = []
    this.firestore.collection('publications').get().toPromise().then( data => {
      data.forEach( publication => {
        let tempPublct = publication.data() as IPublication
        if (tempPublct.titlePhoto) {
          this.storage.ref(`publications/logo/${tempPublct.titlePhoto}`).getDownloadURL().toPromise().then( url => {
            tempPublct.tempLogo = url
          })
        }
        this.publicationsList.push(tempPublct)
        this.getPublicationsList.next(this.publicationsList)
      })
    })
  };
  // ***
  deletePublication(delPubl:IPublication){
    let index = this.publicationsList.findIndex( el => el.id == delPubl.id)
    index == -1 || this.publicationsList.splice(index, 1)
    let delPhotosPromises: Promise<any>[] = []
    delPubl.slidePhotos.forEach( (photoName, i) => {
      delPhotosPromises[i] = this.storage.ref('publications/photos/'+ photoName).delete().toPromise()
    })
    Promise.all(delPhotosPromises).then( () => {
      // *** delete publication logo
      this.deletePublicationLogo(delPubl.titlePhoto).then( () => {
        // *** delete publication
        this.firestore.collection('publications').doc(delPubl.id).delete().then( () => {
          // *** delete publication text
          this.firestore.collection('publications-content').doc(delPubl.id).delete()
            .then( () => {
              this.mainService.notifyEvent('Публікація повністю видалена!')
              this.getPublicationsList.next(this.publicationsList)
            })
            .catch( err => this.mainService.notifyEvent(err.message))
        })
      })
    })
  };
  // ***
  private deletePublicationLogo(name:string): Promise<any>{
    if (name){
      return this.storage.ref('publications/logo/'+ name).delete().toPromise()
    } else {
      return Promise.resolve()
    }
  };
}
