import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '#/services/auth.service';
import { MatDialog } from '@angular/material';

import { UserLoginComponent } from '$/user/user-login/user-login.component';
import { UserLogoutComponent } from '$/user/user-logout/user-logout.component';

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

  loginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.token = result.token;
    });
  }

  logoutDialog() {
    const dialogRef = this.dialog.open(UserLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.token = result.token;
    });
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
