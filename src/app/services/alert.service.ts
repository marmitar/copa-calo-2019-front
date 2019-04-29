import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public messages: string[] = [];

  constructor( private snackBar: MatSnackBar) { }

  add(message: string) {
    this.snackBar.open(message, 'Fechar', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }

}
