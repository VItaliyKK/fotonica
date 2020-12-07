import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MethodComponent } from 'src/app/main-components/method/method.component';

const routes: Routes = [{
  path: '',
  component: MethodComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MethodRoutingModule { }
