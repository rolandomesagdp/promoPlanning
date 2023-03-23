import { Params } from "@angular/router";
import { SelectItemType } from "@app/pp-filters/drop-down-tree-select/tree-filters";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { IPpFilters, PpFilters, PpFilterTypes } from "..";

export class ParamsToFiltersStrategy {
    filters: IPpFilters = PpFilters.createEmptyModel();

    constructor(public params: Params) { }

    setReportFilters(): ParamsToFiltersStrategy {
        this.setPageParams();
        this.setSearchValue();
        this.setPromoDuration();
        this.setDatesRange();
        this.setSelectItemArrayFilter(PpFilterTypes.campaigns);
        this.setSelectItemArrayFilter(PpFilterTypes.promoStatus);
        this.setSelectItemArrayFilter(PpFilterTypes.promoType);
        this.setSelectItemArrayFilter(PpFilterTypes.promoTypeSO99);
        this.setFilters(PpFilterTypes.promoAttribute);
        this.setFreeAttribute(PpFilterTypes.marketAttribute);
        this.setFreeAttribute(PpFilterTypes.productAttribute);
        this.setFreeAttribute(PpFilterTypes.promoAttribute);
        return this;
    }

    private setSearchValue(): void {
        if(this.params[PpFilterTypes.searchValue]) {
            this.filters.searchValue = this.params[PpFilterTypes.searchValue];
        }
    }

    private setPageParams(): void {
        if(this.params[PpFilterTypes.pageSize]) {
            this.filters.pageSize = +this.params[PpFilterTypes.pageSize];
        }
        if(this.params[PpFilterTypes.pageIndex]) {
            this.filters.pageIndex = +this.params[PpFilterTypes.pageIndex];
        }
    }

    private setFreeAttribute(freeAttributeType: PpFilterTypes): void {
        const filterProperyName = freeAttributeType === PpFilterTypes.productAttribute ? "productAttribute" : "marketAttribute";
        if(this.params[`${freeAttributeType}.attrId`] && this.params[`${freeAttributeType}.value`]) {
            this.filters[filterProperyName] = {
                id: "",
                itemId: "",
                hasItems: false,
                itemType: this.mapFilterTypeToSelectItemType(freeAttributeType),
                parentId: this.params[`${freeAttributeType}.attrId`],
                name: this.params[`${freeAttributeType}.value`]
            }
        }
    }

    private mapFilterTypeToSelectItemType(filterType: PpFilterTypes): SelectItemType {
        switch(filterType) {
            default: case PpFilterTypes.productAttribute:
                return SelectItemType.ProductFreeAttrValue;
            case PpFilterTypes.marketAttribute:
                return SelectItemType.MarketFreeAttrValue;
            case PpFilterTypes.productAttribute:
                return SelectItemType.PromoAttr
        }
    }

    private setFilters(filterName: PpFilterTypes): void {
        if(this.params[filterName]) {
            this.filters[filterName] = { id: this.params[filterName], name: ""};
        }
    }

    private setSelectItemArrayFilter(reportFilterType: PpFilterTypes): void {
        if(this.params[reportFilterType]) {
            const commaSeparatedIds: string = this.params[reportFilterType];
            const idsArray: string[] = commaSeparatedIds.split(",");
            this.filters[reportFilterType] = this.getFilterSelectItemArray(idsArray, reportFilterType);
        }
    }

    private getFilterSelectItemArray(ids: string[], reportFilterType: PpFilterTypes): IFilterSelectItem[] {
        let filterSelectItems: IFilterSelectItem[] = [];
        ids.forEach(id => {
            filterSelectItems = [...filterSelectItems, {
                filterItemId: id,
                filterItemType: reportFilterType,
                filterItemName: "",
                isSelected: true
            }]
        });
        return filterSelectItems.length > 0 ? filterSelectItems : null;
    }

    private setDatesRange(): void {
        if(this.params[PpFilterTypes.startDate] || this.params[PpFilterTypes.endDate]) {
            this.filters.datesRange = {
                start: this.params[PpFilterTypes.startDate] ? new Date(this.params[PpFilterTypes.startDate]) : null,
                end: this.params[PpFilterTypes.endDate] ? new Date(this.params[PpFilterTypes.endDate]) : null
            }
        }
    }

    private setPromoDuration(): void {
        if(this.params[PpFilterTypes.promoDurationStart] && this.params[PpFilterTypes.promoDurationEnd]) {
            this.filters.promoDuration = {
                start: +this.params[PpFilterTypes.promoDurationStart],
                end: +this.params[PpFilterTypes.promoDurationEnd]
            };
        }
    }
}