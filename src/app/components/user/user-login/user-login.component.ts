import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '#/services/alert.service';
import { AuthService, User } from '#/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  username: string = null;
  password: string = null;

  running = false;

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<UserLoginComponent, boolean>
  ) {}

  login() {
    this.running = true;

    this.auth.login(this.username, this.password).subscribe(
      () => {
        this.alert.message('Entrada com sucesso');

        this.dialogRef.close(true);
      },
      err => {
        if (err.error.kind === 'ResourceNotFound') {
          this.alert.error('Nenhum usuário com este nome');
        } else if (err.error.kind === 'InvalidPassword') {
          this.alert.error('Senha errada');
        } else {
          this.alert.error(err);
        }

        this.dialogRef.close(false);
      }
    );
  }

}
