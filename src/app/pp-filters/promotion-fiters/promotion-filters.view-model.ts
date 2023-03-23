import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { LogService } from "@pp-core/logging";
import { combineLatest, Observable, of } from "rxjs";
import { catchError, concatMap, map, scan, tap } from "rxjs/operators";
import { DropDownTreeSelectModel } from "../drop-down-tree-select/tree-filters";
import { FiltersService } from "../filters";
import { PromotionFiltersEvents } from "./promotion-filters.events";

export class PromotionFiltersViewModel {
    private className: string = "PromotionFiltersViewModel";

    events: PromotionFiltersEvents = new PromotionFiltersEvents();

    private updateTreeValue = (updateHistory: DropDownTreeSelectModel[], currentUpdate: DropDownTreeSelectModel[]) => {
		const latestValue: DropDownTreeSelectModel[] = [];
		latestValue.push(...updateHistory);
		currentUpdate.map(cu => {
			if (!latestValue.find(val => val.id == cu.id)) { latestValue.push(cu) }
		});
		return latestValue;
	}

    private campaignFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getCampaingSelectItems().pipe(
        tap(campaigns => this.logger.debug(this.className, "campaignFilters$ stream", "Retreived campaigns:", campaigns)),
        catchError(error => {
            return this.handleError(error, "campaignFilters$");
        }));

    private promoTypeFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getPromoTypeSelectItems().pipe(
        tap(promoTypes => this.logger.debug(this.className, "promoTypeFilters$ stream", "Retreived promo types:", promoTypes)),
        catchError(error => {
            return this.handleError(error, "promoTypeFilters$");
        }));

    private promoStatusFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getPromoStatusSelectItems().pipe(
        tap(promoStatus => this.logger.debug(this.className, "promoStatusFilters$ stream", "Retreived promo status:", promoStatus)),
        catchError(error => {
            return this.handleError(error, "promoStatusFilters$");
        }));

    private productCategoryFilters$: Observable<DropDownTreeSelectModel[]> = this.events.productCategoriesChangeEvent$.pipe(
        concatMap((item: DropDownTreeSelectModel) => {
            return this.filtersService.getProductCategoriesSelectItems(item);
        }),
        catchError(error => {
            return this.handleError(error, "productCategoryFilters$");
        }),
        scan(this.updateTreeValue));

    private marketCategoryFilters$: Observable<DropDownTreeSelectModel[]> = this.events.marketCategoriesChangeEvent$.pipe(
        concatMap((item: DropDownTreeSelectModel) => {
            return this.filtersService.getMarketCategoriesSelectItems(item);
        }),
        catchError(error => {
            return this.handleError(error, "productCategoryFilters$");
        }),
        scan(this.updateTreeValue));

    vm$ = combineLatest([
        this.campaignFilters$, 
        this.promoTypeFilters$, 
        this.promoStatusFilters$,
        this.productCategoryFilters$,
        this.marketCategoryFilters$]).pipe(
            map(([campaignFilters, promoTypeFilters, promoStatusFilters, productCategoryFilters, marketCategoryFilters]) => {
                return { 
                    campaignFilters, 
                    promoTypeFilters, 
                    promoStatusFilters, 
                    productCategoryFilters,
                    marketCategoryFilters
                }
            }));

    constructor(private filtersService: FiltersService, private logger: LogService) { }

    private handleError(error: any, stream: string): Observable<any[]> {
        this.logger.debug(this.className, `${stream} stream`, `Error loading ${stream} stream`, [error]);
        return of([]);
    }
}