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

  logout() {
    return this.http.delete(this.url + 'auth') as Observable<boolean>;
  }

  refresh() {
    return this.http.get(this.url + 'refresh') as Observable<boolean>;
  }

  read() {
    return this.http.get(this.url + 'read') as Observable<User>;
  }

  update(username?: string, password?: string) {
    const body = {username, password};
    return this.http.patch(this.url + 'update', body) as Observable<User>;
  }

  free(username: string) {
    return this.http.get(this.url, {params: {username}}) as Observable<boolean>;
  }
}

export class User {
  username: string;
}
