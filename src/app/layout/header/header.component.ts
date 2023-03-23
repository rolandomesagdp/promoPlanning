import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { PpUser } from '@pp-core/auth/user';
import { UserAccountService } from '@pp-core/auth/user/user-account-service/user-account.service';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { PpDevextremeModule } from '@shared/pp-devextreme';
import { Observable } from 'rxjs';
import { UserMenuModule } from '../user-menu';

@Component({
  selector: 'pp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<boolean>();
  user$: Observable<PpUser> = this.userAccountService.getUser();
  
  constructor(private userAccountService: UserAccountService) { }

  togggleMenu(): void {
    this.menuToggle.emit();
  }

}

@NgModule({
  imports: [
    CommonModule,
    UserMenuModule,
    PpAngularMaterialModule,
    PpDevextremeModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
