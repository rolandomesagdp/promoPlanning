import { DropDownTreeSelectModel, SelectItemType } from "@app/pp-filters/drop-down-tree-select/tree-filters";
import { BehaviorSubject, Observable } from "rxjs";

export class AnalyticsFiltersEvents {
    private promoAttributeChangeSubject$: BehaviorSubject<DropDownTreeSelectModel> = new BehaviorSubject<DropDownTreeSelectModel>(this.getDefaultPromoAttribute());
	promoAttributeChangeEvent$: Observable<DropDownTreeSelectModel> = this.promoAttributeChangeSubject$.asObservable();
    
    constructor() { }

    promoAttributeTreeChanged(selectedNode: DropDownTreeSelectModel): void {
        this.promoAttributeChangeSubject$.next(selectedNode);
    }

    private getDefaultPromoAttribute(): DropDownTreeSelectModel {
        return {
            id: null,
            name: null,
            itemId: null,
            parentId: null,
            hasItems: null,
            itemType: SelectItemType.PromoType
        }
    }
}