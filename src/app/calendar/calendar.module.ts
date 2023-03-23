import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PromoPlanningFiltersModule } from "@app/pp-filters";
import { PromotionLockModule } from "@app/promotion-lock";
import { ConfirmationDialogModule } from "@shared/components/confirmation-dialog";
import { ErrorMessageModule } from "@shared/components/error-message";
import { PromoPlanningSpinnerModule } from "@shared/components/spinner";
import { PpDevextremeModule } from "@shared/pp-devextreme";
import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarComponent } from "./calendar-view";
import { CalendarTasksService } from "./tasks";
import { PpPageModule } from "@shared/components/page";
import { PromotionCommonModule } from "@app/promotion-common";
import { UpliftChipModule } from '@shared/components/uplift-chip';

@NgModule({
    imports: [
      CommonModule,
      PpDevextremeModule,
      CalendarRoutingModule,
      PromoPlanningSpinnerModule,
      PromoPlanningFiltersModule,
      PromotionLockModule,
      ConfirmationDialogModule,
      ErrorMessageModule,
      PpPageModule,
      PromotionCommonModule,
      UpliftChipModule
    ],
    declarations: [CalendarComponent],
    exports: [CalendarComponent],
    providers: [ CalendarTasksService ]
  })
  export class CalendarModule { }
