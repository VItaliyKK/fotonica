import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() photosList: string[];
  imageObject: Array<object> = [];

  constructor() { } 

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.imageObject = this.photosList.map( (url, i) => {
      return {
        image: url,
        thumbImage: url,
        alt: i+1,
        title: i+1
      }
    })
  };
}
