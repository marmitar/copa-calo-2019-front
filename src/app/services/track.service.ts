import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '##/environments/environment';
import { Track } from '#/models';
export { Track };

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private url = environment.apiURL + '/track/';

  constructor(private http: HttpClient) { }

  fetchAll() {
    return this.http.get(this.url + 'all') as Observable<Track[]>;
  }

  fetch(trackType: string, sex: string) {
    const params = {trackType, sex};
    return this.http.get(this.url + 'read', {params}) as Observable<Track>;
  }

}
