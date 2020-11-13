import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:IUser | null = null

  constructor(private fireAuth: AngularFireAuth) { }

  login(email:string, password:string): Promise<firebase.default.auth.UserCredential>{
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  resetPassword(email:string): Promise<void>{
    return this.fireAuth.sendPasswordResetEmail(email)
  }
}
