import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInfoService } from './app-info';
import { LoggingModule } from './logging';
import { SettingsModule } from './settings';
import { AuthenticationModule } from './auth';
import { LocalStorageService } from './local-storage/local-storage.service';
import { SnackbarModule } from './snackbar';
import { AuthCookieExpiredInterceptor } from './auth/auth-cookie-expired-interceptor';
import { UnitsOfMeasurementService } from './units-of-measurement';
import { EnvironmentGuard, EnvironmentModule } from './environment';
import { PermissionManagerService } from '@pp-core/permissions';
import { PermissionsMasterHttpService } from '@pp-core/permissions/permissions-master-http.service/permissions-master-http.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EnvironmentModule,
    SettingsModule,
    LoggingModule,
    AuthenticationModule,
    SnackbarModule,
    RouterModule
  ],
  exports: [RouterModule],
  providers: [
    EnvironmentGuard,
    AppInfoService,
    LocalStorageService,
    UnitsOfMeasurementService,
    PermissionManagerService,
    PermissionsMasterHttpService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthCookieExpiredInterceptor, multi: true }
  ]
})
export class PpCoreModule { }