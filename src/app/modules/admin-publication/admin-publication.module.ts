import { NgModule } from '@angular/core';

import { AdminPublicationRoutingModule } from './admin-publication-routing.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { AdminPublicationsComponent } from 'src/app/admin-components/admin-publications/admin-publications.component';
import { EditPublicationComponent } from 'src/app/admin-components/admin-publications/edit-publication/edit-publication.component';
import { NewPublicationComponent } from 'src/app/admin-components/admin-publications/new-publication/new-publication.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AdminPublicationsComponent,
    NewPublicationComponent, 
    EditPublicationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    FormsModule,
    RouterModule,
    AdminPublicationRoutingModule,
    CKEditorModule
  ]
})
export class AdminPublicationModule { }
