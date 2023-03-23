import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastDetailsComponent } from './forecast-details/forecast-details.component';
import { EditForecastComponent } from './edit-forecast/edit-forecast.component';
import { PromotionCommonModule } from '@app/promotion-common';
import { ParticipantsForecastRoutingModule } from './participants-forecast-routing.module';

@NgModule({
  declarations: [
    ForecastDetailsComponent,
    EditForecastComponent
  ],
  imports: [
    CommonModule,
    ParticipantsForecastRoutingModule,
    PromotionCommonModule
  ]
})
export class ParticipantsForecastModule { }
