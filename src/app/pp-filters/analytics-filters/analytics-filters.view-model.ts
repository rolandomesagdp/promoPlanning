import { DropDownTreeSelectModel } from "@app/pp-filters/drop-down-tree-select/tree-filters/drop-down-tree-select.model";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list/filter-select-item.model";
import { LogService } from "@pp-core/logging";
import { combineLatest, Observable } from "rxjs";
import { concatMap, map, scan, tap } from "rxjs/operators";
import { FiltersService } from "../filters";
import { AnalyticsFiltersEvents } from "./analytics-filters.events";

export class AnalyticsFiltersViewModel {
    private className: string = "ReportPageFiltersViewModel";

    events: AnalyticsFiltersEvents = new AnalyticsFiltersEvents();

    constructor(private filtersService: FiltersService, private logger: LogService) { }

    private campaignFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getCampaingSelectItems().pipe(
        tap(campaigns => this.logger.debug(this.className, "campaignFilters$ stream", "Retreived campaigns:", campaigns)));

    private promoTypeFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getPromoTypeSelectItems().pipe(
        tap(promoTypes => this.logger.debug(this.className, "promoTypeFilters$ stream", "Retreived promo types:", promoTypes)));

    private promoTypeSO99Filters$: Observable<IFilterSelectItem[]> = this.filtersService.getPromoTypeSO99SelectItems().pipe(
        tap(promoTypesSO99 => this.logger.debug(this.className, "promoTypeFilters$ stream", "Retreived SO99 promo types:", promoTypesSO99)));

    private promoStatusFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getPromoStatusSelectItems().pipe(
        tap(promoStatus => this.logger.debug(this.className, "promoStatusFilters$ stream", "Retreived promo status:", promoStatus)));

    private promoAttributes$: Observable<DropDownTreeSelectModel[]> = this.events.promoAttributeChangeEvent$.pipe(
        concatMap((selectedTreeNode: DropDownTreeSelectModel) => {
            return this.filtersService.getPromoAttributeFilterSelectItems(selectedTreeNode);
        }),
        scan((fullList: DropDownTreeSelectModel[], newValues: DropDownTreeSelectModel[]) => {
            return this.mergeAttributeLists(fullList, newValues);
        })
    )

    vm$ = combineLatest([
        this.campaignFilters$, this.promoTypeFilters$,
        this.promoTypeSO99Filters$, this.promoStatusFilters$,
        this.promoAttributes$]).pipe(
            map(([campaignFilters, promoTypeFilters, promoTypeSO99Filters, promoStatusFilters, promoAttributes]) => {
                return { campaignFilters, promoTypeFilters, promoTypeSO99Filters, promoStatusFilters, promoAttributes }
            }));

    private mergeAttributeLists(currentList: DropDownTreeSelectModel[], newValues: DropDownTreeSelectModel[]): DropDownTreeSelectModel[] {
        let mergedList = [...currentList ];
        newValues.forEach(newValue => {
            if(!currentList.find(x => x.id === newValue.id)) {
                mergedList = [...mergedList, newValue];
            }
        });
        return mergedList;
    }
}