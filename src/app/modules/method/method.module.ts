import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodRoutingModule } from './method-routing.module';
import { MethodComponent } from 'src/app/main-components/method/method.component';


@NgModule({
  declarations: [
    MethodComponent,
  ],
  imports: [
    CommonModule,
    MethodRoutingModule,
    
  ]
})
export class MethodModule { }
