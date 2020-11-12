import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.scss']
})
export class EditPublicationComponent implements OnInit {
  htmlContent
  xxx = `<h3><strong>Start</strong>&nbsp;-&nbsp;cing elit, sed do eiet dolore <em>magna</em> aliqua.</h3>`
  constructor() { }

  ngOnInit(): void {
  } 

  resultEdit(){
    console.log(this.xxx)
  }
}
