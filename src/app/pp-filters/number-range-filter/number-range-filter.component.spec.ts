import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { INumberRangeFilter } from '.';

import { NumberRangeFilterComponent } from './number-range-filter.component';

describe('NumberRangeFilterComponent', () => {
  let component: NumberRangeFilterComponent;
  let fixture: ComponentFixture<NumberRangeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberRangeFilterComponent],
      imports: [PpAngularMaterialModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRangeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Default values", () => {
    it("should have 20 and 60 as default values if no default values are provided", () => {
      expect(component.rangeStart).toEqual(20);
      expect(component.rangeEnd).toEqual(60);
    });

    it("should set the default values provided by parent component", () => {
      // arrange
      const defaultValues: INumberRangeFilter = {
        start: 10,
        end: 50
      };

      // act
      component.writeValue(defaultValues);

      // assert
      expect(component.rangeStart).toEqual(defaultValues.start);
      expect(component.rangeEnd).toEqual(defaultValues.end);
    });
  });

  describe("Value selection", () => {
    it("should notify the correct value when user changes the selection", () => {
      // arrange
      const onChangeSpy = spyOn(component, "onChange");
      component.writeValue({ start: 10, end: 50 });
      const valueChangeEvent: any = { start: 30, end: 60 };

      // act
      component.onRangeChanged(valueChangeEvent);

      // assert
      const numberRangeToPassToOnChange: INumberRangeFilter = { start: 30, end: 60 };
      expect(onChangeSpy).toHaveBeenCalledWith(numberRangeToPassToOnChange);
    });

    it("should mark the component as touched when user changes the selection", () => {
      // arrange
      const onTouchedSpy = spyOn(component, "onTouched");
      component.writeValue({ start: 10, end: 50 });
      const valueChangeEvent: any = { start: 30, end: 60 };

      // act
      component.onRangeChanged(valueChangeEvent);

      // assert
      expect(onTouchedSpy).toHaveBeenCalledWith();
    });
  });
});
