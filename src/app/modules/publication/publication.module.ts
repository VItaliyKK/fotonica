import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationRoutingModule } from './publication-routing.module';
import { ViewPublicationComponent } from 'src/app/main-components/view-publication/view-publication.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselComponent } from 'src/app/secondary-components/carousel/carousel.component';

@NgModule({
  declarations: [
    ViewPublicationComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    FormsModule,
    HttpClientModule, 
    RouterModule,
    NgImageSliderModule
  ]
})
export class PublicationModule { }
