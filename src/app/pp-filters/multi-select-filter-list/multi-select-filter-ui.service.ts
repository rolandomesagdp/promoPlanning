import { PpFilterTypes } from "../filters";
import { IFilterSelectItem } from "./filter-select-item.model";

export class MultiSelectFilterUIService {
    get selectAllOption(): IFilterSelectItem {
        return {
            filterItemId: "-1",
            filterItemName: "Select all",
            filterItemType: PpFilterTypes.campaigns,
            isSelected: false
        };
    }

    get clearAllOption(): IFilterSelectItem {
        return {
            filterItemId: "-2",
            filterItemName: "Clear all",
            filterItemType: PpFilterTypes.campaigns,
            isSelected: false
        };
    }
    
    constructor() { }

    getSelectionText(selectedFilters: IFilterSelectItem[]): string {
        let text: string = "";
        if (selectedFilters && selectedFilters.length > 0) {
            text = selectedFilters[0].filterItemName;
        }
        if (selectedFilters && selectedFilters.length > 1) {
            text = `${text} ${selectedFilters[1].filterItemName}`;
        }

        return text;
    }

    getSelectionEllipsis(selectedFilters: IFilterSelectItem[]): string {
        let ellipsis = "";
        if (selectedFilters && selectedFilters.length > 2) {
            ellipsis = `(+${selectedFilters.length - 2} ${selectedFilters.length === 3 ? 'other' : 'others'})`
        }
        return ellipsis;
    }

    getTooltip(selectedFilters: IFilterSelectItem[], defaultTooltip: string): string {
        let tooltipMessage: string = "";
        if(selectedFilters && selectedFilters.length > 0) {
          selectedFilters.forEach(value => {
            tooltipMessage = tooltipMessage ? `${tooltipMessage}, ${value.filterItemName}` : value.filterItemName;
          });
        }
        else {
          tooltipMessage = defaultTooltip;
        }
    
        return tooltipMessage;
      }
}