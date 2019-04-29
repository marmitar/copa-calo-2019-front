import { AlertService } from '#/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { AuthService, User } from '#/services/auth.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent {
  running = false;

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<UserLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) { }

    logout() {
      this.running = true;

      this.auth.logout(this.user.token).subscribe(
        data => {
          if (data) {
            this.alert.message('Saída com sucesso');
          } else {
            this.alert.message('Ocorreu algum problema durante a saída');
          }

          this.dialogRef.close(null);
        },
        err => {
          this.alert.error(err);

          this.dialogRef.close(this.user);
        }
      );
    }
}
