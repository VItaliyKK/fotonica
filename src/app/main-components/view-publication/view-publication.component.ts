import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';
import { PublicationService } from 'src/app/shared/services/publication.service';

@Component({
  selector: 'app-view-publication',
  templateUrl: './view-publication.component.html',
  styleUrls: ['./view-publication.component.scss']
})
export class ViewPublicationComponent implements OnInit {
  currentPublication:IPublication = {} as IPublication
  currentPublicationDate: any
  currentPublicationContent:string = ''
  publicationSubscriber: Subscription
  publicationContentSubscriber: Subscription
  carouselIsExist:boolean = false

  constructor(private publicationService: PublicationService, private router: Router) { }

  ngOnInit(): void {
    this.publicationSubscriber = this.publicationService.getPublicationData.subscribe( publication => {
      this.currentPublication = publication
      this.currentPublicationDate = publication.date
      this.carouselIsExist == publication.slidePhotos.length > 0
    })
    this.publicationContentSubscriber = this.publicationService.getPublicationContentData.subscribe( text => {
      this.currentPublicationContent = text
    })
    this.currentPublication.id = this.router.url.slice(this.router.url.lastIndexOf('/') + 1)
    this.publicationService.getPublication(this.currentPublication.id)
  }

  ngOnDestroy(): void {
    !this.publicationContentSubscriber || this.publicationContentSubscriber.unsubscribe()
    !this.publicationSubscriber || this.publicationSubscriber.unsubscribe()
    this.publicationService.getPublicationData.observers = []
  }
}
