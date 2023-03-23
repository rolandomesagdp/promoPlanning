import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SnackbarModule } from "@pp-core/snackbar";
import { PpAngularMaterialModule } from "@shared/pp-angular-material";
import { UnitOfMeasurementSelectorComponent } from "./unit-of-measurement-selector/unit-of-measurement-selector.component";
import { UnitsOfMeasurementService } from "./units-of-measurement.service";

@NgModule({
  imports: [ 
    CommonModule,
    SnackbarModule,
    PpAngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ UnitOfMeasurementSelectorComponent ],
  exports: [ UnitOfMeasurementSelectorComponent ],
  providers: [ UnitsOfMeasurementService ]
})
export class UnitsOfMeasurementModule { }