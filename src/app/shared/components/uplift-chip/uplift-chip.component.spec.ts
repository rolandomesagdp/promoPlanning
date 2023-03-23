import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpliftChipComponent } from './uplift-chip.component';

describe('UpliftChipComponent', () => {
  let component: UpliftChipComponent;
  let fixture: ComponentFixture<UpliftChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpliftChipComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpliftChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("printed uplift", () => {
      it("should print the correct uplift percent with the % as prefix", () => {
          // act
          component.value = 20;

          // assert
          expect(component.getUpliftPercent()).toEqual("20%");
      });
  });

  describe("printed icon", () => {
    it("should be an up arrow if the uplift is positive", () => {
      // act
      component.value = 20;

      // assert
      expect(component.getIconName()).toEqual("arrow_upward");
    });

    it("should be a down arrow if the uplift is negative", () => {
      // act
      component.value = -20;

      // assert
      expect(component.getIconName()).toEqual("arrow_downward");
    });
  })

  describe("chip background color", () => {
    it("should be green if the perfent is positive", () => {
      // act
      component.value = 20;

      // assert
      expect(component.getColorCodingClass()).toEqual("positive-value-chip");
    });

    it("should be red if the perfent is negative", () => {
      // act
      component.value = -20;

      // assert
      expect(component.getColorCodingClass()).toEqual("negative-value-chip");
    });
  });
});
