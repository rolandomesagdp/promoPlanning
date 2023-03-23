import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { ReportPageListComponent } from './report-page-list';
import { ReportPageComponent } from './report-page/reports-page.component';

const routes: Routes = [
  { path: '', component: ReportPageListComponent, canActivate: [ AuthenticationGuard ] },
  { path: 'report-page/:id', component: ReportPageComponent, canActivate: [ AuthenticationGuard ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AnalyticsRoutingModule { }