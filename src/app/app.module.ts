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
import { AdminTestModule } from './modules/admin-test/admin-test.module';
import { TestsComponent } from './main-components/tests/tests.component';
import { ViewTestComponent } from './main-components/view-test/view-test.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminLoginComponent,
    NotificationComponent,
    SearchComponent,
    HeaderComponent,
    PublicationsComponent,
    TestsComponent,
    ViewTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // *** custom modules
    AdminPublicationModule,
    PublicationModule,
    AdminTestModule,
    
    // *** firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
