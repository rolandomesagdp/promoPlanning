import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

@Component({
  selector: 'pp-duration-chip',
  templateUrl: './duration-chip.component.html',
  styleUrls: ['./duration-chip.component.scss']
})
export class DurationChipComponent {
  @Input() duration: string;
}

@NgModule({
  imports: [ CommonModule, PpAngularMaterialModule ],
  exports: [ DurationChipComponent ],
  declarations: [ DurationChipComponent ]
})
export class DurationChipModule { }
