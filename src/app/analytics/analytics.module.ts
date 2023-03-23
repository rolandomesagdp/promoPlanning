import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { PpDevextremeModule } from '@shared/pp-devextreme';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { DrawerCardModule } from '@shared/components/drawer-card';
import { AnalyticsService } from './analytics-services';
import { ReportPageListComponent } from './report-page-list';
import { BoxModule } from '@shared/components/box';
import { PromoPlanningSpinnerModule } from '@shared/components/spinner';
import { ChartWrapperComponent } from './charts/chart-wrapper/chart-wrapper.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { FunnelChartComponent } from './charts/funnel-chart/funnel-chart.component';
import { NotSupportedChartComponent } from './charts/not-supported-chart/not-supported-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ChartHostDirective } from './charts/chart-host.directive';
import { ReportPageComponent } from './report-page/reports-page.component';
import { BackButtonModule } from '@shared/components/back-button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromoPlanningFiltersModule } from '@app/pp-filters';
import { ErrorMessageModule } from '@shared/components/error-message';

@NgModule({
  declarations: [
    ReportPageListComponent,
    ReportPageComponent,
    ChartWrapperComponent, 
    BarChartComponent, 
    FunnelChartComponent, 
    NotSupportedChartComponent, 
    PieChartComponent,
    ChartHostDirective
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    DrawerCardModule,
    BoxModule,
    PromoPlanningSpinnerModule,
    PpDevextremeModule,
    PpAngularMaterialModule,
    BackButtonModule,
    ErrorMessageModule,
    PromoPlanningFiltersModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ AnalyticsService ]
})
export class AnalyticsModule { }
