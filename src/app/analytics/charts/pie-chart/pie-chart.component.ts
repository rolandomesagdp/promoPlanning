import { Component, OnInit } from '@angular/core';
import { LogService } from '@pp-core/logging';
import { BaseChartComponent } from '../base-chart.class';

@Component({
  selector: 'pp-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent extends BaseChartComponent {

	constructor(public logger: LogService) {
		super(logger);
	}
  
	togglePointSelection(point: any): void {
		this.logger.debug('PpPieChartComponent', 'togglePointSelection', 'point--', point);
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