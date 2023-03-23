import { IDateRangeFilter } from "@app/pp-filters/date-rage-filter";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { INumberRangeFilter } from "@app/pp-filters/number-range-filter";
import { DropDownTreeSelectModel } from "../drop-down-tree-select/tree-filters";

export interface IPpFilters {
	pageSize: number;
	pageIndex: number;
	searchValue: string;
	datesRange: IDateRangeFilter;
	promoDuration: INumberRangeFilter;
	campaigns: IFilterSelectItem[];
	promoStatus: IFilterSelectItem[];
	promoTypes: IFilterSelectItem[];
	promoTypesSO99: IFilterSelectItem[];
	productAttribute: DropDownTreeSelectModel;
	marketAttribute: DropDownTreeSelectModel;
	promoAttribute: DropDownTreeSelectModel;
}