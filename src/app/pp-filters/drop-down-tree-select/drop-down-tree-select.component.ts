import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeNodesService } from './tree-filters';
import { DropDownTreeSelectModel } from './tree-filters/drop-down-tree-select.model';

@Component({
  selector: 'pp-drop-down-tree-select',
  templateUrl: './drop-down-tree-select.component.html',
  styleUrls: ['./drop-down-tree-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi:true,
    useExisting: DropDownTreeSelectComponent
  }]
})
export class DropDownTreeSelectComponent implements OnChanges, ControlValueAccessor {
  onChange = (selectedValue: DropDownTreeSelectModel) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  @Input() filtersList: DropDownTreeSelectModel[];
  @Output() filterListNodeExpanded: EventEmitter<DropDownTreeSelectModel> = new EventEmitter<DropDownTreeSelectModel>();
  currentSelectedNode: string;
  filtersListData: DropDownTreeSelectModel[] = [];

  constructor(private treeNodesService: TreeNodesService) { }

  ngOnChanges(changes: SimpleChanges): void {
		if (changes['filtersList'] && changes['filtersList'].currentValue.length > 0) {
      this.treeNodesService.buildTreeNodes([...changes['filtersList'].currentValue]);
      this.filtersListData = this.treeNodesService.nodesToDisplay;
    }
  }

  writeValue(selectModel: DropDownTreeSelectModel): void {
    if(selectModel && !selectModel.hasItems) {
      this.currentSelectedNode = selectModel.name;
    }
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

  itemExpanded(item: any): void {
    const itemData: DropDownTreeSelectModel = item.node.itemData;
    if (itemData.hasItems) {
      this.filterListNodeExpanded.emit(itemData);
    }
  }

  onItemClick(itemData: DropDownTreeSelectModel): void {
    if(!itemData.hasItems) {
      this.currentSelectedNode = itemData.name;
      this.onChange(itemData);
      this.markAsTouched();
    }
  }

  markAsTouched(): void {
    if(!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }
}
