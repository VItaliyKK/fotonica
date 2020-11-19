import { Component, OnInit } from '@angular/core';
import { EditPublicationService } from 'src/app/shared/services/admin/publication/edit-publication.service';
import { NewPublicationService } from 'src/app/shared/services/admin/publication/new-publication.service';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification-wrapper" [ngClass]="{'hide': isHide}">
      <p>{{message}}</p>
    </div>
  `,
  styles: [
    `.notification-wrapper{
        position: fixed;
        bottom: 20px;
        background-color: #020202eb;
        width: 90vw;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 20px 0px black;
        color: whitesmoke;
        left: 50%;
        transform: translate(-50%, 0);
        text-align: center;
        transition: bottom 0.3s cubic-bezier(0.42, 0, 0.1, 1.41);
    }`,
    `.notification-wrapper.hide{
        bottom: -100px;
    }`
  ]
})
export class NotificationComponent implements OnInit {
  message:string = ''
  isHide:boolean = true

  constructor(private newPublicationService: NewPublicationService, private editPublicationService: EditPublicationService) { }

  ngOnInit(): void {
    this.newPublicationService.addedNewPublication.subscribe( data => {
      this.processData(data)
    })
    this.editPublicationService.updatePublicationData.subscribe( data => {
      this.processData(data)
    })
  };

  processData(text){
    this.message = text
    this.isHide = false
    setTimeout( () => {
      this.isHide = true
      this.message = ''
    }, 4000)
  };

}
