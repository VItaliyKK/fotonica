import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CKEditorModule } from 'ckeditor4-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminPublicationsComponent } from './admin-components/admin-publications/admin-publications.component';
import { AdminTestsComponent } from './admin-components/admin-tests/admin-tests.component';
import { AdminLoginComponent } from './admin-components/admin-login/admin-login.component';
import { EditPublicationComponent } from './admin-components/edit-publication/edit-publication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewPublicationComponent } from './admin-components/new-publication/new-publication.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminPublicationsComponent,
    AdminTestsComponent,
    AdminLoginComponent,
    EditPublicationComponent,
    NewPublicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
