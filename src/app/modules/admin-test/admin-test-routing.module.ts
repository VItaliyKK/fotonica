import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminTestsComponent } from 'src/app/admin-components/admin-tests/admin-tests.component';
import { EditTestComponent } from 'src/app/admin-components/admin-tests/edit-test/edit-test.component';
import { NewTestComponent } from 'src/app/admin-components/admin-tests/new-test/new-test.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [{
    path: '',
    canActivate: [AuthGuard],
    component: AdminTestsComponent
  },{
    path: 'new',
    canActivate: [AuthGuard],
    component: NewTestComponent
  },{
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: EditTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTestRoutingModule { }
