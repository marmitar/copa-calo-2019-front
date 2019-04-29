import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor( private snackBar: MatSnackBar) { }

  error(error: any) {
    console.error(error);

    const message = this.getMessage(error);
    this.snackBar.open(message, 'Fechar', {
      verticalPosition: 'top',
      duration: 3500,
    });
  }

  message(message: string) {
    this.snackBar.open(message, 'Fechar', {
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  private isString(error: any) {
    return typeof error === 'string' || error instanceof String;
  }

  private getMessage(error: any): string {
    if (this.isString(error)) {
      return error;
    } else if (this.isString(error.error.description)) {
      return error.error.description;
    } else if (this.isString(error.error.kind)) {
      return error.error.kind;
    } else if (this.isString(error.error)) {
      return error.error;
    } else {
      return 'Ocorreu algum erro';
    }
  }

}
