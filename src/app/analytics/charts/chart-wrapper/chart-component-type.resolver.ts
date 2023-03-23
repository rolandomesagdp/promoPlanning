import { Type } from '@angular/core';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { FunnelChartComponent } from '../funnel-chart/funnel-chart.component';
import { NotSupportedChartComponent } from '../not-supported-chart/not-supported-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ChartTypes } from './chart-types.enum';

export class ChartComponentTypeResolver {
	constructor(private componentType: string) { }

	resolveComponentType(): Type<any> {
		let componentTypeToReturn: Type<any>;
		switch (this.componentType) {
			case ChartTypes.bar:
			case ChartTypes.area:
			case ChartTypes.line:
			case ChartTypes.scatter: {
				componentTypeToReturn = BarChartComponent;
				break;
			}
			case ChartTypes.pie:
			case ChartTypes.doughnut: {
				componentTypeToReturn = PieChartComponent;
				break;
			}
			case ChartTypes.funnel:
			case ChartTypes.pyramid: {
				componentTypeToReturn = FunnelChartComponent;
				break;
			}
			default: {
				componentTypeToReturn = NotSupportedChartComponent;
				break;
			}
		}
		return componentTypeToReturn;
	}
}