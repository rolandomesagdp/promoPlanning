import { Component, NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

@Component({
  selector: 'pp-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  tooltipMessage: string = "Go back";

  constructor(private location: Location) { }

  navigateBack(): void {
    this.location.back();
  }
}
@NgModule({
  imports: [ 
    PpAngularMaterialModule
   ],
  exports: [ BackButtonComponent ],
  declarations: [ BackButtonComponent ]
})
export class BackButtonModule { }
