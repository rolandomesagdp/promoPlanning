import {
	Component, OnInit, Input, ViewChild, Type,
	ComponentFactory, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
} from '@angular/core';
import { LogService } from '@pp-core/logging';
import { BaseChartComponent } from '../base-chart.class';
import { ChartHostDirective } from '../chart-host.directive';
import { IPPChart } from '../pp-chart.model';
import { ChartComponentTypeResolver } from './chart-component-type.resolver';

@Component({
  selector: 'pp-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.scss']
})
export class ChartWrapperComponent implements OnInit {
	@Input() chartDataSource: IPPChart;
	@ViewChild(ChartHostDirective, { static: true }) appChartHost: ChartHostDirective;
	private componentType: Type<any>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
				private logger: LogService) { }

	ngOnInit() {
		this.logger.debug('ChartWrapperComponent', 'ngOnInit()', 'Chart type to print', this.chartDataSource.chartType);
		let componentTypeResolver = new ChartComponentTypeResolver(this.chartDataSource.chartType);
		this.componentType = componentTypeResolver.resolveComponentType();
		this.loadComponent();
	}

	loadComponent() {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);

		const viewContainerRef = this.appChartHost.viewContainerRef;
		viewContainerRef.clear();

		this.createComponentReference(componentFactory, viewContainerRef);
	}

	private createComponentReference(componentFactory: ComponentFactory<any>, viewContainerRef: ViewContainerRef): void {
		const componentRef: ComponentRef<BaseChartComponent> = viewContainerRef.createComponent(componentFactory);
		componentRef.instance.chartDataSource = this.chartDataSource;
	}
}

