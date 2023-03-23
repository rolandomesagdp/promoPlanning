import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { RouterModule } from '@angular/router';
import { DrawerCardComponent } from './drawer-card.component';
import { ToggleDrawerService } from './toggle-drawer-service';

@NgModule({
  declarations: [
    DrawerCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PpAngularMaterialModule
  ],
  exports: [ DrawerCardComponent ],
  providers: [ ToggleDrawerService ]
})
export class DrawerCardModule { }
