import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '##/environments/environment';

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

  create(college: College) {
    return this.http.put(this.url + 'create', college) as Observable<College>;
  }
}

export class College {
  name: string;
  initials: string;
}
