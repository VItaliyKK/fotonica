import { Component, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/shared/services/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUsContent: string = ''

  constructor(private aboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.aboutUsService.getAboutUs().then( doc => {
      this.aboutUsContent = doc.data().content
    })
  }

}
