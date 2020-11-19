import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';
import { EditPublicationService } from 'src/app/shared/services/admin/publication/edit-publication.service';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.scss']
})
export class EditPublicationComponent implements OnInit {
  htmlContent:string = ''
  publicationTitle: string = ''
  currentPublication: IPublication = {} as IPublication
  subscribers: Subscription[] = []
  
  constructor(private router: Router, 
              private editPublicationSevice: EditPublicationService) { }

  ngOnInit(): void {
    this.subscribers[0] = this.editPublicationSevice.getPublicationData.subscribe( publc => {
      this.currentPublication = publc
      this.publicationTitle = this.currentPublication.title
    })
    this.subscribers[1] = this.editPublicationSevice.getPublicationContentData.subscribe( content => {
      this.htmlContent = content
    })
    //get id current publication
    this.currentPublication.id = this.router.url.slice(this.router.url.lastIndexOf('/') + 1)
    //get data current publication
    this.editPublicationSevice.getPublication(this.currentPublication.id)
  }

  ngOnDetroy(){
    this.subscribers.forEach( subscriber => {
      !subscriber || subscriber.unsubscribe()
    })
  };
  // ***
  addPublicationPhotos(e: Event){
    if ((e.target as HTMLInputElement).files.length > 0) {
      this.editPublicationSevice.addPublicationPhotos(Array.from((e.target as HTMLInputElement).files), this.currentPublication.id)
    }
  };
  // ***
  updatePublicationLogo(e){ 
    this.editPublicationSevice.updateLogoPublication(e.target.files[0])
  };
  // ***
  deletePublicationPhoto(photoName:string){
    this.editPublicationSevice.deletePublicationPhoto(photoName, this.currentPublication.id)
  };
  // ***
  deleteSelectedPublicationLogo(){
    if (this.currentPublication.titlePhoto) {
      this.editPublicationSevice.deleteLogoPublication(this.currentPublication.id, this.currentPublication.titlePhoto).then( () => {
        this.editPublicationSevice.updatePublicationData.next('Основне фото публікації видалено!')
      })
    }
  };
  // ***
  updateTitlePublication(){
    if (this.currentPublication.title) {
      this.editPublicationSevice.updateTitlePublication(this.currentPublication.id, this.publicationTitle)
    }
  };
  // ***
  updateContentPublication(){
    if (this.htmlContent){
      this.editPublicationSevice.updateContentPublication(this.currentPublication.id, this.htmlContent)
    }
  }
}
