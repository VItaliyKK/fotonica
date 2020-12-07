import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPublicationsComponent } from 'src/app/admin-components/admin-publications/admin-publications.component';
import { EditPublicationComponent } from 'src/app/admin-components/admin-publications/edit-publication/edit-publication.component';
import { NewPublicationComponent } from 'src/app/admin-components/admin-publications/new-publication/new-publication.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [ // *** routes for AdminPublicationModule
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminPublicationsComponent
  }, {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: EditPublicationComponent
  }, {
    path: 'new',
    canActivate: [AuthGuard],
    component: NewPublicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPublicationRoutingModule { }
