import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from './environment.service';
import { EnvironmentGuard } from './environment.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EnvironmentService,
    EnvironmentGuard
  ]
})
export class EnvironmentModule { }
