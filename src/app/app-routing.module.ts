import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ChangePasswordFormComponent } from './login';
import { PpDevextremeModule } from './shared/pp-devextreme';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'promotion',
    loadChildren: () => import('./promotion/promotion.module').then(m => m.PromotionModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
  },
  {
    path: 'sign-in',
    component: LoginFormComponent,
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'poc',
    loadChildren: () => import('./proof-of-concept/proof-of-concept.module').then(m => m.ProofOfConceptModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PpDevextremeModule]
})
export class AppRoutingModule { }
