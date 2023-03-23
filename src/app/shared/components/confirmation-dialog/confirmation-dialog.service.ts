import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmationResponse } from "./data/confirmation-dialog-response.enum";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { ConfirmDialogData } from "./data/confirmation-dialog.data.model";

@Injectable()
export class ConfirmationDialogService {

  constructor(public dialog: MatDialog) { }

  public confirm(data: ConfirmDialogData): Observable<ConfirmationResponse> {
    const confirmModel = new ConfirmDialogData(data);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: confirmModel.width,
      data: confirmModel
    });

    return dialogRef.afterClosed();
  }
}