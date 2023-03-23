import { BehaviorSubject, Observable } from "rxjs";
import { DropDownTreeSelectModel, SelectItemType } from "../drop-down-tree-select/tree-filters";

export class PromotionFiltersEvents {
    
    private productCategoriesChangeSubject$: BehaviorSubject<DropDownTreeSelectModel> = new BehaviorSubject<DropDownTreeSelectModel>(this.getDefaultProductCategory());
	productCategoriesChangeEvent$: Observable<DropDownTreeSelectModel> = this.productCategoriesChangeSubject$.asObservable();

    private marketCategoriesChangeSubject$: BehaviorSubject<DropDownTreeSelectModel> = new BehaviorSubject<DropDownTreeSelectModel>(this.getDefaultMarketCategory());
	marketCategoriesChangeEvent$: Observable<DropDownTreeSelectModel> = this.marketCategoriesChangeSubject$.asObservable();
    
    constructor() { }

    productCategoryTreeChanged(selectedNode: DropDownTreeSelectModel): void {
        this.productCategoriesChangeSubject$.next(selectedNode);
    }

    marketCategoryTreeChanged(selectedNode: DropDownTreeSelectModel): void {
        this.marketCategoriesChangeSubject$.next(selectedNode);
    }

    private getDefaultProductCategory(): DropDownTreeSelectModel {
        return {
            id: null,
            name: null,
            itemId: null,
            parentId: null,
            hasItems: null,
            itemType: SelectItemType.ProductFreeAttrName
        }
    }

    private getDefaultMarketCategory(): DropDownTreeSelectModel {
        return {
            id: null,
            name: null,
            itemId: null,
            parentId: null,
            hasItems: null,
            itemType: SelectItemType.MarketFreeAttrName
        }
    }
}