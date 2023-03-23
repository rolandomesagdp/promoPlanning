import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CalendarTasksService } from "@app/calendar/tasks";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, IPpFilters, PpFilters } from "@app/pp-filters/filters";
import { PromotionLockService, PromotionLockType } from "@app/promotion-lock";
import { PromotionLock } from "@app/promotion-lock/promotion-lock-model";
import { UserAccountService } from "@pp-core/auth/user";
import { LocalStorageService } from "@pp-core/local-storage";
import { LogService } from "@pp-core/logging";
import { PermissionManagerService } from "@pp-core/permissions";
import { SettingsManager } from "@pp-core/settings/settings-manager";
import { SnackbarService } from "@pp-core/snackbar";
import { ConfirmationDialogService } from "@shared/components/confirmation-dialog";
import { ConfirmationResponse } from "@shared/components/confirmation-dialog/data";
import { of } from "rxjs";
import { CalendarTaskManager } from "../calendar-tasks-manager";
import { CalendarTasksManagerSpecSetup } from "./calendar-tasks-manager.specsetup";

describe("CalendarTaskManager", () => {
    let specSetup: CalendarTasksManagerSpecSetup = new CalendarTasksManagerSpecSetup();
    let calendarTasksServiceMock, loggerMock,
        confirmationDialogServiceMock,
        snackbarMock, promotionLockServiceMock, userAccountServiceMock, permissionsManagerMock, settigsManagerMock,
        localStorageMock;

    beforeEach(() => {
        calendarTasksServiceMock = jasmine.createSpyObj(["getCalendar"]);
        calendarTasksServiceMock.getCalendar.and.returnValue(of(specSetup.getCalendarTasks()))

        loggerMock = jasmine.createSpyObj(["debug", "error"]);
        snackbarMock = jasmine.createSpyObj(["openWarn", "openError"]);
        promotionLockServiceMock = jasmine.createSpyObj(["unlockPromotion", "requestPromotionUnlock", "forcePromotionUnlock"]);
        permissionsManagerMock = jasmine.createSpyObj(["isAllowedPermission"]);
        permissionsManagerMock.isAllowedPermission.and.returnValue(true);
        userAccountServiceMock = jasmine.createSpyObj(["userIsAdmin"], { permissionManager: permissionsManagerMock })
        settigsManagerMock = jasmine.createSpyObj(["getLogLevel"]);
        localStorageMock = jasmine.createSpyObj(["getSettings", "addSettings"]);
        confirmationDialogServiceMock = jasmine.createSpyObj(["confirm"]);
        confirmationDialogServiceMock.confirm.and.returnValue(of(ConfirmationResponse.Accept));

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: ConfirmationDialogService, useValue: confirmationDialogServiceMock },
                { provide: CalendarTasksService, useValue: calendarTasksServiceMock },
                { provide: LogService, useValue: loggerMock },
                { provide: SnackbarService, useValue: snackbarMock },
                { provide: PromotionLockService, useValue: promotionLockServiceMock },
                { provide: PermissionManagerService, useValue: permissionsManagerMock },
                { provide: SettingsManager, useValue: settigsManagerMock },
                { provide: LocalStorageService, useValue: localStorageMock },
                { provide: UserAccountService, useValue: userAccountServiceMock }
            ]
        });

        specSetup.calendarTasksService = TestBed.get(CalendarTasksService);
        specSetup.logService = TestBed.get(LogService);
        specSetup.snackbarService = TestBed.get(SnackbarService);
        specSetup.promotionLockService = TestBed.get(PromotionLockService);
        specSetup.userAccountService = TestBed.get(UserAccountService);
        specSetup.confirmationDialogService = TestBed.get(ConfirmationDialogService);
    });

    it("should create", () => {
        // act
        const calendarTasksManager: CalendarTaskManager = specSetup.buildCalendarTasksManager();

        // assert
        expect(calendarTasksManager).toBeTruthy();
    });

    it("should correctly set tasks property after load", () => {
        // arrange
        const calendarTasksManager: CalendarTaskManager = specSetup.buildCalendarTasksManager();
        let filters: IPpFilters = PpFilters.createEmptyModel();
        filters.pageSize = DEFAULT_PAGE_SIZE;
        filters.pageIndex = DEFAULT_PAGE_INDEX;
        // act
        calendarTasksManager.loadTasks(filters);

        // assert
        expect(calendarTasksManager.tasks.length).toEqual(specSetup.getCalendarTasks().length);
    });

    describe("lock process", () => {
        it("should correctly lock a given task", () => {
            // arrange
            const calendarTasksManager: CalendarTaskManager = specSetup.buildCalendarTasksManager();
            let filters: IPpFilters = PpFilters.createEmptyModel();
            filters.pageSize = DEFAULT_PAGE_SIZE;
            filters.pageIndex = DEFAULT_PAGE_INDEX;
            calendarTasksManager.loadTasks(filters);

            // act
            const promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            calendarTasksManager.lock(promotionLock);

            // assert
            const lockedTask = calendarTasksManager.tasks.find(x => x.elementId === promotionLock.promotionId);
            expect(lockedTask.isLocked).toBeTrue();
        });

        it("should not lock a task if it is a PromotType task", () => {
            // arrange
            const calendarTasksManager: CalendarTaskManager = specSetup.buildCalendarTasksManager();
            let filters: IPpFilters = PpFilters.createEmptyModel();
            filters.pageSize = DEFAULT_PAGE_SIZE;
            filters.pageIndex = DEFAULT_PAGE_INDEX;
            calendarTasksManager.loadTasks(filters);

            // act
            let promotionLock: PromotionLock = specSetup.getPromotionTypeLockModel();
            calendarTasksManager.lock(promotionLock);

            // assert
            const lockedTask = calendarTasksManager.tasks.find(x => x.elementId === promotionLock.promotionId);
            expect(lockedTask.isLocked).toBeFalse();
        });

        it("should correctly unlock a task", () => {
            // arrange
            const calendarTasksManager: CalendarTaskManager = specSetup.buildCalendarTasksManager();
            let filters: IPpFilters = PpFilters.createEmptyModel();
            filters.pageSize = DEFAULT_PAGE_SIZE;
            filters.pageIndex = DEFAULT_PAGE_INDEX;
            calendarTasksManager.loadTasks(filters);
            let promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            calendarTasksManager.lock(promotionLock);
            // act
            
            promotionLock.lockType = PromotionLockType.unlocked;
            calendarTasksManager.unlock(promotionLock);

            // assert
            const lockedTask = calendarTasksManager.tasks.find(x => x.elementId === promotionLock.promotionId);
            expect(lockedTask.isLocked).toBeFalse();
        });

        it("should correctly force an unlock for a given task", () => {
            // arrange
            const calendarTasksManager: CalendarTaskManager = specSetup.buildCalendarTasksManager();
            const unlockSpy = spyOn(calendarTasksManager, "unlock");
            let filters: IPpFilters = PpFilters.createEmptyModel();
            filters.pageSize = DEFAULT_PAGE_SIZE;
            filters.pageIndex = DEFAULT_PAGE_INDEX;
            calendarTasksManager.loadTasks(filters);
            let promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            calendarTasksManager.lock(promotionLock);
            // act
            
            promotionLock.lockType = PromotionLockType.unlockForced;
            calendarTasksManager.forceUnlock(promotionLock);

            // assert
            expect(unlockSpy).toHaveBeenCalledWith(promotionLock);
        });
    });
});