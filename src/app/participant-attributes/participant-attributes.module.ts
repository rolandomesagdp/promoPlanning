import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantAttributesListComponent } from './participant-attributes-list/participant-attributes-list.component';
import { ParticipantAttributesRoutingModule } from './participant-attributes-routing.module';
import { PromotionCommonModule } from '@app/promotion-common';

@NgModule({
  declarations: [
    ParticipantAttributesListComponent
  ],
  imports: [
    CommonModule,
    ParticipantAttributesRoutingModule,
    PromotionCommonModule
  ]
})
export class ParticipantAttributesModule { }
