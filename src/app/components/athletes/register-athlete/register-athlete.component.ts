import { Subscriber, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AlertService } from '#/services/alert.service';
import { AuthService } from '#/services/auth.service';
import { CollegeService, College } from '#/services/college.service';
import { AthleteService, Athlete } from '#/services/athlete.service';
import { TrackService, Track, Registration } from '#/services/track.service';

@Component({
  selector: 'app-register-athlete',
  templateUrl: './register-athlete.component.html',
  styleUrls: ['./register-athlete.component.scss']
})
export class RegisterAthleteComponent implements OnInit {
  collegeForm = new FormControl();
  trackForm = new FormControl();

  athlete1Form = new FormControl();
  bestMark1Form = new FormControl();
  athlete2Form = new FormControl();
  bestMark2Form = new FormControl();
  athleteXForm = new FormControl();
  bestMarkXForm = new FormControl();

  inscricaoForm = new FormGroup({
    college: this.collegeForm,
    track: this.trackForm,
    athlete1: this.athlete1Form,
    bestMark1: this.bestMark1Form,
    athlete2: this.athlete2Form,
    bestMark2: this.bestMark2Form,
    athleteX: this.athleteXForm,
    bestMarkX: this.bestMarkXForm,
  });

  colleges: string[] = [];
  tracks: Track[] = [];
  athletes: Athlete[] = [];

  constructor(
    private college: CollegeService,
    private auth: AuthService,
    private alert: AlertService,
    private track: TrackService
  ) { }

  private subscAuth: Subscription;
  private subscCollege: Subscription;
  private subscTrack: Subscription;
  private subscAthlete1: Subscription;
  private subscAthlete2: Subscription;
  private subscAthleteX: Subscription;
  ngOnInit() {
    this.subscAuth = this.auth.permission().subscribe(
      permission => {
        this.getCollege(permission === 'dm');
      },
      err => this.alert.error(err)
    );

    this.subscCollege = this.collegeForm.valueChanges.subscribe(
      _ => this.getTracks(),
      err => this.alert.error(err)
    );

    this.subscTrack = this.trackForm.valueChanges.subscribe(
      data => {
        if (data) {
          this.getAthletes(data.sex);
        } else {
          this.athletes = [];
        }
      },
      err => this.alert.error(err)
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

  getTracks() {
    this.track.fetchAll().subscribe(
      data => {
        this.tracks = data;
      },
      err => this.alert.error(err)
    );
  }

  getAthletes(sex: string) {
    this.college.getAthletes(this.collegeForm.value).subscribe(
      data => {
        this.athletes = data.filter(atl => atl.sex === sex);
      },
      err => this.alert.error(err)
    );
  }

  submitRegistration() {
    const values = this.inscricaoForm.value;

    if (values.athlete1) {
      this.track.registerAthlete(
        values.athlete1.name,
        values.athlete1.rg,
        values.track.trackType,
        this.auth.headers(),
        values.bestMark1,
        false,
      ).subscribe(
        data => this.alert.message(`${data.athlete.name.split(' ')[0]} registrado como regular`),
        err => this.alert.error(err)
      );
    }

    if (values.athlete2) {
      this.track.registerAthlete(
        values.athlete2.name,
        values.athlete2.rg,
        values.track.trackType,
        this.auth.headers(),
        values.bestMark2,
        false,
      ).subscribe(
        data => this.alert.message(`${data.athlete.name.split(' ')[0]} registrado como regular`),
        err => this.alert.error(err)
      );
    }

    if (values.athleteX) {
      this.track.registerAthlete(
        values.athleteX.name,
        values.athleteX.rg,
        values.track.trackType,
        this.auth.headers(),
        values.bestMarkX,
        true,
      ).subscribe(
        data => this.alert.message(`${data.athlete.name.split(' ')[0]} registrado como extra`),
        err => this.alert.error(err)
      );
    }
  }

}
