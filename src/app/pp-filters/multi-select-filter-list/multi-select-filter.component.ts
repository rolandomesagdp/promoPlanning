import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IFilterSelectItem } from './filter-select-item.model';
import { MultiSelectFilterUIService } from './multi-select-filter-ui.service';

@Component({
  selector: 'pp-multi-select-filter',
  templateUrl: './multi-select-filter.component.html',
  styleUrls: ['./multi-select-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi:true,
    useExisting: MultiSelectFilterComponent
  }]
})
export class MultiSelectFilterComponent implements ControlValueAccessor {
  @Input() defaultTooltip: string;
  @Input() placeHolders: string;
  @Input() filtersList: IFilterSelectItem[];
  filtersSelectionControl: FormControl = new FormControl();
  uiService: MultiSelectFilterUIService = new MultiSelectFilterUIService();
  selectAllOption: IFilterSelectItem = {...this.uiService.selectAllOption };
  clearAllOption: IFilterSelectItem = {...this.uiService.clearAllOption };

  onChange = (selectedValue: IFilterSelectItem[]) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  constructor() { }

  writeValue(selectedFilters: IFilterSelectItem[]): void {
    let filtersSelection: IFilterSelectItem[] = [];
    if(selectedFilters && selectedFilters.length > 0) {
      selectedFilters.forEach(defaultSelection => {
        const selectionFromList = this.filtersList.find(x => x.filterItemId === defaultSelection.filterItemId);
        filtersSelection = [...filtersSelection, selectionFromList];
      });
    }
    this.filtersSelectionControl.setValue(filtersSelection);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched(): void {
    if(!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  selectionChanged(): void {
    this.onChange([...this.filtersSelectionControl.value]);
    this.markAsTouched();
  }

  selectAll(): void {
    this.filtersSelectionControl.setValue([...this.filtersList]);
    this.selectionChanged();
  }

  clearAll(): void {
    this.filtersSelectionControl.setValue([]);
    this.selectionChanged();
  }

  getToottip(): string {
    return this.uiService.getTooltip(this.filtersSelectionControl.value, this.defaultTooltip)
  }
}
