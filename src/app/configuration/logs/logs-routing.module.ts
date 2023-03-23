import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth/authentication-guard/authentication.guard';
import { LogFilesListComponent } from './log-files-list/log-files-list.component';

const routes: Routes = [
  { path: '', component: LogFilesListComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }