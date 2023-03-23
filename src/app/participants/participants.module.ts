import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantsRoutingModule } from './participants-routing.module';
import { ParticipantsFormComponent } from './participants-form/participants-form.component';
import { PromotionCommonModule } from '@app/promotion-common';

@NgModule({
  declarations: [
    ParticipantsFormComponent,
  ],
  imports: [
    CommonModule,
    ParticipantsRoutingModule,
    PromotionCommonModule
  ]
})
export class ParticipantsModule { }
