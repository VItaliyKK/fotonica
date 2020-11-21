import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  changePublication: Subject<string> = new Subject<string>()

  constructor() { }

  notifyEvent(t:string){
    this.changePublication.next(t)
  };
}
