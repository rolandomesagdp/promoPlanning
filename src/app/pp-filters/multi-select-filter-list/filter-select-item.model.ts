import { PpFilterTypes } from "../filters";

export interface IFilterSelectItem {
	filterItemId: string;
	filterItemName: string;
	filterItemType: PpFilterTypes;
	isSelected: boolean;
}