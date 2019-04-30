import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AuthService } from '#/services/auth.service';
import { AlertService } from '#/services/alert.service';
import { AthleteService, Athlete } from '#/services/athlete.service';
import { CollegeService, College } from '#/services/college.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-athlete',
  templateUrl: './create-athlete.component.html',
  styleUrls: ['./create-athlete.component.scss']
})
export class CreateAthleteComponent implements OnInit {
  collegeForm = new FormControl();
  inscricaoForm = new FormGroup({
    college: this.collegeForm,
    name: new FormControl(),
    rg: new FormControl(),
    rgOrgao: new FormControl(),
    sex: new FormControl()
  });

  isDm: boolean;
  collegeOptions: Observable<string[]>;
  colleges: string[];

  subscAuth: Subscription;

  constructor(
    private athlete: AthleteService,
    private college: CollegeService,
    private auth: AuthService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.subscAuth = this.auth.permission().subscribe(
      permission => {
        if (permission !== 'dm') {
          this.isDm = false;
          this.getColleges();
        } else {
          this.isDm = true;
          this.getCollege();
        }
      }
    );
  }

  getCollege() {
    this.collegeOptions = this.college.getUserCollege(this.auth.headers()).pipe(
      map(college => {
        this.collegeForm.setValue(college.initials);
        this.collegeForm.disable();

        return [college.initials];
      })
    );
  }

  getColleges() {
    this.college.fetchAll().subscribe(
      data => this.colleges = data.map(c => c.initials),
      err => this.alert.error(err),
      () => this.collegeOptions = this.collegeForm.valueChanges.pipe(
        startWith(''),
        map(options => this.filterOptions(options))
      )
    );
  }

  private filterOptions(initials?: string): string[] {
    const lower = initials.toLocaleLowerCase();

    return this.colleges.filter(c => c.toLocaleLowerCase().includes(lower));
  }

  submitAthlete() {
    const atl = this.inscricaoForm.value as Athlete;
    this.athlete.create(atl.name, atl.rg, atl.rgOrgao, atl.sex, this.auth.headers(), atl.college).subscribe(
      data => {
        this.alert.message(`${atl.name.split(' ')[0]} criado com sucesso`);
      },
      err => this.alert.error(err)
    );
  }

}
