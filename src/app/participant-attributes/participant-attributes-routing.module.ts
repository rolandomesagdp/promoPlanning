import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { ParticipantAttributesListComponent } from './participant-attributes-list/participant-attributes-list.component';

const routes: Routes = [
    { path: ":id", component: ParticipantAttributesListComponent, canActivate: [AuthenticationGuard] }
  ]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ParticipantAttributesRoutingModule { }