import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AthleteService, Athlete } from '#/services/athlete.service';
import { AlertService } from '#/services/alert.service';


@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss']
})
export class AthletesComponent implements OnInit {
  public tableColumns = ['name', 'rg', 'sex', 'college', 'tracks'];
  public athletes = new MatTableDataSource<Athlete>();

  running = false;
  @Input() fetchData = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) tableSort: MatSort;

  constructor(
    private athlete: AthleteService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    if (this.fetchData) {
      this.getAthletes();
    }
  }

  clearAthletes() {
    this.athletes = new MatTableDataSource<Athlete>();
  }

  getAthletes() {
    this.running = true;

    this.athlete.fetchAll().subscribe(
      data => {
        const athletes = this.sortAthletes(data);
        this.athletes = new MatTableDataSource<Athlete>(athletes);
      },
      err => this.alert.error(err),
      () => this.running = false
    );
  }

  sortAthletes(athletes: Athlete[]): Athlete[] {
    return athletes.sort((a, b) => {
      if (a.college < b.college) {
        return -1;
      } else if (a.college === b.college) {
        return 0;
      } else {
        return 1;
      }
    });

  }

  applyFilter(filterValue: string) {
    this.athletes.filter = filterValue.trim().toLowerCase();
  }

}
