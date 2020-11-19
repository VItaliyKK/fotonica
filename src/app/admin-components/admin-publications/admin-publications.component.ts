import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-publications',
  templateUrl: './admin-publications.component.html',
  styleUrls: ['./admin-publications.component.scss']
})
export class AdminPublicationsComponent implements OnInit {
  publications = [
    { id: 'syThXHCEB6CcVJzIs443',
      date: new Date(),
      articleTitlePhoto: '',
      articleTitle: 'Next Era of Computing: What if We Could Teach Photons to Behave Like Electrons?'
    },
    { id: 'syThXHCEB6CcVJzIs443',
      date: new Date(),
      articleTitlePhoto: 'https://d3jkudlc7u70kh.cloudfront.net/interesting-facts-about-the-human-body.jpg',
      articleTitle: '90 Amazing Human Body Facts'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  deletePublication(id:string){
    console.log(id)
    // ** delete publication
  }

  changePublicationPhoto(id:string){
    // ** change photo publication

  }
}
