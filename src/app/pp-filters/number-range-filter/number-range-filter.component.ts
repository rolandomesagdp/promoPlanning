import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INumberRangeFilter } from '.';

@Component({
  selector: 'pp-number-range-filter',
  templateUrl: './number-range-filter.component.html',
  styleUrls: ['./number-range-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi:true,
    useExisting: NumberRangeFilterComponent
  }]
})
export class NumberRangeFilterComponent implements OnInit, ControlValueAccessor {
  @Input() tooltipSufix: string = "";
  @Input() lableSufix: string = "";
  onChange = (selectedValue: INumberRangeFilter) => { };
  onTouched = () => { };
  touched = false;
  disabled = false;
  rangeStart: number;
  rangeEnd: number;

  constructor() {
    this.lableFormat = this.lableFormat.bind(this);
    this.tooltipFormat = this.tooltipFormat.bind(this);
  }

  ngOnInit(): void {
    if (!this.rangeStart) this.rangeStart = 20;
    if (!this.rangeEnd) this.rangeEnd = 60;
  }

  writeValue(numberRange: INumberRangeFilter): void {
    if(numberRange) {
      this.rangeStart = numberRange.start;
      this.rangeEnd = numberRange.end;
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

  markAsTouched(): void {
    if(!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  onRangeChanged(valueChangeEvent: any): void {
    const numberRange: INumberRangeFilter = {
      start: valueChangeEvent.start,
      end: valueChangeEvent.end
    }
    this.onChange(numberRange);
    this.markAsTouched();
  }

  lableFormat(value: any): string {
    return `${value} ${this.lableSufix}`;
  };

  tooltipFormat(value: any): string {
    return `${value} ${this.tooltipSufix}`;
  }
}
