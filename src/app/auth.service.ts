import { Injectable } from '@angular/core';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  public signIn(userData: User){
    //Todo implement sign in https://www.techiediaries.com/angular/angular-9-http-post-node-express-example/
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
