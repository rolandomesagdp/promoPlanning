import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

@Component({
  selector: 'pp-uplift-chip',
  templateUrl: './uplift-chip.component.html',
  styleUrls: ['./uplift-chip.component.scss']
})
export class UpliftChipComponent {
  @Input() value: number;
  
  constructor() { }

  getUpliftPercent(): string {
    return this.value + '%';
  }

  getUpliftPercentTooltip(): string {
    return this.value >= 0 ? `Positive uplift: ${this.value}%` : `Negative uplift: ${this.value}%`;
  }

  getIconName(): string {
   return this.value >= 0 ? 'arrow_upward' : 'arrow_downward';
  }

  getColorCodingClass(): string {
		return this.value >= 0 ? 'positive-value-chip' : 'negative-value-chip';
	}
}

@NgModule({
  imports: [ CommonModule, PpAngularMaterialModule ],
  exports: [ UpliftChipComponent ],
  declarations: [ UpliftChipComponent ]
})
export class UpliftChipModule { }
