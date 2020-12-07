import { Component, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/shared/services/about-us.service';

@Component({
  selector: 'app-admin-about-us',
  templateUrl: './admin-about-us.component.html',
  styleUrls: ['./admin-about-us.component.scss']
})
export class AdminAboutUsComponent implements OnInit {
  htmlContent:string = ''

  constructor(private adminAboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.adminAboutUsService.getAboutUs().then( doc => {
      this.htmlContent = doc.data().content
    })
  };

  updateAboutUs(){
    this.adminAboutUsService.updateAboutUsTemplate(this.htmlContent)
  }
}
