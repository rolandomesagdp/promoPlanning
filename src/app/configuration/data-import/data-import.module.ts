import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataImportRoutingModule } from './data-import-routing.module';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { ErrorMessageModule } from '@shared/components/error-message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromoPlanningSpinnerModule } from '@shared/components/spinner';
import { PromotionImportEditComponent } from './promotion-import/promotion-import-edit';
import { PromotionImportListComponent } from './promotion-import/promotion-import-list';
import { PromotionImportService } from './promotion-import/promotion-import.service';
import { PromotionImportDetailsComponent } from './promotion-import/promotion-import-details/promotion-import-details.component';
import { ForecastDemandImportListComponent } from './forecast-demand-import';
import { MasterDataImportListComponent } from './master-data-import/master-data-import-list/master-data-import-list.component';
import { MasterDataImportEditComponent } from './master-data-import/master-data-import-edit/master-data-import-edit.component';
import { MasterDataService } from './master-data-import/master-data.service';
import { PpPageModule } from '@shared/components/page';

@NgModule({
  declarations: [
    PromotionImportEditComponent,
    PromotionImportListComponent,
    PromotionImportDetailsComponent,
    ForecastDemandImportListComponent,
    MasterDataImportListComponent,
    MasterDataImportEditComponent
  ],
  imports: [
    CommonModule,
    DataImportRoutingModule,
    PpAngularMaterialModule,
    ErrorMessageModule,
    ReactiveFormsModule,
    FormsModule,
    PromoPlanningSpinnerModule,
    PpPageModule
  ],
  providers: [ 
    PromotionImportService,
    MasterDataService
  ]
})
export class DataImportModule { }
