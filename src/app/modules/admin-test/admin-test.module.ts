import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTestRoutingModule } from './admin-test-routing.module';
import { AdminTestsComponent } from 'src/app/admin-components/admin-tests/admin-tests.component';
import { EditTestComponent } from 'src/app/admin-components/admin-tests/edit-test/edit-test.component';
import { NewTestComponent } from 'src/app/admin-components/admin-tests/new-test/new-test.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminTestsComponent,
    EditTestComponent,
    NewTestComponent,
    
  ],
  imports: [
    CommonModule,
    AdminTestRoutingModule,
    FormsModule,
    RouterModule,
    // ReactiveFormsModule
  ]
})
export class AdminTestModule { }
