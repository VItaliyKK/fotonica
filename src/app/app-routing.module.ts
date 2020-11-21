import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminTestsComponent } from './admin-components/admin-tests/admin-tests.component';
import { AdminLoginComponent } from './admin-components/admin-login/admin-login.component';
import { PublicationsComponent } from './main-conponents/publications/publications.component';


const routes: Routes = [{
    path: 'login', 
    component: AdminLoginComponent
  },{
    path: 'admin', 
    component: AdminComponent
  },{
    path: 'publications', 
    component: PublicationsComponent
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
