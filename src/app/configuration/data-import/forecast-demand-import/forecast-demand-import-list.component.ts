import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackbarService } from '@pp-core/snackbar';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { PromotionImportService } from '../promotion-import';
import { LogService } from '@pp-core/logging';

@Component({
  selector: 'pp-forecast-demand-import-list',
  templateUrl: './forecast-demand-import-list.component.html',
  styleUrls: ['./forecast-demand-import-list.component.scss']
})
export class ForecastDemandImportListComponent implements OnInit, OnDestroy {

  forecastDemandValues: string[];

  displayedColumns: string[] = ['name', 'action'];
  title: string = 'Forecast and Demand';
  errorMessage: string;
  subscriptionManager: SubscriptionsManager;
  loading: boolean = false;

  constructor(public importService: PromotionImportService,
              private snackbarService: SnackbarService,
              private logService: LogService) { }

  ngOnInit() {
    this.subscriptionManager = new SubscriptionsManager();
    this.getTableValues();
  }

  getTableValues(): void {
    this.loading = true;
    this.subscriptionManager.add(
      this.importService.getImportForecastDemandValues().subscribe(importedNames => {
        this.forecastDemandValues = importedNames.filter(i => i !== 'All');
        this.loading = false;
      }, err => {
        this.loading = false;
        this.errorMessage = `Error in loading page --> Details --> ${err.message}`;
        this.logService.error('ForecastDemandImportListComponent', 'getTableValues', 'getting forecast demand values error', err);
      }));
  }

  import(importTypeName: string): void {
    this.loading = true;
    this.subscriptionManager.add(
      this.importService.importForecastDemand(importTypeName).subscribe(imported => {
        this.loading = false;
        this.snackbarService.openSuccess('Imported successfully!');
      }, err => {
        this.loading = false;
        this.snackbarService.openError('Error in import!');
        this.logService.error('ForecastDemandImportListComponent', 'import', 'error in import', err);
      }));
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }
}
