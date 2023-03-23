import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionTypeChipComponent } from './promotion-type-chip/promotion-type-chip.component';
import { PromotionTypeService } from './promotion-type.service';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { PromotionTypePipe } from './promotion-type.pipe';

@NgModule({
  declarations: [
    PromotionTypeChipComponent,
    PromotionTypePipe
  ],
  imports: [
    CommonModule,
    PpAngularMaterialModule
  ],
  exports: [
    PromotionTypeChipComponent,
    PromotionTypePipe
  ],
  providers: [
    PromotionTypeService
  ]
})
export class PromotionTypeModule { }
