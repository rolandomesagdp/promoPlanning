import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersManager, IPpFilters, PpFilters } from '@app/pp-filters/filters';
import { PromotionLockService } from '@app/promotion-lock';
import { UserAccountService } from '@pp-core/auth/user';
import { EnvironmentService } from '@pp-core/environment';
import { LocalStorageService } from '@pp-core/local-storage';
import { LogService } from '@pp-core/logging';
import { PermissionManagerService } from '@pp-core/permissions';
import { SnackbarService } from '@pp-core/snackbar';
import { ConfirmationDialogModule } from '@shared/components/confirmation-dialog';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { of } from 'rxjs';
import { CalendarTasksService, CalendarTaskType, PpCalendarTask } from '../../tasks';

import { CalendarComponent } from '../calendar.component';
import { CalendarViewSpecSetup, RouteMock } from './calendar.component-spec-setup';
import { DynamicGridConfigurationService } from '@app/dynamic-grid-configuration';

describe('CalendarComponent', () => {
  let routeMock, routerMock, snackBarMock, loggerMock, localStorageMock, 
  promoLockServiceMock, permissionManagerMock, userAccountServiceMock,
  calendarTaskServiceMock, environmentServiceMock, dynamicGridConfigurationServiceMock;
  const calendarSpecSetUp: CalendarViewSpecSetup = new CalendarViewSpecSetup();
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    routeMock = new RouteMock();
    routerMock = jasmine.createSpyObj(["navigate"]);
    calendarTaskServiceMock = jasmine.createSpyObj(["getCalendar"]);
    calendarTaskServiceMock.getCalendar.and.returnValue(of([]));
    snackBarMock = jasmine.createSpyObj(["openError"]);
    loggerMock = jasmine.createSpyObj(["debug", "error"]);
    localStorageMock = jasmine.createSpyObj(["getPromotionFilters", "getPromotionFiltersAuthor", "addPromotionFilters", "clear"]);
    promoLockServiceMock = jasmine.createSpyObj(["lockPromotion"]);
    permissionManagerMock = jasmine.createSpyObj(["isAllowedPermission"]);
    permissionManagerMock.isAllowedPermission.and.returnValue(true);
    userAccountServiceMock = jasmine.createSpyObj(["userIsAdmin"], { permissionManager: permissionManagerMock });
    environmentServiceMock = jasmine.createSpyObj("envServiceMock", ["getEnvironment"]);
    dynamicGridConfigurationServiceMock = jasmine.createSpyObj("dynamicMock", ["getTableColumnsConfiguration"]);
    dynamicGridConfigurationServiceMock.getTableColumnsConfiguration.and.returnValue(of([{ position: 1, columnHeader: 'Name', property: 'name' }]));
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [ ConfirmationDialogModule, PpAngularMaterialModule, HttpClientTestingModule ],
      providers: [
        FiltersManager,
        { provide: PromotionLockService, useValue: promoLockServiceMock },
        { provide: CalendarTasksService, useValue: calendarTaskServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
        { provide: SnackbarService, useValue: snackBarMock },
        { provide: LocalStorageService, useValue: localStorageMock },
        { provide: LogService, useValue: loggerMock },
        { provide: PermissionManagerService, useValue: permissionManagerMock },
        { provide: UserAccountService, useValue: userAccountServiceMock },
        { provide: EnvironmentService, useValue: environmentServiceMock },
        { provide: DynamicGridConfigurationService, useValue: dynamicGridConfigurationServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    component.tasksManager.connectToPromotionLockNotificationHub = () => { }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should subscribe to angular's router queryParam onInit", () => {
    // arrange
    const queryParamSpy = spyOn(component.route.queryParams, "subscribe");

    // act
    component.ngOnInit();

    // assert
    expect(queryParamSpy).toHaveBeenCalled();
  });

  it("should get column configuration", () => {
    const columnSpy = spyOn(component, "getColumnsConfiguration");
    component.ngOnInit();
    expect(columnSpy).toHaveBeenCalled();
  })

  it("should correctly apply filters", () => {
    // arrange
    const navigateSpy = spyOn(component, "navigate");
    const filters: IPpFilters = PpFilters.createEmptyModel();
    filters.searchValue = "promo";
    component.filtersManager.filters = filters;

    // act
    component.applyFilters();

    // assert
    const expectedUrl: string = "calendar";
    const expectedParams = PpFilters.create(filters).toParams();
    expect(navigateSpy).toHaveBeenCalledOnceWith(expectedUrl, expectedParams);
  });

  describe("On task Selected", () => {
    let navigateSpy;

    beforeEach(() => {
      navigateSpy = spyOn(component, "navigate");
    });

    it("should do nothing if Promo Type task is selected", () => {
      // arrange
      const taskToSelect: PpCalendarTask = calendarSpecSetUp.getTaskByType(CalendarTaskType.PromoType);

      // act
      component.taskSelected(taskToSelect);

      // assert
      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it("should do nothing if selected promotion is locked", () => {
      // arrange
      const taskToSelect: PpCalendarTask = calendarSpecSetUp.getTaskByType(CalendarTaskType.Promo);
      taskToSelect.isLocked = true;

      // act
      component.taskSelected(taskToSelect);

      // assert
      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it("should navigate to the corresponding promotion if Promo task is selected", () => {
      // arrange
      const taskToSelect: PpCalendarTask = calendarSpecSetUp.getTaskByType(CalendarTaskType.Promo);

      // act
      component.taskSelected(taskToSelect);

      // assert
      const promotionUrl = `promotion/${taskToSelect.elementId}`
      expect(navigateSpy).toHaveBeenCalledWith(promotionUrl);
    });
  });

  describe("onDestroy", () => {
    it("should destroy the Promotion lock connection hub", () => {
        // arrange
        component.tasksManager.destroy = () => { }
        const taskListDestoySpy = spyOn(component.tasksManager, "destroy");
        component.ngOnInit();
        
        // act
        component.ngOnDestroy();

        // assert
        expect(taskListDestoySpy).toHaveBeenCalled();
    });
});
});
