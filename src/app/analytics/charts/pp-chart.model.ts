import { IPPChartSeriesPoint } from ".";

export interface IPPChart {
	id: number;
	chartType: string;
	chartTitle: string;
	chartSubTitle: string;
	chartSeries: IPPChartSeriesPoint[];
	errorLoading: string;
	printFullScreen: boolean;
}