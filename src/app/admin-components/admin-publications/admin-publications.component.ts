import { Component, OnInit } from '@angular/core';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';
import { PublicationService } from 'src/app/shared/services/admin/publication/publication.service';

@Component({
  selector: 'app-admin-publications',
  templateUrl: './admin-publications.component.html',
  styleUrls: ['./admin-publications.component.scss']
})
export class AdminPublicationsComponent implements OnInit {
  publications:IPublication[] = []

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.publicationService.getPublicationsList.subscribe( list => {
      this.publications = list
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
