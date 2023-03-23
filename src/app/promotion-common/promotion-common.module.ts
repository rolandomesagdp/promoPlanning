import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PromotionFormLayoutComponent } from './promotion-form-layout/promotion-form-layout.component';
import { PpAngularMaterialModule } from "@shared/pp-angular-material";
import { PromotionFormHeaderComponent } from './promotion-form-header/promotion-form-header.component';
import { PpExportModule } from "@app/export";
import { EnvironmentModule } from "@pp-core/environment";
import { PpPageModule } from "@shared/components/page";
import { PromotionNavigationComponent } from "./promotion-navigation";
import { PromotionSummaryComponent } from "./promotion-summary";
import { PromotionTypeModule } from "@app/promotion-type";
import { UpliftChipModule } from "@shared/components/uplift-chip";
import { DurationChipModule } from "@shared/components/duration-chip";
import { PromotionStatusModule } from "@app/promotion-status";
import { PromotionActionsComponent } from "./promotion-actions/promotion-actions.component";
import { PromotionService } from "./promotion-service/promotion.service";
import { PromotionActionsManager } from "./promotion-actions/promotion-actions.manager";
import { PromotionSummaryService } from "./promotion-service/promotion-summary.service";
import { UnitsOfMeasurementModule } from "@pp-core/units-of-measurement/units-of-measurement.module";
import { PromoPlanningSpinnerModule } from "@shared/components/spinner";
import { ReactiveFormsModule } from "@angular/forms";
import { PromotionSimulationService } from "./promotion-simulation/promotion-simulation.service";
import { PromotionSimulatorComponent } from "./promotion-simulation/promotion-simulator/promotion-simulator.component";
import { SnackbarModule } from "@pp-core/snackbar";
import { LoggingModule } from "@pp-core/logging";
import { PromotionPermissionsManager } from "./promotion-permissions/promotion-permissions-manager";
import { DynamicGridConfigurationModule } from '@app/dynamic-grid-configuration';
import { PromotionFormService } from "./promotion-form/promotion-form.service";

@NgModule({
    imports: [
      CommonModule,
      PpAngularMaterialModule,
      PpPageModule,
      PpExportModule,
      EnvironmentModule,
      PromotionTypeModule,
      UpliftChipModule,
      PromotionStatusModule,
      DurationChipModule,
      UnitsOfMeasurementModule,
      PromoPlanningSpinnerModule,
      ReactiveFormsModule,
      SnackbarModule,
      LoggingModule,
      DynamicGridConfigurationModule
    ],
    declarations: [
      PromotionFormLayoutComponent,
      PromotionFormHeaderComponent,
      PromotionSummaryComponent,
      PromotionActionsComponent,
      PromotionNavigationComponent,
      PromotionSimulatorComponent
    ],
    exports: [
      PromotionFormLayoutComponent,
      PromotionFormHeaderComponent,
      PromotionSummaryComponent,
      PromotionActionsComponent,
      PromotionNavigationComponent,
      PromotionSimulatorComponent
    ],
    providers: [ 
      PromotionService, 
      PromotionSummaryService, 
      PromotionActionsManager, 
      PromotionSimulationService,
      PromotionPermissionsManager,
      PromotionFormService
    ]
  })
  export class PromotionCommonModule { }