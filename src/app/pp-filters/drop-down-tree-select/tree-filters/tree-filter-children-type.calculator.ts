import { DropDownTreeSelectModel, SelectItemType } from ".";

export class TreeFilterChildrenTypeCalculator {
    
    constructor(private filterModel: DropDownTreeSelectModel) { }

    getChildrenItemType(): SelectItemType {
		switch (this.filterModel.itemType) {
			case SelectItemType.PromoType:
				return SelectItemType.Owner;
			case SelectItemType.ProductFreeAttrName:
				return SelectItemType.ProductFreeAttrValue;
			case SelectItemType.MarketFreeAttrName:
				return SelectItemType.MarketFreeAttrValue;
			default:
				return this.filterModel.itemType;
		}
	}
}