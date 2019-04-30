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
  success = false;

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<UserLogoutComponent, boolean>
  ) { }

    logout() {
      this.running = true;

      this.auth.logout().subscribe(
        () => {
          this.alert.message('Saída com sucesso');

          this.success = true;
        },
        err => this.alert.error(err),
        () => this.dialogRef.close(this.success)
      );
    }
}
