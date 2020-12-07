import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin-components/admin/admin.component';
import { AdminLoginComponent } from './admin-components/admin-login/admin-login.component';
import { PublicationsComponent } from './main-components/publications/publications.component';
import { TestsComponent } from './main-components/tests/tests.component';
import { ViewTestComponent } from './main-components/view-test/view-test.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { MainComponent } from './main-components/main/main.component';


const routes: Routes = [{
    path: 'login', 
    component: AdminLoginComponent
  },{
    path: 'admin', 
    canActivate: [AuthGuard],
    component: AdminComponent
  },{
    path: 'publications', 
    component: PublicationsComponent,
  },{
    path: 'publications/:id', 
    loadChildren: () => import('./modules/publication/publication.module').then(m => m.PublicationModule) 
  },{
    path: 'admin/publications', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin-publication/admin-publication.module').then(m => m.AdminPublicationModule) 
  },{
    path: 'tests', 
    component: TestsComponent
  },{
    path: 'tests/:id', 
    component: ViewTestComponent
  },{
    path: 'admin/tests', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin-test/admin-test.module').then(m => m.AdminTestModule)
  },{
    path: 'about-us',
    loadChildren: () => import('./modules/about-us/about-us.module').then(m => m.AboutUsModule)
  },{
    path: 'admin/about-us',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin-about-us/admin-about-us.module').then(m => m.AdminAboutUsModule)
  },{
    path: 'method',
    loadChildren: () => import('./modules/method/method.module').then(m => m.MethodModule)
  },{
    path: '',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
