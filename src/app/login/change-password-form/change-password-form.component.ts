import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '@pp-core/auth/authentication-service/authentication.service';
import { SnackbarService } from '@pp-core/snackbar';
import { PpDevextremeModule } from '@shared/pp-devextreme';

@Component({
  selector: 'pp-change-passsword-form',
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent implements OnInit {
  loading = false;
  formData: any = {};
  recoveryCode: string;

  constructor(private authService: AuthenticationService, private router: Router, 
    private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recoveryCode = params.get('recoveryCode');
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { password } = this.formData;
    this.loading = true;

    const result = await this.authService.changePassword(password, this.recoveryCode);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/sign-in']);
    } else {
      this.snackbarService.openError(result.message);
    }
  }

  confirmPassword = (e: { value: string }) => {
    return e.value === this.formData.password;
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PpDevextremeModule
  ],
  declarations: [ ChangePasswordFormComponent ],
  exports: [ ChangePasswordFormComponent ]
})
export class ChangePasswordFormModule { }
