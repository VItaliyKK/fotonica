import { Component, OnInit } from '@angular/core';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';
import { PublicationsService } from 'src/app/shared/services/admin/publication/publications.service';

@Component({
  selector: 'app-admin-publications',
  templateUrl: './admin-publications.component.html',
  styleUrls: ['./admin-publications.component.scss']
})
export class AdminPublicationsComponent implements OnInit {
  publications:IPublication[] = []

  constructor(private publicationService: PublicationsService) { }

  ngOnInit(): void {
    this.publicationService.getPublicationsList.subscribe( list => {
      this.publications = list
      console.log(this.publications);
      
    })
    this.publicationService.getPublications()
  }

  ngOnDestroy(){
    this.publications = [] 
    this.publicationService.getPublicationsList.observers = []
  }

  deletePublication(publication:IPublication){
    console.log(publication.id)
    this.publicationService.deletePublication(publication)
  }
}
