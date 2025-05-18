import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
constructor(private _snackbar: MatSnackBar) {}

  openSnackBar(msg: string) {
    let configObj: MatSnackBarConfig = {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    };
    this._snackbar.open(msg, 'close', configObj);
  }
}
