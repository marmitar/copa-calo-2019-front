import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '##/environments/environment';
import { College, Athlete } from '#/models';
export { College };

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private url = environment.apiURL + '/college/';

  constructor(private http: HttpClient) { }

  fetchAll() {
    return this.http.get(this.url + 'all') as Observable<College[]>;
  }

  fetch(initials: string) {
    const params = {initials};
    return this.http.get(this.url + 'read', {params}) as Observable<College>;
  }

  getUserCollege(headers: {headers: HttpHeaders}) {
    return this.http.get(this.url + 'read', headers) as Observable<College>;
  }

  create(college: College) {
    return this.http.put(this.url + 'create', college) as Observable<College>;
  }

  getAthletes(initials: string) {
    return this.http.get(this.url + 'athletes', {params: {initials}}) as Observable<Athlete[]>;
  }

}
