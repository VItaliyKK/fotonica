import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin:boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.changeAuthState.subscribe(user => {
      if (user) {
        this.isAdmin = true
      } else {
        this.isAdmin = false
      }
    })
    this.authService.subscribeOnChangeAuthState()
  }

  ngOnDestroy(): void {
  }
  
  logOut(){
    this.authService.logout().then( () => {
      this.authService.clearLocalStorage()
    })
  }
}
