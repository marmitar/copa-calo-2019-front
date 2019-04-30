import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '#/services/auth.service';
import { MatDialog } from '@angular/material';

import { UserLoginComponent } from '$/user/user-login/user-login.component';
import { UserLogoutComponent } from '$/user/user-logout/user-logout.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string = null;

  subscription: Subscription;

  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.auth.username().subscribe(
      username => this.username = username
    );

    this.auth.readCookies();
  }

  loginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginComponent);
  }

  logoutDialog() {
    const dialogRef = this.dialog.open(UserLogoutComponent);
  }

}
