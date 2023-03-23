import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { ConfirmationResponse } from './data/confirmation-dialog-response.enum';
import { ConfirmDialogData } from './data/confirmation-dialog.data.model';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Component({
  selector: 'pp-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmDialogData: ConfirmDialogData) {}

  onAccept(): void {
    this.dialogRef.close(ConfirmationResponse.Accept);
  }

  onReject(): void {
    this.dialogRef.close(ConfirmationResponse.Reject);
  }
}

@NgModule({
  imports: [
    PpAngularMaterialModule,
    CommonModule
   ],
  exports: [ ConfirmationDialogComponent ],
  declarations: [ ConfirmationDialogComponent ],
  providers: [ ConfirmationDialogService ]
})
export class ConfirmationDialogModule { }
