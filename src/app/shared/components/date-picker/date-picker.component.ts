import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { DevextremeStylingModes, PpDevextremeModule } from '@shared/pp-devextreme';
import config from "devextreme/core/config";
import * as moment from 'moment';

@Component({
  selector: 'pp-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: [
    './date-picker.component.scss', 
    './date-picker-filled-.styles.scss', 
    './date-picker-outlined.styles.scss',
    './date-picker-underlined.styles.scss'
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi:true, useExisting: DatePickerComponent }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() stylingMode: DevextremeStylingModes = "outlined";
  @Input() label: string;
  selectedDate: Date;
  isOpened: boolean = false;
  isoWeekNumber: number = 7;
  
  constructor() { }

  ngOnInit(): void {
    config({
      editorStylingMode: this.stylingMode,
      
    })
  }

  onChange = (selectedDate) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  getDateBoxClass(): string {
    switch(this.stylingMode) {
      default: case "outlined":
        return "outlined-date-box";
      case "underlined":
        return "underlined-date-box";
      case "filled":
        return "filled-date-box";
    }
  }

  displayWeekNumber(itemData: any): boolean {
    return itemData.date.getDay() == 1 && itemData.view === "month";
  }

  getIsoWeekNumber(itemData: any): string {
    return moment(itemData.date).isoWeek().toString();
  }

  writeValue(selectedDate: Date): void {
    this.selectedDate = selectedDate;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  onValueChaged(selectedDate: Date): void {
    this.markAsTouched();
    this.selectedDate = selectedDate;
    this.onChange(this.selectedDate);
  }

  markAsTouched(): void {
    if(!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  displayLabel(): boolean {
    if(!this.isOpened) {
      return !this.selectedDate ? true : false;
    }
    return false;
  }

  onOpened(): void {
    this.isOpened = true;
  }

  onClosed(): void {
    this.isOpened = false;
  }
}

@NgModule({
  imports: [ 
    PpDevextremeModule,
    PpAngularMaterialModule,
    FormsModule,
    CommonModule
   ],
  exports: [ DatePickerComponent ],
  declarations: [ DatePickerComponent ]
})
export class PpDatePickerModule { }
