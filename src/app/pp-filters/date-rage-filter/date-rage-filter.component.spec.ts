import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PpDatePickerModule } from '@shared/components/date-picker';

import { DateRageFilterComponent } from './date-rage-filter.component';
import { IDateRangeFilter } from './date-range-filter.model';

describe('DateRageFilterComponent', () => {
  let component: DateRageFilterComponent;
  let fixture: ComponentFixture<DateRageFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRageFilterComponent ],
      imports: [ 
        PpDatePickerModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRageFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Date range form", () => {
    let onChangeSpy, onTouchedSpy;
    beforeEach(() => {
      onChangeSpy = spyOn(component, "onChange");
      onTouchedSpy = spyOn(component, "onTouched");
      fixture.detectChanges();
    });

    it("should notify when user updates start date", () => {
      // arrange
      const startDate = new Date();
      const expectedDateRange: IDateRangeFilter = {
        start: startDate,
        end: null
      }

      // act
      component.start.setValue(startDate);
      
      // assert
      expect(onChangeSpy).toHaveBeenCalledWith(expectedDateRange);
    });

    it("should notify when user updates end date", () => {
      // arrange
      const endDate = new Date();
      const expectedDateRange: IDateRangeFilter = {
        start: endDate,
        end: null
      }

      // act
      component.start.setValue(endDate);
      
      // assert
      expect(onChangeSpy).toHaveBeenCalledWith(expectedDateRange);
    });

    it("should notify form have been touched if user updates start date", () => {
      // arrange
      const startDate = new Date();

      // act
      component.start.setValue(startDate);
      
      // assert
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it("should notify form have been touched if user updates end date", () => {
      // arrange
      const endDate = new Date();

      // act
      component.start.setValue(endDate);
      
      // assert
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it("should update start and end date form controls if values are set up from outside", () => {
      // arrange
      const startDate = new Date();
      const endDate = new Date();

      // act
      const dateRange: IDateRangeFilter = {
        start: startDate,
        end: endDate
      }
      component.writeValue(dateRange);
      const expectedStartDate = component.start.value;
      const expectedEndDate = component.end.value;
      
      // assert
      expect(expectedStartDate).toEqual(startDate);
      expect(expectedEndDate).toEqual(endDate);
    });
  });
});
