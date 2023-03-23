import { IFilter } from "../../filters";
import { SelectItemType } from "./select-item-type.enum";

export interface DropDownTreeSelectModel extends IFilter {
    itemId: string;
    parentId: string;
    hasItems: boolean;
    itemType: SelectItemType;
}