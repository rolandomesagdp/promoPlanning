import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { AnalyticsService } from '../analytics-services';
import { PpFilters, FiltersManager } from '../../pp-filters/filters';
import { ReportPageViewModel } from './report-page-view-model';
import { LogService } from '@pp-core/logging';

@Component({
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReportPageComponent implements OnInit, OnDestroy {
  private subscriptionsManager: SubscriptionsManager = new SubscriptionsManager();
  error: string;
  reportPagesListUrl: string = "analytics";
  viewModel: ReportPageViewModel = new ReportPageViewModel(this.analyticsService, this.filtersManager, this.logger);

  constructor(private route : ActivatedRoute, private analyticsService: AnalyticsService,
    private filtersManager: FiltersManager,  private logger: LogService) { }
  
  ngOnInit(): void {
    this.readIdParam();
    this.readQueryParams()
  }

  getChartContainerCssClass(isFullScreenChart: boolean): string {
    const chartContainerClass = isFullScreenChart ? 'full-width-chart-container' : 'half-width-chart-container';
		return chartContainerClass;
	}

  ngOnDestroy(): void {
    this.subscriptionsManager.unsubscribe();
  }

  private readIdParam(): void {
    const idParam = this.route.snapshot.params["id"];
    this.viewModel.reportPageChanged(idParam);
  }

  private readQueryParams(): void {
    this.subscriptionsManager.add(
    this.route.queryParams.subscribe((params: Params) => {
      const reportfilters = PpFilters.createFromParams(params);
      this.filtersManager.filters = reportfilters;
      this.filtersManager.applyFilters();
    }));
  }
}
