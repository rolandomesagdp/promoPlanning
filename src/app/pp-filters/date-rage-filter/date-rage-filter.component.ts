import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { IDateRangeFilter } from '.';

@Component({
  selector: 'pp-date-rage-filter',
  templateUrl: './date-rage-filter.component.html',
  styleUrls: ['./date-rage-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: DateRageFilterComponent
  }]
})
export class DateRageFilterComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  onChange = (selectedValue: IDateRangeFilter) => { };
  onTouched = () => { };
  touched = false;
  disabled = false;
  start: FormControl = new FormControl();
  end: FormControl = new FormControl();

  constructor(private changeDetector: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.start.valueChanges.subscribe(value => {
      this.onSelectionChanged();
    });

    this.end.valueChanges.subscribe(value => {
      this.onSelectionChanged();
    })
  }

  writeValue(dateRange: IDateRangeFilter): void {
    if (dateRange) {
      this.start.setValue(dateRange.start);
      this.end.setValue(dateRange.end);
      this.changeDetector.detectChanges();
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
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

  onSelectionChanged(): void {
    let dateRange: IDateRangeFilter = {
      start: this.start.value,
      end: this.end.value
    };
    this.onChange(dateRange);
    this.markAsTouched();
  }
}