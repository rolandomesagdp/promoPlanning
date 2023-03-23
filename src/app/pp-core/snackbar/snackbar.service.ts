import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@shared/pp-angular-material';

@Injectable()
export class SnackbarService {
  successConfig: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: "end",
    verticalPosition: "bottom",
    panelClass: ["snackbar-success"]
  };

  warnConfig: MatSnackBarConfig = {
    duration: 7000,
    horizontalPosition: "end",
    verticalPosition: "bottom",
    panelClass: ["snackbar-warn"]
  };

  errorConfig: MatSnackBarConfig = {
    duration: 10000,
    horizontalPosition: "end",
    verticalPosition: "bottom",
    panelClass: ["snackbar-error"]
  };

  constructor(private snackBar: MatSnackBar) { }

  openSuccess(message: string): void {
    this.snackBar.open(message, "Close", this.successConfig);
  }

  openWarn(message: string): void {
    this.snackBar.open(message, "Close", this.warnConfig);
  }

  openError(message: string): void {
    this.snackBar.open(message, "Close", this.errorConfig);
  }
}
