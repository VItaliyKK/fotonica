import { Component, OnInit } from '@angular/core';
import { IPublication } from 'src/app/shared/interfaces/publication.interface';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  publications: IPublication[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
