import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '##/environments/environment';
import { User } from '#/models';
export { User };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL + '/user/';

  private user: User;
  public userChange = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient) { }

  username(): Observable<string> {
    return this.userChange.pipe(
      map(user => user ? user.username : null)
    );
  }

  permission(): Observable<string> {
    return this.userChange.pipe(
      map(user => user ? user.permission : 'none')
    );
  }

  headers(): {headers: HttpHeaders} {
    let headers;
    if (this.user) {
      headers = new HttpHeaders({Authorization: 'Bearer ' + this.user.token});
    } else {
      headers = new HttpHeaders({});
    }

    return {headers};
  }

  updateUser(user: User) {
    this.user = user;
    this.userChange.next(user);
  }

  login(username: string, password: string) {
    const body = {username, password};
    const waitUser = this.http.post(this.url + 'auth', body) as Observable<User>;

    return waitUser.pipe(map(user => {
      if (!user.token) {
        throw Error('Falha no login');
      }

      this.updateUser(user);
    }, this));
  }

  logout() {
    const waitAns = this.http.delete(this.url + 'auth', this.headers()) as Observable<boolean>;

    return waitAns.pipe(map(ans => {
      this.updateUser(null);

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
