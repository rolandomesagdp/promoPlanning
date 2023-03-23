import { IFilter, PpFilterTypes } from "../filters";
import { IFilterSelectItem } from "./filter-select-item.model";


export class FilterSelectItemFactory {
	static createFilterSelectItemList(filtersArray: IFilter[], filterType: PpFilterTypes): IFilterSelectItem[] {
		let filterSelectItem: IFilterSelectItem[] = [];
		filtersArray.forEach(filter => {
			filterSelectItem.push({
				filterItemId: filter.id,
				filterItemName: filter.name,
				filterItemType: filterType,
				isSelected: false
			});
		});
		return filterSelectItem;
	}
}