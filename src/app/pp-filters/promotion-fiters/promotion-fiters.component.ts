import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FiltersManager, FiltersService, IPpFilters } from '@app/pp-filters/filters';
import { PromotionFilterAuthors } from '@pp-core/local-storage';
import { LogService } from '@pp-core/logging';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';
import { DropDownTreeSelectModel } from '../drop-down-tree-select/tree-filters';
import { PromotionFiltersViewModel } from './promotion-filters.view-model';

@Component({
  selector: 'pp-promotion-fiters',
  templateUrl: './promotion-fiters.component.html',
  styleUrls: ['./promotion-fiters.component.scss']
})
export class PromotionFitersComponent implements OnDestroy {
  private className: string = "PromotionFitersComponent";
  @Input() filtersAuthor: PromotionFilterAuthors;
  @Output() applySelectedFilters: EventEmitter<IPpFilters> = new EventEmitter<IPpFilters>();
  viewModel: PromotionFiltersViewModel = new PromotionFiltersViewModel(this.filtersService, this.logger);

  constructor(public filtersManager: FiltersManager, public toggleDrawerService: ToggleDrawerService,
    private filtersService: FiltersService, private logger: LogService) { }

  displayClearButton(): boolean {
    if(this.filtersManager.filtersSelected)  {
      return true
    };
    return false;
  }

  clearFilters(): void {
    this.toggleDrawerService.toggleDrawer();
    this.filtersManager.clearFilters();
    this.filtersManager.clearDefaultFilters()
    this.logger.debug(this.className, "clearFilters()", "Applied filters:", [this.filtersManager.filters]);
    this.applyFilters();
  }

  onApplyButtonClick(): void {
    this.toggleDrawerService.toggleDrawer();
    this.filtersManager.setDefaultPageFilters();
    this.filtersManager.saveCurrentFiltersAsDefault(this.filtersAuthor); 
    this.logger.debug(this.className, "applyFilters()", "Applied filters:", [this.filtersManager.filters]);
    this.applyFilters();
  }

  productAttributeTreeLeafExpanded(productAttributeTreeLeaf: DropDownTreeSelectModel): void {
    this.viewModel.events.productCategoryTreeChanged(productAttributeTreeLeaf);
  }

  marketAttributeTreeLeafExpanded(marketAttributeTreeLeaf: DropDownTreeSelectModel): void {
    this.viewModel.events.marketCategoryTreeChanged(marketAttributeTreeLeaf);
  }

  ngOnDestroy(): void {
    this.filtersManager.cleanFiltersManager();
  }

  applyFilters(): void {
    this.applySelectedFilters.emit(this.filtersManager.filters);
  }
}
