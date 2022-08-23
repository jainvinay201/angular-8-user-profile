import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  baseUrl = environment.baseUrl + 'user';

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.httpClient.post(this.baseUrl, user);
  }

  getUserDetailsById(id: number){
          return this.httpClient.get<User>(this.baseUrl+'/'+id);
  }
}
