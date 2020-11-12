import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

// import { NgxTextEditorModule } from 'ngx-text-editor';
import { CKEditorModule } from 'ckeditor4-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminPublicationsComponent } from './admin-components/admin-publications/admin-publications.component';
import { AdminTestsComponent } from './admin-components/admin-tests/admin-tests.component';
import { AdminLoginComponent } from './admin-components/admin-login/admin-login.component';
import { EditPublicationComponent } from './admin-components/edit-publication/edit-publication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminPublicationsComponent,
    AdminTestsComponent,
    AdminLoginComponent,
    EditPublicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    // NgxTextEditorModule,
    CKEditorModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
