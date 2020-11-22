import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationRoutingModule } from './publication-routing.module';
import { ViewPublicationComponent } from 'src/app/main-components/view-publication/view-publication.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ViewPublicationComponent
  ],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    HttpClientModule, 
    FormsModule,
    RouterModule
  ]
})
export class PublicationModule { }
