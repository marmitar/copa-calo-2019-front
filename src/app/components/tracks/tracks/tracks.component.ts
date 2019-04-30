import { Component, OnInit, Input } from '@angular/core';
import { TrackService, Track } from '#/services/track.service';
import { AlertService } from '#/services/alert.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  tracks: Track[] = null;
  uniques: UniqueTrack[] = [];

  @Input() fetchData = true;
  running = false;

  constructor(private track: TrackService, private alert: AlertService) { }

  ngOnInit() {
    if (this.fetchData) {
      this.getTracks();
    }

  }

  clearTracks() {
    this.tracks = null;
    this.uniques = [];
  }

  getTracks() {
    this.running = true;

    this.track.fetchAll().subscribe(
      data => {
        this.tracks = data;
        this.getUniques(data);
      },
      err => this.alert.error(err),
      () => this.running = false
    );
  }

  getUniques(tracks: Track[]) {
    const uniques: UniqueTrack[] = [];

    tracks.map(
      track => {
        const index = uniques.findIndex(unique => unique.name === track.name);

        let uniqueTrack = {name: track.name, female: false, male: false};
        if (index >= 0) {
          uniqueTrack = uniques[index];
        }

        if (track.sex === 'masculino') {
          uniqueTrack.male = true;
        } else {
          uniqueTrack.female = true;
        }

        if (index >= 0) {
          uniques[index] = uniqueTrack;
        } else {
          uniques.push(uniqueTrack);
        }
      }
    );

    uniques.sort(
      (a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name === b.name) {
          return 0;
        } else {
          return 1;
        }
      }
    );

    this.uniques = uniques;
  }

}

class UniqueTrack {
  name: string;
  female: boolean;
  male: boolean;
}

class Sexes {
  female: boolean;
  male: boolean;
}
