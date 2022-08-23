import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = environment.baseUrl;


  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
    //when you refresh the page, currentUserSubject set to null so 
    //populate it using localStorage if user alerady logged in 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    const request = {
      "email": email,
      "password": password
    }

    const headers = new HttpHeaders().set('exclude', 'Y');
    return this.httpClient.post<any>(this.baseUrl + 'user/login', request, { headers: headers })
      .pipe(map(res => {
        if (res && res.token) {
          // store token details in local storage to validate all the requests
          localStorage.setItem('token', res.token);
        } 
        return res;
      }))
  }

  getUserDetails(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.httpClient.get<User>(this.baseUrl + 'user', { params }).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    )
  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    //  this.currentUserSubject.next(null);
  }
}
