import { NgModule } from '@angular/core';
import { SnackbarModule } from '@pp-core/snackbar';
import { AuthenticationGuard } from './authentication-guard/authentication.guard';
import { AuthenticationService } from './authentication-service/authentication.service';
import { UserAccountService } from './user/user-account-service/user-account.service';

@NgModule({
  providers: [
    UserAccountService,
    AuthenticationService,
    AuthenticationGuard
  ],
  imports: [ SnackbarModule ]
})
export class AuthenticationModule { }
