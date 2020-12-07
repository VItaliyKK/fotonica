import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:IUser | null = null
  changeAuthState: Subject<firebase.default.User> = new Subject<firebase.default.User>()

  constructor(public fireAuth: AngularFireAuth) { }

  subscribeOnChangeAuthState(){
    
    this.fireAuth.authState.subscribe( user => {
      this.changeAuthState.next(user)
      console.log('•Change Auth State•!!!!');
    })
  }

  login(email:string, password:string): Promise<firebase.default.auth.UserCredential>{
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  logout(): Promise<void>{
    return this.fireAuth.signOut()
  }

  clearLocalStorage(){
    localStorage.removeItem('admin')
  }

  resetPassword(email:string): Promise<void>{
    return this.fireAuth.sendPasswordResetEmail(email)
  }
}
