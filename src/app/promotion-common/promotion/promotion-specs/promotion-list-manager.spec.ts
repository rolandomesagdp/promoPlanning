import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { IPpFilters } from "@app/pp-filters/filters";
import { IPromotion, PromotionService } from "@app/promotion-common";
import { PromotionLockService, PromotionLockType } from "@app/promotion-lock";
import { PromotionLock } from "@app/promotion-lock/promotion-lock-model";
import { UserAccountService } from "@pp-core/auth/user";
import { LocalStorageService } from "@pp-core/local-storage";
import { LogService } from "@pp-core/logging";
import { PermissionManagerService } from "@pp-core/permissions";
import { SettingsManager } from "@pp-core/settings/settings-manager";
import { SnackbarService } from "@pp-core/snackbar";
import { ConfirmationDialogModule, ConfirmationDialogService } from "@shared/components/confirmation-dialog";
import { PpAngularMaterialModule } from "@shared/pp-angular-material";
import { of } from "rxjs";
import { PromotionListManagerSpecSetup } from "./promotion-list-manager.specsetup";
describe("PromoitonListManager", () => {
    const specSetup: PromotionListManagerSpecSetup = new PromotionListManagerSpecSetup();
    let promotionServiceMock, loggerMock, 
    snackbarMock, promotionLockServiceMock,
    permissionsManagerMock, settigsManagerMock, 
    localStorageMock, userAccountServiceMock;
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
        
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ConfirmationDialogModule,
                PpAngularMaterialModule
            ],
            providers: [
                { provide: PromotionService, useValue: promotionServiceMock },
                { provide: LogService, useValue: loggerMock },
                { provide: SnackbarService, useValue: snackbarMock },
                { provide: PromotionLockService, useValue: promotionLockServiceMock },
                { provide: PermissionManagerService, useValue: permissionsManagerMock },
                { provide: SettingsManager, useValue: settigsManagerMock },
                { provide: LocalStorageService, useValue: localStorageMock },
                { provide: UserAccountService, useValue: userAccountServiceMock }
            ]
        });

        specSetup.promotionService = TestBed.get(PromotionService);
        specSetup.logService = TestBed.get(LogService);
        specSetup.snackbarService = TestBed.get(SnackbarService);
        specSetup.promotionLockService = TestBed.get(PromotionLockService);
        specSetup.userAccountService = TestBed.get(UserAccountService);
        specSetup.confirmationDialogService = TestBed.get(ConfirmationDialogService);
    });

    describe("promotionLock", () => {
        it("should correctly lock a promotion.", () => {
            // arrange
            let promotionListManager = specSetup.buildPromotionListManager();
            const filters: IPpFilters = specSetup.getPromotionFilters();
            promotionListManager.loadPromotions(filters);

            // act
            let promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            promotionListManager.lock(promotionLock);
            
            // assert
            const lockedPromotion: IPromotion = promotionListManager.promotions
            .find(x => x.promoId === promotionLock.promotionId);
            expect(lockedPromotion.isLocked).toBeTrue();
        });

        it("should correctly unlock a promotion.", () => {
            // arrange
            let promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            let promotionListManager = specSetup.buildPromotionListManager();
            const filters: IPpFilters = specSetup.getPromotionFilters();
            promotionListManager.loadPromotions(filters);
            promotionListManager.lock(promotionLock);

            // act
            promotionLock.lockType = PromotionLockType.unlocked;
            promotionListManager.unlock(promotionLock);
            
            // assert
            const unlockedPromotion: IPromotion = promotionListManager.promotions
            .find(x => x.promoId === promotionLock.promotionId);
            expect(unlockedPromotion.isLocked).toBeFalse();
        });

        it("should correctly force a promotion unlock .", () => {
            // arrange
            let promotionListManager = specSetup.buildPromotionListManager();
            const unlockSpy = spyOn(promotionListManager, "unlock");
            const filters: IPpFilters = specSetup.getPromotionFilters();
            promotionListManager.loadPromotions(filters);

            // act
            let promotionLock: PromotionLock = specSetup.getPromotionLockModel();
            promotionListManager.forceUnlock(promotionLock);
            
            // assert
            expect(unlockSpy).toHaveBeenCalledWith(promotionLock);
        });
    });

    describe("loadPromotions", () => {
        it("should correctly set up the promotions variable.", () => {
            // arrange
            let promotionsListManager = specSetup.buildPromotionListManager();
            let filters: IPpFilters = specSetup.getPromotionFilters();

            // act
            promotionsListManager.loadPromotions(filters);
            
            // assert
            expect(promotionsListManager.promotions.length).toEqual(specSetup.getPromotionsCount());
        });

        it("should correctly set up the promotionsCount variable.", () => {
            // arrange
            let promotionsListManager = specSetup.buildPromotionListManager();
            let filters: IPpFilters = specSetup.getPromotionFilters();

            // act
            promotionsListManager.loadPromotions(filters);
            
            // assert
            expect(promotionsListManager.promostionsCount).toEqual(specSetup.getPromotionsCount());
        });

        it("should load promotions and total count on first load.", () => {
            // arrange
            let promotionsListManager = specSetup.buildPromotionListManager();
            let filters: IPpFilters = specSetup.getPromotionFilters();

            // act
            promotionsListManager.loadPromotions(filters);
            
            // assert
            expect(specSetup.promotionService.getPromotions).toHaveBeenCalledOnceWith(filters);
            expect(specSetup.promotionService.getPromotionsCount).toHaveBeenCalledOnceWith(filters);
        });

        it("should not load promotions total count on page change.", () => {
            // arrange
            let promotionsListManager = specSetup.buildPromotionListManager();
            promotionsListManager.pageChanged = true;
            let filters: IPpFilters = specSetup.getPromotionFilters();

            // act
            promotionsListManager.loadPromotions(filters);
            
            // assert
            expect(specSetup.promotionService.getPromotions).toHaveBeenCalledOnceWith(filters);
            expect(specSetup.promotionService.getPromotionsCount).not.toHaveBeenCalled();
        })
    });
});