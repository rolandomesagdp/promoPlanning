import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { HomeRoutingModule } from './home-routing.module';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatInputModule,
    PpAngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
