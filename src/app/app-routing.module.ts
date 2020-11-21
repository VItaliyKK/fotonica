import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminPublicationsComponent } from './admin-components/admin-publications/admin-publications.component';
import { AdminTestsComponent } from './admin-components/admin-tests/admin-tests.component';
import { AdminLoginComponent } from './admin-components/admin-login/admin-login.component';
import { NewPublicationComponent } from './admin-components/admin-publications/new-publication/new-publication.component';
import { EditPublicationComponent } from './admin-components/admin-publications/edit-publication/edit-publication.component';


const routes: Routes = [{
    path: 'login', 
    component: AdminLoginComponent
  },{
    path: 'admin', 
    component: AdminComponent
  },{
    path: 'admin/publications', 
    loadChildren: () => import('./modules/admin-publication/admin-publication.module').then(m => m.AdminPublicationModule) 
  },{
    path: 'admin/tests', 
    component: AdminTestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
