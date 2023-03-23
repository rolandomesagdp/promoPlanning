import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProofOfConceptRoutingModule } from './proof-of-concept-routing.module';
import { InputsDesignComponent } from './input-styles/inputs-design/inputs-design.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { PpDatePickerModule } from '@shared/components/date-picker';
import { OutlinedInputsComponent } from './input-styles/outlined-inputs/outlined-inputs.component';
import { FilledInputsComponent } from './input-styles/filled-inputs/filled-inputs.component';
import { PpPageModule } from '@shared/components/page';

@NgModule({
  declarations: [
    InputsDesignComponent,
    OutlinedInputsComponent,
    FilledInputsComponent
  ],
  imports: [
    CommonModule,
    ProofOfConceptRoutingModule,
    ReactiveFormsModule,
    PpPageModule,
    PpAngularMaterialModule,
    PpDatePickerModule
  ]
})
export class ProofOfConceptModule { }
