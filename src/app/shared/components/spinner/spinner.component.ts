import { Component, Input, NgModule } from '@angular/core';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

@Component({
  selector: 'pp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() diameter: number = 90;
  constructor() { }
}

@NgModule({
  imports: [ 
    PpAngularMaterialModule
   ],
  exports: [ SpinnerComponent ],
  declarations: [ SpinnerComponent ]
})
export class PromoPlanningSpinnerModule { }
