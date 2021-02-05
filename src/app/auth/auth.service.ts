import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, BehaviorSubject, throwError, Subscription} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {error} from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new BehaviorSubject(false);
  AUTH_SERVER = 'http://localhost:4200/api/client';
  TOKEN_SERVER = 'http://localhost:4200/api/authorize';

  constructor(private httpClient: HttpClient) {
  }

  public signIn(userData: User): Subscription {
    console.log(userData);
    return this.httpClient.post(
      `${this.AUTH_SERVER}`,
      {'id': userData.id, 'passwd': userData.passwd},
      {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
      .subscribe(res => {
          this.getAccessToken(res['clientId'], res['clientSecret'], res['authorizationNonce'])
        },
        err => {
          console.log(err.$data);
        });
  }

  // 42 - 12345678
  /*authorizationNonce: "f7300e2a265a4aaaa440d2e1bfd6f8c0"
  clientId: "b10679cbbe334e04930b18453748bccc"
  clientIdIssuedAt: 1612514798.59745
  clientSecret: "hlVXTMzNMkzciKY6E9CLpdL0tRASw9JI"
  clientSecretExpiresAt: 0
  id: 332
  tokenEndpointAuthMethod: "client_secret_post"
  user: 42 */
  private getAccessToken(clientId, clientSecret, authorizationNonce) {
    console.log(clientId);
    return this.httpClient.post(
      `${this.TOKEN_SERVER}`,
      {
        'nonce': authorizationNonce,
        'grant_type': 'authorization_code',
        'client_id': clientId,
        'client_secret': clientSecret,
      },
      {headers: {'Content-Type': 'application/json', 'Accept': 'application/x-www-form-urlencoded'}})
      .subscribe(res => {
          console.log(res);
          //localStorage.setItem('accessToken', res['token'])
          //this.authSubject.next(true);
        },
        err => {
          console.log(err.$data);
        });
  }

  public signIn2(userData: User): Observable<JwtResponse> {
    console.log(userData);
    return this.httpClient.post(`${this.AUTH_SERVER}`,
      {'id': userData.id, 'passwd': userData.passwd},
      {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}
    ).pipe(
      tap
      (async (res: JwtResponse) => {
          console.log('login authService send');
          if (res.user) {
            console.log('login authService if');
            console.log(res);
            //this.authSubject.next(true);
          } else {
            console.log('wrong password');
          }
        },
        (e => console.log(e))
      )
    );
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    this.authSubject.next(false);
  }

  isAuthenticated() {
    return this.authSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
