import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  emailValue:string = ''
  passwordValue:string = ''
  errorLogin:string = '' 

  constructor(private authService: AuthService, private router: Router) { }
  isResetPassword:boolean = false
  
  ngOnInit(): void {
  }

  logIn(){
    this.authService.login(this.emailValue, this.passwordValue)
    .then( user => {
      this.resetForm()
      this.authService.currentUser = {id: user.user.uid, email: user.user.email}
      localStorage.setItem('admin', JSON.stringify(this.authService.currentUser))
      this.router.navigateByUrl('/admin')
    })
    .catch( error => {
      if (error.code == "auth/wrong-password" || error.code == "auth/too-many-requests"){
        this.isResetPassword = true
      } else {
        this.isResetPassword = false
      }
      this.errorLogin = error.message
    })
  };

  resetPassword(){
    this.authService.resetPassword(this.emailValue).then( () => {
      this.resetForm()
    })
  };

  resetForm(){
    this.isResetPassword = false
    this.errorLogin = ''
    this.emailValue = ''
    this.passwordValue = ''
  }
}
