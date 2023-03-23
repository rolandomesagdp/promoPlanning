import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionStatusChipComponent } from './promotion-status-chip/promotion-status-chip.component';
import { PromotionStatusService } from './promotion-status.service';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { PromotionStatusPipe } from './promotion-status.pipe';

@NgModule({
  declarations: [
    PromotionStatusChipComponent,
    PromotionStatusPipe
  ],
  imports: [
    CommonModule,
    PpAngularMaterialModule
  ],
  exports: [ PromotionStatusChipComponent, PromotionStatusPipe ],
  providers: [ PromotionStatusService ]
})
export class PromotionStatusModule { }
