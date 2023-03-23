import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';

@Component({
  selector: 'pp-search-value-filter',
  templateUrl: './search-value-filter.component.html',
  styleUrls: ['./search-value-filter.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: SearchValueFilterComponent
    }]
})
export class SearchValueFilterComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  onChange = (selectedValue: string) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;
  searchValueControl: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.subscriptionManager.add(
      this.searchValueControl.valueChanges.subscribe(value => {
        this.onChange(value);
        this.markAsTouched();
      })
    );
  }

  writeValue(searchValue: string): void {
    this.searchValueControl.setValue(searchValue);
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

  clearValue(): void {
    this.searchValueControl.setValue("");
  }

  hasValue(): boolean {
    return this.searchValueControl.value !== "" && this.searchValueControl.value !== undefined && this.searchValueControl.value !== null;
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }
}
