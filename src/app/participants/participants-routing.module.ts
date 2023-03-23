import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { ParticipantsFormComponent } from './participants-form/participants-form.component';

const routes: Routes = [
    { path: ":id", component: ParticipantsFormComponent, canActivate: [AuthenticationGuard] }
  ]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ParticipantsRoutingModule { }