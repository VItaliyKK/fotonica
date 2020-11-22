import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminTestsComponent } from './admin-components/admin-tests/admin-tests.component';
import { AdminLoginComponent } from './admin-components/admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './secondary-components/notification/notification.component';
import { AdminPublicationModule } from './modules/admin-publication/admin-publication.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin-components/admin/admin.component';
import { SearchComponent } from './secondary-components/search/search.component';
import { HeaderComponent } from './secondary-components/header/header.component';
import { PublicationsComponent } from './main-components/publications/publications.component';
import { PublicationModule } from './modules/publication/publication.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminTestsComponent,
    AdminLoginComponent,
    NotificationComponent,
    SearchComponent,
    HeaderComponent,
    PublicationsComponent,
    // ViewPublicationComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AdminPublicationModule,
    PublicationModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
