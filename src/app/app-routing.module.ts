import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminPublicationsComponent } from './admin-components/admin-publications/admin-publications.component';
import { AdminTestsComponent } from './admin-components/admin-tests/admin-tests.component';
import { AdminLoginComponent } from './admin-components/admin-login/admin-login.component';
import { EditPublicationComponent } from './admin-components/edit-publication/edit-publication.component';


const routes: Routes = [
  {path: 'login', component: AdminLoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/publications', component: AdminPublicationsComponent},
  {path: 'admin/tests', component: AdminTestsComponent},
  {path: 'admin/edit/publications/:id', component: EditPublicationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
