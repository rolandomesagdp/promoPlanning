import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'data-import', loadChildren: () => import('./data-import/data-import.module').then(m => m.DataImportModule)
  },
  { path: 'log-files', loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ConfigurationRoutingModule { }