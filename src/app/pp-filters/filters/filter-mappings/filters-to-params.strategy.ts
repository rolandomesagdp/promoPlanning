import { Params } from "@angular/router";
import { DropDownTreeSelectModel } from "@app/pp-filters/drop-down-tree-select/tree-filters";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { ToParams } from "@shared/pp-http/to-params";
import { IPpFilters, PpFilterTypes } from "..";
import { IFilter } from "../filter.model";

export class FiltersToParams implements ToParams {
    private filtersAsParams: Params;

    constructor(private filters: IPpFilters) { }

    toParams(): Params {
        this.setPageParams();
        this.setFreeAttributeParam(this.filters.promoAttribute, PpFilterTypes.promoAttribute);
        this.setFreeAttributeParam(this.filters.productAttribute, PpFilterTypes.productAttribute);
        this.setFreeAttributeParam(this.filters.marketAttribute, PpFilterTypes.marketAttribute);
        this.setPromoDurationParams();
        this.setPromoDates();
        this.setSelectListItemFilter(this.filters.campaigns, PpFilterTypes.campaigns);
        this.setSelectListItemFilter(this.filters.promoStatus, PpFilterTypes.promoStatus);
        this.setSelectListItemFilter(this.filters.promoTypes, PpFilterTypes.promoType);
        this.setSelectListItemFilter(this.filters.promoTypesSO99, PpFilterTypes.promoTypeSO99);
        this.setFilter(this.filters.promoAttribute, PpFilterTypes.promoAttribute);
        this.setSearchValue();

        return this.filtersAsParams;
    }

    private setPageParams(): void {
        if(this.filters.pageIndex !== null) {
            const pageIndexParam = { [PpFilterTypes.pageIndex]: this.filters.pageIndex };
            this.filtersAsParams = {...this.filtersAsParams, ...pageIndexParam }
        }
        if(this.filters.pageSize) {
            const pageSizeParam = { [PpFilterTypes.pageSize]: this.filters.pageSize }
            this.filtersAsParams = { ...this.filtersAsParams, ...pageSizeParam };
        }
    }

    private setSearchValue(): void {
        if(this.filters.searchValue) {
            const searchValueParam = { [PpFilterTypes.searchValue]: this.filters.searchValue };
            this.filtersAsParams = { ...this.filtersAsParams, ...searchValueParam };
        }
    }

    private setFreeAttributeParam(productAttributeFilter: DropDownTreeSelectModel, freeAttributeType: PpFilterTypes): void {
        if(productAttributeFilter) {
            const productAttributeIdParam = { [`${freeAttributeType.toString()}.attrId`]: productAttributeFilter.parentId };
            const productAttributeValueParam = { [`${freeAttributeType.toString()}.value`]: productAttributeFilter.name };

            this.filtersAsParams = { ...this.filtersAsParams, ...productAttributeIdParam };
            this.filtersAsParams = { ...this.filtersAsParams, ...productAttributeValueParam };
        }
    }

    private setFilter(filter: IFilter, filterName: string): void {
        if(filter) {
            const filterParam = { [filterName]: filter.id };
            this.filtersAsParams = { ...this.filtersAsParams, ...filterParam };
        }
    }

    private setSelectListItemFilter(selectListItems: IFilterSelectItem[], filterName: string): void {
        if (selectListItems && selectListItems.length > 0) {
            let commaSeparatedIds = "";
            selectListItems.forEach(item => {
                commaSeparatedIds = commaSeparatedIds ? `${commaSeparatedIds},${item.filterItemId}` : `${item.filterItemId}`;
            });
            const filterAsParam = { [filterName]: commaSeparatedIds }
            this.filtersAsParams = { ...this.filtersAsParams, ...filterAsParam };
        }
    }

    private setPromoDates(): void {
        if (this.filters.datesRange) {
            this.filters.datesRange.start && this.setStartDate();
            this.filters.datesRange.end && this.setEndDate()
        }
    }

    private setStartDate(): void {
        const promoStart = {
            [PpFilterTypes.startDate]: new Date(this.filters.datesRange.start).toUTCString()
        };
        this.filtersAsParams = { ...this.filtersAsParams, ...promoStart };
    }

    private setEndDate(): void {
        const promoEnd = {
            [PpFilterTypes.endDate]: new Date(this.filters.datesRange.end).toUTCString()
        };
        this.filtersAsParams = { ...this.filtersAsParams, ...promoEnd };
    }

    private setPromoDurationParams(): void {
        if (this.filters.promoDuration) {
            this.filters.promoDuration.start && this.setPromoDurationStart();
            this.filters.promoDuration.end && this.setPromoDurationEnd();
        }
    }

    private setPromoDurationStart(): void {
        const promoDurationStart = {
            [PpFilterTypes.promoDurationStart.toString()]: this.filters.promoDuration.start
        };
        this.filtersAsParams = { ...this.filtersAsParams, ...promoDurationStart };
    }

    private setPromoDurationEnd(): void {
        const promoDurationEnd = {
            [PpFilterTypes.promoDurationEnd.toString()]: this.filters.promoDuration.end
        };
        this.filtersAsParams = { ...this.filtersAsParams, ...promoDurationEnd };
    }
}