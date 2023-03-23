import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@pp-core/auth';
import { InputsDesignComponent } from './input-styles/inputs-design/inputs-design.component';
import { EnvironmentGuard } from '@pp-core/environment';

const routes: Routes = [
    { path: "inputs-design", component: InputsDesignComponent, canActivate: [AuthenticationGuard, EnvironmentGuard] }
  ]
  
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProofOfConceptRoutingModule { }