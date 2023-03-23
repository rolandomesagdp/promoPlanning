import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { PromotionService } from "@app/promotion-common";
import { UserAccountService } from "@pp-core/auth/user";
import { LocalStorageService } from "@pp-core/local-storage";
import { LogService } from "@pp-core/logging";
import { PermissionManagerService } from "@pp-core/permissions";
import { SettingsManager } from "@pp-core/settings/settings-manager";
import { SnackbarService } from "@pp-core/snackbar";
import { ConfirmationDialogService } from "@shared/components/confirmation-dialog";
import { ConfirmationResponse } from "@shared/components/confirmation-dialog/data";
import { of } from "rxjs";
import { LockManager } from ".";
import { PromotionLockType } from "..";
import { PromotionLock } from "../promotion-lock-model";
import { PromotionLockService } from "../promotion-lock.service";
import { LockManagerSpecSetup } from "./lock-manager.specsetup";

describe("LockManager", () => {
    const specSetup: LockManagerSpecSetup = new LockManagerSpecSetup();

    let promotionServiceMock, loggerMock,
        confirmationDialogServiceMock,
        snackbarMock, promotionLockServiceMock, permissionsManagerMock,
        settigsManagerMock, userAccountServiceMock, localStorageMock;
    beforeEach(() => {
        promotionServiceMock = jasmine.createSpyObj(["getPromotions", "getPromotionsCount"]);
        promotionServiceMock.getPromotions.and.returnValue(of(specSetup.getPromotions()))
        promotionServiceMock.getPromotionsCount.and.returnValue(of(specSetup.getPromotionsCount()));

        loggerMock = jasmine.createSpyObj(["debug", "error"]);
        snackbarMock = jasmine.createSpyObj(["openWarn", "openError"]);
        promotionLockServiceMock = jasmine.createSpyObj(["unlockPromotion", "requestPromotionUnlock", "forcePromotionUnlock"]);
        permissionsManagerMock = jasmine.createSpyObj(["isAllowedPermission"]);
        permissionsManagerMock.isAllowedPermission.and.returnValue(true);
        userAccountServiceMock = jasmine.createSpyObj(["userIsAdmin", { permissionManager: permissionsManagerMock }])
        settigsManagerMock = jasmine.createSpyObj(["getLogLevel"]);
        localStorageMock = jasmine.createSpyObj(["getSettings", "addSettings"]);
        confirmationDialogServiceMock = jasmine.createSpyObj(["confirm"]);
        confirmationDialogServiceMock.confirm.and.returnValue(of(ConfirmationResponse.Accept));

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: UserAccountService, useValue: userAccountServiceMock },
                { provide: ConfirmationDialogService, useValue: confirmationDialogServiceMock },
                { provide: PromotionService, useValue: promotionServiceMock },
                { provide: LogService, useValue: loggerMock },
                { provide: SnackbarService, useValue: snackbarMock },
                { provide: PromotionLockService, useValue: promotionLockServiceMock },
                { provide: PermissionManagerService, useValue: permissionsManagerMock },
                { provide: SettingsManager, useValue: settigsManagerMock },
                { provide: LocalStorageService, useValue: localStorageMock }
            ]
        });

        specSetup.promotionService = TestBed.get(PromotionService);
        specSetup.logService = TestBed.get(LogService);
        specSetup.snackbarService = TestBed.get(SnackbarService);
        specSetup.promotionLockService = TestBed.get(PromotionLockService);
        specSetup.userAccountService = TestBed.get(UserAccountService);
        specSetup.confirmationDialogService = TestBed.get(ConfirmationDialogService);
    });

    it("should create", () => {
        // act
        const lockManager: LockManager = specSetup.buildLockManager();

        // assert
        expect(lockManager).toBeTruthy();
    });

    describe("onLockMessageReceived", () => {
        it("should lock a promotion on promotion Lock message received", () => {
            // arrange
            const lockManager: LockManager = specSetup.buildLockManager();
            const lockSpy = spyOn(lockManager, "lock");
            const promotionLock: PromotionLock = specSetup.getPromotionLockModel();

            // act
            lockManager.onLockMessageReceived(promotionLock);

            // assert
            expect(lockSpy).toHaveBeenCalledWith(promotionLock);
        });

        it("should unlock a promotion on promotion UnLock message received", () => {
            // arrange
            const lockManager: LockManager = specSetup.buildLockManager();
            const lockSpy = spyOn(lockManager, "unlock");
            const promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            promotionLock.lockType = PromotionLockType.unlocked;

            // act
            lockManager.onLockMessageReceived(promotionLock);

            // assert
            expect(lockSpy).toHaveBeenCalledWith(promotionLock);
        });

        it("should  force a promotion unlock a promotion on ForceUnLock message received", () => {
            // arrange
            const lockManager: LockManager = specSetup.buildLockManager();
            const lockSpy = spyOn(lockManager, "unlock");
            const promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            promotionLock.lockType = PromotionLockType.unlockForced;

            // act
            lockManager.onLockMessageReceived(promotionLock);

            // assert
            expect(lockSpy).toHaveBeenCalledWith(promotionLock);
        });

        it("should  correctly react to a promotion Unlock request by another user", () => {
            // arrange
            const lockManager: LockManager = specSetup.buildLockManager();
            const lockSpy = spyOn(lockManager, "onUnlockRequestedByAnotherUser");
            const promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            promotionLock.lockType = PromotionLockType.unlockRequested;

            // act
            lockManager.onLockMessageReceived(promotionLock);

            // assert
            expect(lockSpy).toHaveBeenCalledWith(promotionLock);
        });
    });
});