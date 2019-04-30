import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '##/environments/environment';
import { Track, Registration } from '#/models';
export { Track, Registration };

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

  registerAthlete(
    athleteName: string,
    athleteRg: string,
    track: string,
    headers: {headers: HttpHeaders},
    bestMark?: number,
    extra?: boolean
  ) {
    const body = {athleteName, athleteRg, track, bestMark, extra};
    return this.http.post(this.url + 'register', body, headers) as Observable<Registration>;
  }

}
