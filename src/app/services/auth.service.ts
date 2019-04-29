import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '##/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL + '/user/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const body = {username, password};
    return this.http.post(this.url + 'auth', body) as Observable<User>;
  }

  logout(token: string) {
    const headers = {Authorization: 'Bearer ' + token};
    return this.http.delete(this.url + 'auth', {headers}) as Observable<boolean>;
  }

  read(token: string) {
    const headers = {Authorization: 'Bearer ' + token};
    return this.http.get(this.url + 'read', {headers}) as Observable<User>;
  }

  update(token: string, username?: string, password?: string) {
    const headers = {Authorization: 'Bearer ' + token};
    const body = {username, password};
    return this.http.patch(this.url + 'update', body, {headers}) as Observable<User>;
  }

  free(username: string) {
    return this.http.get(this.url, {params: {username}}) as Observable<boolean>;
  }
}

export class User {
  username: string;
  permission: string;
  token?: string;
}
