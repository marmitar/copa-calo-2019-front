import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '##/environments/environment';
import { User } from '#/models';
export { User };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL + '/user/';

  private user: User = null;

  constructor(private http: HttpClient) { }

  username() {
    return this.user ? this.user.username : null;
  }

  isAdmin() {
    return this.user.permission === 'admin';
  }

  isDM() {
    return this.user.permission === 'dm';
  }

  isArbiter() {
    return this.user.permission === 'arbiter';
  }

  token() {
    return this.user.token;
  }

  headers() {
    return this.user ? {headers: {Authorization: 'Bearer ' + this.user.token}} : null;
  }

  login(username: string, password: string) {
    const body = {username, password};
    const waitUser = this.http.post(this.url + 'auth', body) as Observable<User>;

    return waitUser.pipe(map(user => {
      if (!user.token) {
        throw Error('Falha no login');
      }

      this.user = user;
    }, this));
  }

  logout() {
    const waitAns = this.http.delete(this.url + 'auth', this.headers()) as Observable<boolean>;

    return waitAns.pipe(map(ans => {
      this.user = null;

      if (!ans) {
        throw Error('Problemas na saída');
      }
    }, this));
  }

  read() {
    return this.http.get(this.url + 'read', this.headers()) as Observable<User>;
  }

  update(username?: string, password?: string) {
    const body = {username, password};

    return this.http.patch(this.url + 'update', body, this.headers()) as Observable<User>;
  }

  free(username: string) {
    return this.http.get(this.url, {params: {username}}) as Observable<boolean>;
  }
}
