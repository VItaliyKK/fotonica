import { Component, OnInit } from '@angular/core';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';
import { PublicationsService } from 'src/app/shared/services/admin/publication/publications.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  publications: IPublication[] = []

  constructor(private publicationService: PublicationsService) { }

  ngOnInit(): void {
    this.publicationService.getPublicationsList.subscribe( list => {
      this.publications = list
    })
    this.publicationService.getPublications() 
  }

  ngOnDestroy(): void {
    this.publicationService.getPublicationsList.observers = []
  }

}
