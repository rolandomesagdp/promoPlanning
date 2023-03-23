import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './snackbar.service';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

@NgModule({
  imports: [ CommonModule, PpAngularMaterialModule ],
  providers: [ SnackbarService ]
})
export class SnackbarModule { }
