import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPublicationsComponent } from 'src/app/admin-components/admin-publications/admin-publications.component';
import { EditPublicationComponent } from 'src/app/admin-components/admin-publications/edit-publication/edit-publication.component';
import { NewPublicationComponent } from 'src/app/admin-components/admin-publications/new-publication/new-publication.component';

const routes: Routes = [ // *** routes for AdminPublicationModule
  {
    path: '',
    component: AdminPublicationsComponent
  }, {
    path: 'edit/:id',
    component: EditPublicationComponent
  }, {
    path: 'new',
    component: NewPublicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPublicationRoutingModule { }
