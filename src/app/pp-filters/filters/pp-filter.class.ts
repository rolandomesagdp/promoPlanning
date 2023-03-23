import { HttpParams } from "@angular/common/http";
import { Params } from "@angular/router";
import { IDateRangeFilter } from "@app/pp-filters/date-rage-filter";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { INumberRangeFilter } from "@app/pp-filters/number-range-filter";
import { ToHttpParam, ToParams } from "@shared/pp-http";
import { IPpFilters } from "./pp-filter.model";
import { ParamsToFiltersStrategy } from "./filter-mappings/params-to-filter.strategy";
import { FiltersToHttpParams } from "./filter-mappings/filters-to-http-params.strategy";
import { FiltersToParams } from "./filter-mappings/filters-to-params.strategy";
import { DropDownTreeSelectModel } from "../drop-down-tree-select/tree-filters";

export class PpFilters implements IPpFilters, ToHttpParam, ToParams {
	private toHttpParamStrategy: ToHttpParam;
	private toParamsStrategy: ToParams;
	pageSize: number;
	pageIndex: number;
	searchValue: string;
	datesRange: IDateRangeFilter;
	campaigns: IFilterSelectItem[];
	promoStatus: IFilterSelectItem[];
	promoTypes: IFilterSelectItem[];
	promoTypesSO99: IFilterSelectItem[];
	promoDuration: INumberRangeFilter;
	productAttribute: DropDownTreeSelectModel;
	marketAttribute: DropDownTreeSelectModel;
	promoAttribute: DropDownTreeSelectModel;

	get filtersSelected(): boolean {
		if (this.searchValue || (this.datesRange && (this.datesRange.start || this.datesRange.end)) ||
			this.promoDuration.start || this.promoDuration.end ||
			(this.campaigns && this.campaigns.length > 0) ||
			(this.promoStatus && this.promoStatus.length > 0) ||
			(this.promoTypes && this.promoTypes.length > 0) ||
			(this.promoTypesSO99 && this.promoTypesSO99.length > 0) ||
			(this.promoAttribute && this.promoAttribute.id) ||
			(this.marketAttribute && this.marketAttribute.name) ||
			(this.productAttribute && this.productAttribute.name)) {
			return true;
		}
		return false;
	}

	get pageFiltersSelected(): boolean {
		if(this.pageSize && this.pageIndex != null) return true;
		return false;
	}

	private constructor(reportFilters: IPpFilters, toHttpParamStrategy: ToHttpParam, toParamsStrategy: ToParams) {
		this.pageSize = reportFilters.pageSize;
		this.pageIndex = reportFilters.pageIndex;
		this.searchValue = reportFilters.searchValue;
		this.datesRange = reportFilters.datesRange;
		this.campaigns = reportFilters.campaigns;
		this.promoStatus = reportFilters.promoStatus;
		this.promoTypes = reportFilters.promoTypes;
		this.promoTypesSO99 = reportFilters.promoTypesSO99;
		this.promoDuration = reportFilters.promoDuration;
		this.promoAttribute = reportFilters.promoAttribute;
		this.productAttribute = reportFilters.productAttribute;
		this.marketAttribute = reportFilters.marketAttribute;
		this.toHttpParamStrategy = toHttpParamStrategy;
		this.toParamsStrategy = toParamsStrategy;
	}

	toParams(): Params {
		return this.toParamsStrategy.toParams();
	}

	toHttpParams(): HttpParams {
		return this.toHttpParamStrategy.toHttpParams();
	}

	static createEmptyModel(): IPpFilters {
		return {
			pageSize: null, pageIndex: null, searchValue: "", datesRange: { start: null, end: null },
			campaigns: null, promoTypes: null, promoTypesSO99: null, promoStatus: null, productAttribute: null,
			marketAttribute: null, promoDuration: { start: null, end: null }, promoAttribute: null
		};
	}

	static createFromParams(params: Params): PpFilters {
		return PpFilters.create(new ParamsToFiltersStrategy(params).setReportFilters().filters);
	}

	static create(reportFilterModel: IPpFilters): PpFilters {
		let filters: IPpFilters = {
			pageSize: reportFilterModel.pageSize,
			pageIndex: reportFilterModel.pageIndex,
			searchValue: reportFilterModel.searchValue,
			campaigns: this.getFilterSelectItemList(reportFilterModel.campaigns),
			promoTypes: this.getFilterSelectItemList(reportFilterModel.promoTypes),
			promoTypesSO99: this.getFilterSelectItemList(reportFilterModel.promoTypesSO99),
			promoStatus: this.getFilterSelectItemList(reportFilterModel.promoStatus),
			datesRange: this.getDatesRangeFilter(reportFilterModel.datesRange),
			promoDuration: this.getPromoDurationFilter(reportFilterModel.promoDuration),
			promoAttribute: reportFilterModel.promoAttribute ? { ...reportFilterModel.promoAttribute } : null,
			productAttribute: reportFilterModel.productAttribute ? reportFilterModel.productAttribute : null,
			marketAttribute: reportFilterModel.marketAttribute ? reportFilterModel.marketAttribute : null
		};

		return new PpFilters(
			filters,
			new FiltersToHttpParams(filters),
			new FiltersToParams(filters)
		);
	}

	private static getFilterSelectItemList(itemsList: IFilterSelectItem[]): IFilterSelectItem[] | null {
		if (itemsList && itemsList.length > 0) {
			return [...itemsList];
		}
		else {
			return null;
		}
	}

	private static getDatesRangeFilter(datesRange: IDateRangeFilter): IDateRangeFilter | null {
		if (datesRange) {
			return { ...datesRange };
		}
		else {
			return null;
		}
	}

	private static getPromoDurationFilter(promoDurationRange: INumberRangeFilter): INumberRangeFilter | null {
		if (promoDurationRange) {
			return { ...promoDurationRange };
		}
		else {
			return null;
		}
	}
}