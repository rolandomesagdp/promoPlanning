import { HttpParams } from "@angular/common/http";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { ToHttpParam } from "@shared/pp-http";
import { IPpFilters, PpFilterTypes } from "..";

export class FiltersToHttpParams implements ToHttpParam {
    private filtersAsHttpParams: HttpParams;

    constructor(private filters: IPpFilters) { }
    
    toHttpParams(): HttpParams {
        this.filtersAsHttpParams = new HttpParams();
        this.setAllParams();
        return this.filtersAsHttpParams
    }

    private setAllParams(): void {
		this.setPageParams();
		this.setSearchValueParam();
		this.setDatesParam();
		this.setFilterSelectItemParams(this.filters.campaigns, PpFilterTypes.campaigns);
		this.setFilterSelectItemParams(this.filters.promoStatus, PpFilterTypes.promoStatus);
		this.setFilterSelectItemParams(this.filters.promoTypes, PpFilterTypes.promoType);
		this.setFilterSelectItemParams(this.filters.promoTypesSO99, PpFilterTypes.promoTypeSO99);
		this.setPromoDurationParams();
		this.setPromoAttributeParam();
		this.setProductAttributeParam();
		this.setMarketAttributeParam();
	}

	private setPageParams(): void {
		if(this.filters.pageSize) {
			this.filtersAsHttpParams = this.filtersAsHttpParams.set(PpFilterTypes.pageSize, this.filters.pageSize);
		}
		if(this.filters.pageIndex != null) {
			this.filtersAsHttpParams = this.filtersAsHttpParams.set(PpFilterTypes.pageIndex, this.filters.pageIndex + 1);
		}
	}

	private setSearchValueParam(): void {
		if(this.filters.searchValue) {
			this.filtersAsHttpParams = this.filtersAsHttpParams.set(PpFilterTypes.searchValue, this.filters.searchValue);
		}
	}

	private setProductAttributeParam(): void {
		if(this.filters.productAttribute) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
			.set(`${PpFilterTypes.productAttribute}.attrId`, this.filters.productAttribute.parentId);
			this.filtersAsHttpParams = this.filtersAsHttpParams
			.set(`${PpFilterTypes.productAttribute}.value`, this.filters.productAttribute.name);
		}
	}

	private setMarketAttributeParam(): void {
		if(this.filters.marketAttribute) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
			.set(`${PpFilterTypes.marketAttribute}.attrId`, this.filters.marketAttribute.parentId);
			this.filtersAsHttpParams = this.filtersAsHttpParams
			.set(`${PpFilterTypes.marketAttribute}.value`, this.filters.marketAttribute.name);
		}
	}

	private setPromoAttributeParam(): void {
		if(this.filters.promoAttribute) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
			.set(`${PpFilterTypes.promoAttribute}.attrId`, this.filters.promoAttribute.parentId);
			this.filtersAsHttpParams = this.filtersAsHttpParams
			.set(`${PpFilterTypes.promoAttribute}.value`, this.filters.promoAttribute.name);
		}
	}

	private setDatesParam(): void {
		if (this.filters.datesRange && this.filters.datesRange.start && this.filters.datesRange.end) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.startDate, new Date(this.filters.datesRange.start).toUTCString())
				.set(PpFilterTypes.endDate, new Date(this.filters.datesRange.end).toUTCString());
		}
	}

	private setFilterSelectItemParams(filtersList: IFilterSelectItem[], filterType: PpFilterTypes): void {
		if (filtersList && filtersList.length > 0) {
			let filtersCommaSeparated = "";
			filtersList.forEach(filterItem => {
				if (filtersCommaSeparated === "") {
					filtersCommaSeparated = filterItem.filterItemId.toString();
				}
				else {
					filtersCommaSeparated += `,${filterItem.filterItemId.toString()}`
				}
			});
			this.filtersAsHttpParams = this.filtersAsHttpParams.set(filterType, filtersCommaSeparated);
		}
	}

	private setPromoDurationParams(): void {
		if (this.filters.promoDuration && this.filters.promoDuration.start && this.filters.promoDuration.end) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.promoDurationStart, this.filters.promoDuration.start.toString());

			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.promoDurationEnd, this.filters.promoDuration.end.toString());
		}
	}
}