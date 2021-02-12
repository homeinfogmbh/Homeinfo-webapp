import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject, throwError, Subscription} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new BehaviorSubject<boolean>(false);
  AUTH_SERVER = 'http://localhost:4200/api/client';
  TOKEN_SERVER = 'http://localhost:4200/api/authorize';

  constructor(private httpClient: HttpClient){
  }

  public getAccessToken(clientId, clientSecret, authorizationNonce) {
    let formData = new FormData();
    formData.append('response_type', 'code');
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('nonce', authorizationNonce);
    formData.append('redirect_uri', 'http://localhost:4200/grantAccess');
    formData.append('scope', 'comcat');
    localStorage.setItem('client_id', clientId);
    localStorage.setItem('client_secret', clientSecret);
    return this.httpClient.post(
      `${(this.TOKEN_SERVER)}`, formData,
      {headers: {'Accept': 'application/x-www-form-urlencoded'}})
      .subscribe(res => {
          //this.authSubject.next(true);
        },
        err => {
          console.log(err);
        });
  }

  public signIn(userData: User): Observable<JwtResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER}`,
      {'id': userData.id, 'passwd': userData.passwd},
      {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}
    ).pipe(tap(async (res: JwtResponse) => {
          if (res.user) {
            console.log(res);
            this.getAccessToken(res.clientId, res.clientSecret, res.authorizationNonce);
          }
        },
        (e => console.log(e))
      )
    );
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null && this.isAuthenticated();
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('client_id');
    localStorage.removeItem('client_secret');
    this.authSubject.next(false);
  }

  isAuthenticated() {
    return this.authSubject.asObservable();
  }

  authSubjectValue(b: boolean) {
    this.authSubject.next(b);
  }
}
