import { Component } from '@angular/core';
import { LogService } from '@pp-core/logging';
import { BaseChartComponent } from '../base-chart.class';

@Component({
  selector: 'pp-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent extends BaseChartComponent {
  private className: string = "BarChartComponent";
	constructor(public logger: LogService) {
		super(logger);
	}

	togglePointSelection(point: any): void {
		this.logger.debug(this.className, 'togglePointSelection', 'point--', point);
		if (point.isSelected()) {
			point.clearSelection();
		}
		else {
			point.select();
		}
	}

	getPoint(e: any): any {
		return e.target;
	}

	customizeTooltip(pointInfo: any) {
		return { text :`${pointInfo.argumentText} : ${pointInfo.valueText}` };
	}
}
