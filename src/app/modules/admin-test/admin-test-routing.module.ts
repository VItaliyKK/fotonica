import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminTestsComponent } from 'src/app/admin-components/admin-tests/admin-tests.component';
import { EditTestComponent } from 'src/app/admin-components/admin-tests/edit-test/edit-test.component';
import { NewTestComponent } from 'src/app/admin-components/admin-tests/new-test/new-test.component';

const routes: Routes = [{
    path: '',
    component: AdminTestsComponent
  },{
    path: 'new',
    component: NewTestComponent
  },{
    path: 'edit/:id',
    component: EditTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTestRoutingModule { }
