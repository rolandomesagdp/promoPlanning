import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogFilesListComponent } from './log-files-list/log-files-list.component';
import { LogsRoutingModule } from '.';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { LogFilesService } from './log-files-list/log-file.service';
import { ErrorMessageModule } from '@shared/components/error-message';
import { PromoPlanningSpinnerModule } from '@shared/components/spinner';
import { PpPageModule } from '@shared/components/page';

@NgModule({
  declarations: [
    LogFilesListComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    PpAngularMaterialModule,
    ErrorMessageModule,
    PromoPlanningSpinnerModule,
    PpPageModule
  ],
  providers: [ LogFilesService ]
})
export class LogsModule { }
