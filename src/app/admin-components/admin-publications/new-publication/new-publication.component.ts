import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';
import { NewPublicationService } from 'src/app/shared/services/admin/publication/new-publication.service';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.scss']
})
export class NewPublicationComponent implements OnInit {
  htmlContent:string = ''
  currentPublication: IPublication | any = {}
  blobPublicationLogo: SafeUrl | null
  filePublicationLogo: File | null
  blobPublicationPhotos: SafeUrl[] = []
  filePublicationPhotos: File[] = []
  messageListener: Subscription

  constructor(private newPublicationService: NewPublicationService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  };

  ngOnDestroy(){
    !this.messageListener || this.messageListener.unsubscribe()
  };
  
  setPublicationLogo(e){
    this.filePublicationLogo = null
    this.blobPublicationLogo = null
    this.filePublicationLogo = e.target.files[0]
    this.blobPublicationLogo =  this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[0])) 
  };

  setPublicationPhotos(e){
    this.blobPublicationPhotos = []
    this.filePublicationPhotos = []
    Array.from(e.target.files).forEach(element => {
      this.blobPublicationPhotos.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(element))) 
      this.filePublicationPhotos.push(element as File) 
    });
  };
  
  addNewPublication(){
    if (this.htmlContent && this.currentPublication.title) {
      this.newPublicationService.currentPublication = {
        id: '',
        date: new Date(),
        title: this.currentPublication.title,
        titlePhoto: '',
        slidePhotos: []
      }
      this.newPublicationService.addNewPublication(this.htmlContent, this.filePublicationLogo, this.filePublicationPhotos)
    }
  };

  deleteSelectedPublicationLogo(){
    this.filePublicationLogo = null
    this.blobPublicationLogo = null
  };

  deleteSelectedPublicationPhoto(name:string){
    let res = this.filePublicationPhotos.findIndex( file => file.name == name)
    this.blobPublicationPhotos.splice(res,1)
    this.filePublicationPhotos.splice(res,1)
  };
}
