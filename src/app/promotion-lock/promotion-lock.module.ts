import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionLockService } from './promotion-lock.service';
import { ConfirmationDialogModule } from '@shared/components/confirmation-dialog';

@NgModule({
  imports: [ 
    CommonModule,
    ConfirmationDialogModule
  ],
  providers: [ PromotionLockService ]
})
export class PromotionLockModule { }
