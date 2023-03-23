import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PpDevextremeModule } from '@shared/pp-devextreme';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { AuthenticationService } from '@pp-core/auth/authentication-service/authentication.service';
import { PpUser } from '@pp-core/auth/user';

@Component({
  selector: 'pp-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})

export class UserMenuComponent {
  @Input() user: PpUser;

  constructor(private authService: AuthenticationService) { }

  logout(): void {
    this.authService.logOut();
  }

  clearUserSession(): void {
    console.log("Clearing user session");
  }

  changePassword(): void {
    console.log("Changing password");
  }
}

@NgModule({
  imports: [
    PpDevextremeModule,
    PpAngularMaterialModule,
    CommonModule
  ],
  declarations: [ UserMenuComponent ],
  exports: [ UserMenuComponent ]
})
export class UserMenuModule { }