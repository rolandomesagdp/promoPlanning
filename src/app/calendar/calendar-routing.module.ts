import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { CalendarComponent } from './calendar-view';

const routes: Routes = [
    { path: '', component: CalendarComponent, canActivate: [ AuthenticationGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CalendarRoutingModule { }