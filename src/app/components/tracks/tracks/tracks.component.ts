import { Component, OnInit } from '@angular/core';
import { TrackService, Track } from '#/services/track.service';
import { AlertService } from '#/services/alert.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  tracks: Track[] = null;

  constructor(private track: TrackService, private alert: AlertService) { }

  ngOnInit() {
    this.getTracks();
  }

  getTracks() {
    this.track.fetchAll().subscribe(
      data => {
        this.tracks = data;
      },
      err => this.alert.error(err)
    );
  }

}
