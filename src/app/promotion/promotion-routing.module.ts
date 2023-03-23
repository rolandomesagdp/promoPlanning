import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionRoiComponent } from './promotion-roi/promotion-roi.component';
import { PromotionCopyComponent } from './promotion-copy/promotion-copy.component';
import { PromotionCardsComponent } from './promotion-cards/promotion-cards.component';

const routes: Routes = [
  { path: "list", component: PromotionListComponent, canActivate: [AuthenticationGuard] },
  { path: "cards", component: PromotionCardsComponent, canActivate: [AuthenticationGuard] },
  { path: 'copy/:id', component: PromotionCopyComponent, canActivate: [ AuthenticationGuard ]},
  { path: 'roi/:id', component: PromotionRoiComponent, canActivate: [ AuthenticationGuard ]},
  { 
    path: 'participants', 
    loadChildren: () => import('./../participants/participants.module').then(m => m.ParticipantsModule), 
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'forecast', 
    loadChildren: () => import('./../participants-forecast/participants-forecast.module').then(m => m.ParticipantsForecastModule), 
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: "participantAttributes",
    loadChildren: () => import('./../participant-attributes/participant-attributes.module').then(m => m.ParticipantAttributesModule), 
    canActivate: [ AuthenticationGuard ]
  }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ]
})
export class PromotionRoutingModule { }