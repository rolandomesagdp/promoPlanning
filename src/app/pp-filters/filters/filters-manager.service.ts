import { Injectable } from '@angular/core';
import { LocalStorageItems, LocalStorageService, PromotionFilterAuthors } from '@pp-core/local-storage';
import { LogService } from '@pp-core/logging';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, IPpFilters, PpFilters } from '.';
import { INumberRangeFilter } from '../number-range-filter';

@Injectable({
  providedIn: "root"
})
export class FiltersManager {
  private className: string = "FiltersManager";

  filters: IPpFilters = PpFilters.createEmptyModel();

  get filtersSelected(): boolean {
    return PpFilters.create(this.filters).filtersSelected;
  }

  get pageFiltersSelected(): boolean {
    return PpFilters.create(this.filters).pageFiltersSelected;
  }

  private applyFiltersSubject$: BehaviorSubject<IPpFilters> = new BehaviorSubject<IPpFilters>(null);
  applyFiltersEvent$: Observable<IPpFilters> = this.applyFiltersSubject$.asObservable();

  private filtersClearedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  filtersClearedEvent$: Observable<boolean> = this.filtersClearedSubject$.asObservable();

  constructor(private logger: LogService, private localStorage: LocalStorageService) { }

  applyFilters(): void {
    this.logger.debug(this.className, "applyFilters()", "Following filters will be applied", this.filters);
    this.applyFiltersSubject$.next(this.filters);
  }

  clearAllFiltersAndApply(): void {
    this.filters = PpFilters.createEmptyModel();
    this.applyFilters();
  }

  cleanFiltersManager(): void {
    this.filters = PpFilters.createEmptyModel();
    this.applyFiltersSubject$ = new BehaviorSubject<IPpFilters>(null);
    this.applyFiltersEvent$ = this.applyFiltersSubject$.asObservable();
    this.filtersClearedSubject$ = new BehaviorSubject<boolean>(null);
    this.filtersClearedEvent$ = this.filtersClearedSubject$.asObservable();
  }

  getDefaultPromoDurationFilter(): INumberRangeFilter {
    return this.filters.promoDuration ? this.filters.promoDuration : { start: 20, end: 60 };
  }

  setDefaultPageFilters(): void {
    this.filters.pageIndex = DEFAULT_PAGE_INDEX;
    this.filters.pageSize = DEFAULT_PAGE_SIZE;
  }

  setDefaultFilters(filtersAuthor: PromotionFilterAuthors): void {
    this.filters = PpFilters.createEmptyModel();
    this.setDefaultPageFilters();

    const defaultFilters: IPpFilters = this.localStorage.getPromotionFilters();

    if (this.defaultFiltersAreApplicable(defaultFilters, filtersAuthor)) {
      this.localStorage.addPromotionFiltersAuthor(filtersAuthor);
      this.filters = { ...defaultFilters };
    }
  }

  setDefaultCampaignFilters() {
    this.filters = PpFilters.createEmptyModel();
    this.setDefaultPageFilters();
  }

  saveCurrentFiltersAsDefault(filtersAuthor: PromotionFilterAuthors): void {
    this.localStorage.addPromotionFilters(this.filters);
    this.localStorage.addPromotionFiltersAuthor(filtersAuthor);
  }

  clearFilters(): void {
    this.filters = PpFilters.createEmptyModel();
    this.filters.pageSize = DEFAULT_PAGE_SIZE;
    this.filters.pageIndex = DEFAULT_PAGE_INDEX;
    this.filtersClearedSubject$.next(true);
  }

  clearDefaultFilters(): void {
    this.localStorage.clear(LocalStorageItems.promotionFilters);
  }

  defaultFiltersAreApplicable(defaultFilters: IPpFilters, filtersAuthor: PromotionFilterAuthors): boolean {
    const defaultFiltersAuthor: PromotionFilterAuthors = this.localStorage.getPromotionFiltersAuthor();
    if (defaultFilters && PpFilters.create(defaultFilters).filtersSelected && filtersAuthor !== defaultFiltersAuthor) {
      return true;
    }
    return false;
  }

  currentFiltersAreApplicable(currentFilters: IPpFilters): boolean {
    if ((currentFilters && PpFilters.create(currentFilters).filtersSelected)) {
      return true
    }
    return false;
  }
}
