import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { CampaignsListComponent } from './campaigns-list/campaigns-list.component';

const routes: Routes = [
  { path: "campaigns", component: CampaignsListComponent, canActivate: [AuthenticationGuard] }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ]
})
export class CampaignRoutingModule { }