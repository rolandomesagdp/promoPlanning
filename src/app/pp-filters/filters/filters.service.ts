import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropDownTreeSelectModel, TreeFilter } from '../drop-down-tree-select/tree-filters';
import { IFilter, PpFilterTypes } from '.';
import { FilterSelectItemFactory } from '../multi-select-filter-list/filter-select-item-factory';
import { IFilterSelectItem } from '../multi-select-filter-list/filter-select-item.model';
import { EnvironmentService } from '@pp-core/environment';

@Injectable()
export class FiltersService {
	private analyticsControllerUrl: string;

	constructor(private httpClient: HttpClient, environmentService: EnvironmentService) {
		this.analyticsControllerUrl = `${environmentService.getEnvironment().serverUrl}analytics`;
	}

	getCampaingSelectItems(): Observable<IFilterSelectItem[]> {
		let url = `${this.analyticsControllerUrl}/filters/campaigns`;
		return this.httpClient.get<IFilter[]>(url).pipe(map((campaigns: IFilter[]) => {
			return FilterSelectItemFactory.createFilterSelectItemList(campaigns, PpFilterTypes.campaigns);
		}));
	}

	getPromoTypeSelectItems(): Observable<IFilterSelectItem[]> {
		let url = `${this.analyticsControllerUrl}/filters/promotypes`;
		return this.httpClient.get<IFilter[]>(url).pipe(map((campaigns: IFilter[]) => {
			return FilterSelectItemFactory.createFilterSelectItemList(campaigns, PpFilterTypes.campaigns);
		}));
	}

	getPromoTypeSO99SelectItems(): Observable<IFilterSelectItem[]> {
		const url = `${this.analyticsControllerUrl}/filters/promoTypeSO99`
		return this.httpClient.get<IFilter[]>(url).pipe(map((promoTypeSO99: IFilter[]) => {
			return FilterSelectItemFactory.createFilterSelectItemList(promoTypeSO99, PpFilterTypes.promoTypeSO99);
		}));
	}

	getPromoStatusSelectItems(): Observable<IFilterSelectItem[]> {
		const url = `${this.analyticsControllerUrl}/filters/promotionStatus`;
		return this.httpClient.get<IFilter[]>(url).pipe(map((promotionStatus: IFilter[]) => {
			return FilterSelectItemFactory.createFilterSelectItemList(promotionStatus, PpFilterTypes.promoStatus);
		}));
	}

	getPromoAttributeFilterSelectItems(promoAttribute: DropDownTreeSelectModel): Observable<DropDownTreeSelectModel[]> {
		const params = promoAttribute ? new TreeFilter(promoAttribute).httpParams : undefined;
		const url = `${this.analyticsControllerUrl}/filters/promoAttributes`;
		return this.httpClient.get<DropDownTreeSelectModel[]>(url, { params });
	}

	getProductCategoriesSelectItems(productAttribute: DropDownTreeSelectModel): Observable<DropDownTreeSelectModel[]> {
		const params = productAttribute ? new TreeFilter(productAttribute).toHttpParams() : undefined;
		const itemId = productAttribute && productAttribute.itemId ? productAttribute.itemId : '0';
		const url = `${this.analyticsControllerUrl}/filters/productCategory/itemId/${itemId}`;
		return this.httpClient.get<DropDownTreeSelectModel[]>(url, {params});
	}

	getMarketCategoriesSelectItems(productAttribute: DropDownTreeSelectModel): Observable<DropDownTreeSelectModel[]> {
		const params = productAttribute ? new TreeFilter(productAttribute).toHttpParams() : undefined;
		const itemId = productAttribute && productAttribute.itemId ? productAttribute.itemId : '0';
		const url = `${this.analyticsControllerUrl}/filters/marketCategory/itemId/${itemId}`;
		return this.httpClient.get<DropDownTreeSelectModel[]>(url, {params});
	}
}
