import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { ForecastDetailsComponent } from './forecast-details/forecast-details.component';
import { EditForecastComponent } from './edit-forecast/edit-forecast.component';

const routes: Routes = [
    { path: "details/:id", component: ForecastDetailsComponent, canActivate: [AuthenticationGuard] },
    { path: "edit/:id", component: EditForecastComponent, canActivate: [AuthenticationGuard] }
  ]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ParticipantsForecastRoutingModule { }