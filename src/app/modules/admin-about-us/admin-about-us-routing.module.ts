import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAboutUsComponent } from 'src/app/admin-components/about-us/admin-about-us.component';

const routes: Routes = [ 
  {
    path: '',
    component: AdminAboutUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAboutUsRoutingModule { }
