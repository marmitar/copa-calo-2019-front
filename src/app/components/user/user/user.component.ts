import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '#/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserLoginComponent } from '#/components/user/user-login/user-login.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User = null;
  token: string = null;

  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUser();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
        this.token = result.token;
      }
    });
  }

  logUser() {
    this.auth.read(this.token).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }

  getUser() {
    if (this.token) {
      this.auth.read(this.token).subscribe(
        data => {
          this.user = data;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
