import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchValueFilterComponent } from './search-value-filter.component';

describe('SearchValueFilterComponent', () => {
  let component: SearchValueFilterComponent;
  let fixture: ComponentFixture<SearchValueFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchValueFilterComponent ],
      imports: [ ReactiveFormsModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchValueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should subscribe to control value change on init", () => {
    // arrange
    const valueChangeSubscriptionSpy = spyOn(component.searchValueControl.valueChanges, "subscribe");
    
    // act
    component.ngOnInit();
    
    // assert
    expect(valueChangeSubscriptionSpy).toHaveBeenCalled();
  });

  describe("Value selection", () => {
    it("should correctly set up the default selection", () => {
      // arrange
      const defaultSelectedValues: string = "promo";

      // act
      component.writeValue(defaultSelectedValues);

      // assert
      expect(component.searchValueControl.value).toEqual(defaultSelectedValues);
    });

    it("should notify when user changes the selected value", () => {
      // arrange
      const onChangeSpy = spyOn(component, "onChange");
      
      // act
      const userSelectedValue: string = "promo";
      component.searchValueControl.setValue(userSelectedValue);

      // assert
      expect(onChangeSpy).toHaveBeenCalledWith(userSelectedValue);
    });

    it("should mark component as touched when user selects a value", () => {
      // arrange
      const onTouchedSpy = spyOn(component, "onTouched");
      
      // act
      const userSelectedValue: string = "promo";
      component.searchValueControl.setValue(userSelectedValue);

      // assert
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it("should clear the selected value if the user clicks the clear button", () => {
      // arrange
      const defaultValue: string = "promo";
      component.writeValue(defaultValue);

      // act
      component.clearValue();

      // assert
      expect(component.searchValueControl.value).toBeFalsy();
    });

    it("should clear the selected value if the user clicks the clear button", () => {
      // arrange
      const defaultValue: string = "promo";
      component.writeValue(defaultValue);

      // act
      component.clearValue();

      // assert
      expect(component.searchValueControl.value).toBeFalsy();
    });
  });
});
