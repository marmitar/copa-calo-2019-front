import { AlertService } from '#/services/alert.service';
import { Component } from '@angular/core';
import { AuthService, User } from '#/services/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  username: string = null;
  password: string = null;

  logginIn = false;

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<UserLoginComponent>
  ) {}

  login() {
    this.logginIn = true;

    this.auth.login(this.username, this.password).subscribe(
      data => {
        this.dialogRef.close(data);
      },
      err => {
        if (err.error.kind === 'ResourceNotFound') {
          this.alert.add('Nenhum usuário com este nome');
        } else if (err.error.kind === 'InvalidPassword') {
          this.alert.add('Senha errada');
        } else {
          this.alert.add(err.error.description);
        }

        this.dialogRef.close();
      }
    );
  }

}
