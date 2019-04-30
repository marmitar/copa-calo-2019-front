import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AlertService } from '#/services/alert.service';
import { AuthService } from '#/services/auth.service';
import { CollegeService, College } from '#/services/college.service';
import { AthleteService, Athlete } from '#/services/athlete.service';
import { TrackService, Track, Registration } from '#/services/track.service';

@Component({
  selector: 'app-delete-athlete',
  templateUrl: './delete-athlete.component.html',
  styleUrls: ['./delete-athlete.component.scss']
})
export class DeleteAthleteComponent implements OnInit {
  collegeForm = new FormControl();
  athleteForm = new FormControl();

  colleges: string[] = [];
  athletes: Athlete[] = [];
  tracks: Registration[] = [];

  deleteForm = new FormGroup({
    college: this.collegeForm,
    athlete: this.athleteForm,
    track: new FormControl()
  });

  constructor(
    private college: CollegeService,
    private auth: AuthService,
    private alert: AlertService,
    private athlete: AthleteService
  ) { }

  ngOnInit() {
    this.auth.permission().subscribe(
      permission => {
        this.getCollege(permission === 'dm');
      },
      err => this.alert.error(err)
    );

    this.collegeForm.valueChanges.subscribe(
      data => {
        if (data) {
          this.getAthletes();
        }
      },
      err => this.alert.error(err)
    );

    this.athleteForm.valueChanges.subscribe(
      data => {
        if (data) {
          this.tracks = data.tracks;
        }
      }
    );
  }

  getCollege(unique: boolean) {
    if (unique) {
      this.college.getUserCollege(this.auth.headers()).subscribe(
        data => {
          this.colleges = [data.initials];
          this.collegeForm.setValue(data.initials);
          this.collegeForm.disable();
        },
        err => this.alert.error(err)
      );
    } else {
      this.college.fetchAll().subscribe(
        data => {
          this.colleges = data.map(c => c.initials);
        },
        err => this.alert.error(err)
      );
    }
  }

  getAthletes() {
    this.college.getAthletes(this.collegeForm.value).subscribe(
      data => {
        this.athletes = data;
      },
      err => this.alert.error(err)
    );
  }

  submitDelete() {
    const values = this.deleteForm.value;

    if (values.track !== 'todas') {
      const atl: Athlete = values.athlete;
      this.athlete.deregister(atl.name, atl.rg, values.track.trackName, this.auth.headers()).subscribe(
        _ => this.alert.message(`${atl.name.split(' ')[0]} removido da prova de ${values.track.trackName}`),
        err => this.alert.error(err)
      );
    } else {
      const atl: Athlete = values.athlete;
      this.athlete.delete(atl.name, atl.rg, this.auth.headers()).subscribe(
        _ => this.alert.message(`${atl.name.split(' ')[0]} removido`),
        err => this.alert.error(err)
      );
    }
  }

}
