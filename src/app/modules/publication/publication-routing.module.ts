import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPublicationComponent } from 'src/app/main-components/view-publication/view-publication.component';

const routes: Routes = [
  {
    path: '', 
    component: ViewPublicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }
