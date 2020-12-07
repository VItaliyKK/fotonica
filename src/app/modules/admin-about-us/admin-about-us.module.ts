import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { AdminAboutUsComponent } from 'src/app/admin-components/about-us/admin-about-us.component';
import { AdminAboutUsRoutingModule } from './admin-about-us-routing.module';

@NgModule({
  declarations: [
    AdminAboutUsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    AdminAboutUsRoutingModule
  ]
})
export class AdminAboutUsModule { }
