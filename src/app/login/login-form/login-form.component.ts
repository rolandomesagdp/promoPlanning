import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { LoginModel } from '@pp-core/auth';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { SnackbarService } from '@pp-core/snackbar';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { LoginFormFactory } from './login-form.factory';
import { AuthenticationService } from '@pp-core/auth/authentication-service/authentication.service';
import { PromoPlanningSpinnerModule } from '@shared/components/spinner';
import { PpUser } from '@pp-core/auth/user/pp-user.model';

@Component({
  selector: 'pp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  loading = false;
  loginForm: FormGroup = new LoginFormFactory(this.fb).createLoginForm();

  constructor(private router: Router, private authService: AuthenticationService, 
    private fb: FormBuilder, private snackbarService: SnackbarService) { }

  onSubmit() {
    const loginData: LoginModel = this.loginForm.value;
    this.loading = true;
    this.subscriptionManager.add(this.authService.logIn(loginData).pipe(
      tap((user: PpUser) => {
        this.onLoginSuccess(user);
      }),
      catchError(error => this.onError(error)))
      .subscribe());
  }

  inputHasError(controlName: string, errorName: string): boolean {
    const passwordControll: FormControl = this.loginForm.get(controlName) as FormControl;
    return passwordControll.hasError(errorName);
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

  private onLoginSuccess(user: PpUser): void {
    this.router.navigate([this.authService.requestedPath]);
    this.loading = false;
  }

  private onError(error: any): Observable<never> {
    this.loading = false;
    this.snackbarService.openError(error.message);
    return EMPTY;
  }
}
@NgModule({
  imports: [
    CommonModule,
    PpAngularMaterialModule,
    ReactiveFormsModule,
    PromoPlanningSpinnerModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
