import { Component, OnInit } from '@angular/core';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.scss']
})
export class NewPublicationComponent implements OnInit {
  htmlContent:string = ''
  
  constructor() { }

  ngOnInit(): void {
  } 

  newPublicationSend(){
    let newPublic: IPublication = {
      id: '',
      date: new Date(),
      title: '',
      titlePhoto: '',
      slidePhotos: []
    }
    // ** add to collection
  }
}
