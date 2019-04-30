import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '##/environments/environment';
import { Athlete } from '#/models';
export { Athlete };

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private url = environment.apiURL + '/athlete/';

  constructor(private http: HttpClient) { }

  fetchAll() {
    return this.http.get(this.url + 'all') as Observable<Athlete[]>;
  }

  fetch(name?: string, rg?: string) {
    const params = {name, rg};
    return this.http.get(this.url + 'read', {params}) as Observable<Athlete>;
  }

  create(name: string, rg: string, rgOrgao: string, sex: string, headers: {headers: HttpHeaders}, college?: string) {
    const body = {name, rg, rgOrgao, sex, college};
    return this.http.put(this.url + 'create', body, headers) as Observable<Athlete>;
  }

  delete(name: string, rg: string, headers: {headers: HttpHeaders}) {
    const body = {athleteName: name, athleteRg: rg};
    return this.http.post(this.url + 'delete', body, headers) as Observable<any>;
  }

  deregister(name: string, rg: string, trackName: string, headers: {headers: HttpHeaders}) {
    const body = {athleteName: name, athleteRg: rg, trackName};
    return this.http.post(this.url + 'delete', body, headers) as Observable<any>;
  }

}
