import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';
import { AnalyticsFiltersViewModel } from './analytics-filters.view-model';
import { Params, Router } from '@angular/router';
import { FiltersManager, FiltersService, PpFilters } from '@app/pp-filters/filters';
import { LogService } from '@pp-core/logging';

@Component({
  selector: 'pp-analytics-filters',
  templateUrl: './analytics-filters.component.html',
  styleUrls: ['./analytics-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsFiltersComponent implements OnDestroy {
  viewModel: AnalyticsFiltersViewModel = new AnalyticsFiltersViewModel(this.filtersService, this.logger);

  constructor(public filtersManager: FiltersManager,
    private toggleDrawerService: ToggleDrawerService,
    private router: Router,
    private filtersService: FiltersService,
    private logger: LogService) { }

  onApply(): void {
    this.toggleDrawerService.toggleDrawer();
    const queryParams: Params = PpFilters.create(this.filtersManager.filters).toParams();
    this.router.navigate([`analytics/report-page/${1}`],
      { queryParams: queryParams });
  }

  ngOnDestroy(): void {
    this.filtersManager.cleanFiltersManager();
  }
}
