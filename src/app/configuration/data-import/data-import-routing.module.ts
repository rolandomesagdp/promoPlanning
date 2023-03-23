import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { ForecastDemandImportListComponent } from './forecast-demand-import';
import { PromotionImportListComponent } from './promotion-import/promotion-import-list';
import { MasterDataImportListComponent } from './master-data-import/master-data-import-list/master-data-import-list.component';

const routes: Routes = [
  { path: '', component: PromotionImportListComponent, canActivate: [AuthenticationGuard] },
  { path: 'promotion', component: PromotionImportListComponent, canActivate: [AuthenticationGuard] },
  { path: 'forecast-demand', component: ForecastDemandImportListComponent, canActivate: [AuthenticationGuard] },
  { path: 'master-data', component: MasterDataImportListComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataImportRoutingModule { }
