import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PromotionImportService } from '../promotion-import';

import { ForecastDemandImportListComponent } from './forecast-demand-import-list.component';
import { SnackbarService } from '@pp-core/snackbar';
import { LogService } from '@pp-core/logging';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ForecastDemandImportListComponent', () => {
  let promotionImportServiceMock = jasmine.createSpyObj(["getImportForecastDemandValues", "importForecastDemand"])
  let snackBarMock = jasmine.createSpyObj(["openSuccess"]);
  promotionImportServiceMock.getImportForecastDemandValues.and.returnValue(of(["one", "two", "three"]));
  promotionImportServiceMock.importForecastDemand.and.returnValue(of({}));
  let logServiceMock = jasmine.createSpyObj(["error"]);
  
  let component: ForecastDemandImportListComponent;
  let fixture: ComponentFixture<ForecastDemandImportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastDemandImportListComponent],
      providers: [
        { provide: SnackbarService, useValue: snackBarMock },
        { provide: PromotionImportService, useValue: promotionImportServiceMock },
        { provide: LogService, useValue: logServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDemandImportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("onInit", () => {
    it("should call getTableValues() on init", () => {
      // act
      const getTableValuesSpy = spyOn(component, "getTableValues");
      component.ngOnInit();

      // assert
      expect(getTableValuesSpy).toHaveBeenCalled();
    })
  });

  describe("import", () => {
    it("should be called import Forecast from service", () => {

      //act
      component.import('test');
      //assert
      expect(component.importService.importForecastDemand).toHaveBeenCalledWith('test')
    })
  })

  describe("onDestroy", () => {
    it("should unsubscribe subscription manager", () => {
      //act
      const subscriptionManagerSpy = spyOn(component.subscriptionManager, "unsubscribe");
      component.ngOnDestroy();
      //assert
      expect(subscriptionManagerSpy).toHaveBeenCalled();
    })
  })

  describe("component elements", () => {
    it("should print expected columns for table", () => {
      //arrange
      const tableCol = ['name', 'action'];
      //act

      //assert
      expect(component.displayedColumns).toEqual(tableCol);
    });
    it("should have title 'Forecast and Demand'", () => {
      //arrange
      const title = 'Forecast and Demand';
      //act

      //assert
      expect(component.title).toEqual(title);
    })
    it("should have values in ForecastDemand", () => {
      //arrange

      //act
      component.getTableValues();

      //assert

      expect(component.forecastDemandValues.length).toBeGreaterThan(0);
    })
  })
});
