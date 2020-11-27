import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutUsComponent } from 'src/app/main-components/about-us/about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';



@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
