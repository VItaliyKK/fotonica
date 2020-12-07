import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  changePublication: Subject<string> = new Subject<string>()

  constructor(private router: Router) { }

  notifyEvent(t:string){
    this.changePublication.next(t)
  };

  getIdViaUrl(): string{
    return this.router.url.slice(this.router.url.lastIndexOf('/') + 1)
  };
}
