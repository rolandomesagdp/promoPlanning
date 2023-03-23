import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, FiltersManager, IPpFilters, PpFilters } from '@app/pp-filters/filters';
import { PromotionLockService } from '@app/promotion-lock';
import { UserAccountService } from '@pp-core/auth/user/user-account-service/user-account.service';
import { LocalStorageService } from '@pp-core/local-storage';
import { PermissionManagerService } from '@pp-core/permissions';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { SnackbarService } from '@pp-core/snackbar';
import { ConfirmationDialogModule } from '@shared/components/confirmation-dialog';
import { BehaviorSubject, of } from 'rxjs';
import { PromotionListComponent } from '../promotion-list.component';
import { PromotionListComponentSepcSetup } from './promotion-list.component.specsetup';
import { LogService } from '@pp-core/logging';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IPromotion, PromotionPermissionsManager, PromotionService } from '@app/promotion-common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EnvironmentService } from '@pp-core/environment';
import { NavigationLinks } from '@app/navigation';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';
import { DynamicGridConfigurationService } from '@app/dynamic-grid-configuration';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { PromotionActionsManager } from '@app/promotion-common/promotion-actions/promotion-actions.manager';

describe('PromotionListComponent', () => {
    const specSetup: PromotionListComponentSepcSetup = new PromotionListComponentSepcSetup();
    let userAccountServiceMock, loggerMock, snackbarMock, promotionLockServiceMock,
        permissionsManagerMock, settigsManagerMock, localStorageMock, promotionServiceMock,
        environmentServiceMock, toggleDrawerServiceMock, promotionPermissionsMock, 
        dynamicGridServiceMock, promotionActionsManagerMock;
    let component: PromotionListComponent;
    let fixture: ComponentFixture<PromotionListComponent>;

    beforeEach(() => {
        environmentServiceMock = jasmine.createSpyObj("envServiceMock", ["getEnvironment"]);
        promotionActionsManagerMock = jasmine.createSpyObj("promotionActionsManagerMock", ["destroy", "deletePromotion"], {
            subscriptionManager: new SubscriptionsManager(),
            promotionDeleted$: new BehaviorSubject<IPromotion>(null).asObservable(),
            promotionEdited$: new BehaviorSubject<IPromotion>(null).asObservable(),
        })
        promotionServiceMock = jasmine.createSpyObj(["getPromotions", "getPromotionsCount"]);
        promotionServiceMock.getPromotions.and.returnValue(of(specSetup.getPromotions()));
        promotionServiceMock.getPromotionsCount.and.returnValue(of(specSetup.getPromotionsCount()));

        loggerMock = jasmine.createSpyObj(["debug", "error"]);

        snackbarMock = jasmine.createSpyObj(["openWarn", "openError"]);

        promotionLockServiceMock = jasmine.createSpyObj(["unlockPromotion", "requestPromotionUnlock", "forcePromotionUnlock"]);
        
        permissionsManagerMock = jasmine.createSpyObj(["isAllowedPermission"]);
        permissionsManagerMock.isAllowedPermission.and.returnValue(true);
        
        userAccountServiceMock = jasmine.createSpyObj([], {
            currentUser: specSetup.getUser(),
            permissionManager: permissionsManagerMock
         });

        settigsManagerMock = jasmine.createSpyObj(["getLogLevel"]);
        localStorageMock = jasmine.createSpyObj(["getPromotionFilters", "getPromotionFiltersAuthor"]);
        toggleDrawerServiceMock = jasmine.createSpyObj("toggleDrawerServiceMock", ["toggleDrawer"]);
        
        promotionPermissionsMock = jasmine.createSpyObj("promotionPermissionsMock", [""]);
        
        dynamicGridServiceMock = jasmine.createSpyObj("dynamicGridServiceMock", ["getTableColumnsConfiguration"])
        dynamicGridServiceMock.getTableColumnsConfiguration.and.returnValue(of([{position: 1, property: 'test', columnHeader: 'Test'}]))

        TestBed.configureTestingModule({
            declarations: [PromotionListComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                ConfirmationDialogModule
            ],
            providers: [
                FiltersManager,
                { provide: UserAccountService, useValue: userAccountServiceMock },
                { provide: PromotionService, useValue: promotionServiceMock },
                { provide: LogService, useValue: loggerMock },
                { provide: SnackbarService, useValue: snackbarMock },
                { provide: PromotionLockService, useValue: promotionLockServiceMock },
                { provide: PermissionManagerService, useValue: permissionsManagerMock },
                { provide: SettingsManager, useValue: settigsManagerMock },
                { provide: LocalStorageService, useValue: localStorageMock },
                { provide: EnvironmentService, useValue: environmentServiceMock },
                { provide: ToggleDrawerService, useValue: toggleDrawerServiceMock },
                { provide: PromotionPermissionsManager, useValue: promotionPermissionsMock },
                { provide: DynamicGridConfigurationService, useValue: dynamicGridServiceMock },
                { provide: PromotionActionsManager, useValue: promotionActionsManagerMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionListComponent);
        component = fixture.componentInstance;
        component.promotionListManager.connectToPromotionLockNotificationHub = () => { }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("onInit", () => {
        it("should subscribe to route params change", () => {
            // arrange
            const route: ActivatedRoute = TestBed.get(ActivatedRoute);
            const routeSpy = spyOn(route.queryParams, "subscribe");

            // act
            component.ngOnInit();

            // assert
            expect(routeSpy).toHaveBeenCalled();
        });

        it("should connect to Promotion Lock Notification Hub", () => {
            // arrange
            const promotionLockConnectionSpy = spyOn(component.promotionListManager, "connectToPromotionLockNotificationHub");

            // act
            component.ngOnInit();

            // assert
            expect(promotionLockConnectionSpy).toHaveBeenCalled();
        });
    });

    describe("navigation and filters", () => {
        it("should navigate to correct url when filters are applied", () => {
            // arrange
            const filtersManager: FiltersManager = TestBed.get(FiltersManager);
            const router: Router = TestBed.get(Router);
            const navigateSpy = spyOn(router, "navigate");

            let filters: IPpFilters = PpFilters.createEmptyModel();
            filters.pageSize = DEFAULT_PAGE_SIZE;
            filters.pageIndex = DEFAULT_PAGE_INDEX;
            filters.searchValue = "promo";
            filtersManager.filters = filters;

            // act
            component.promotionListManager.applyFilters();

            // assert
            const expectedParams = PpFilters.create(filters).toParams();
            expect(navigateSpy).toHaveBeenCalledWith([NavigationLinks.promotionsList], { queryParams: expectedParams });
        });

        it("should navigate to the correct url on page change", () => {
            // arrange
            const router: Router = TestBed.get(Router);
            const navigateSpy = spyOn(router, "navigate");
            const filtersManager: FiltersManager = TestBed.get(FiltersManager);

            let filters: IPpFilters = PpFilters.createEmptyModel();
            filters.pageSize = DEFAULT_PAGE_SIZE;
            filters.pageIndex = DEFAULT_PAGE_INDEX;
            filters.searchValue = "promo";
            filtersManager.filters = { ...filters };

            // act
            let pageChangeEvent: PageEvent = {
                pageSize: 20,
                pageIndex: 2,
                previousPageIndex: 1,
                length: 123
            };
            component.onPageChange(pageChangeEvent);

            // assert
            filters.pageSize = 20;
            filters.pageIndex = 2;
            const expectedParams: Params = PpFilters.create(filters).toParams();
            expect(navigateSpy).toHaveBeenCalledWith([NavigationLinks.promotionsList], { queryParams: expectedParams });
        });
    });

    describe("table Columns", () => {
        it("should be fetch on ngOnInit", () => {
            //arrange
            const getTableColumnsSpy = spyOn(component.promotionTableColumnManager, "getTableColumns");
            //act
            component.ngOnInit();

            //assert
            expect(getTableColumnsSpy).toHaveBeenCalled();
        });
        it("should display correct column header", () => {
            //arrange
            let header = 'Test';
            //act
            let componentHeader = component.promotionTableColumnManager.getColumnHeaderName('test');
            //assert
            expect(header).toEqual(componentHeader);
        })
    })

    describe("onDestroy", () => {
        it("should destroy promotion list manager and promotion table column manager", () => {
            // arrange
            const promotionListDestoySpy = spyOn(component.promotionListManager, "destroy");
            const promotionTableColumnManagerDestroySpy = spyOn(component.promotionTableColumnManager, "destroy");
            component.ngOnInit();

            // act
            component.ngOnDestroy();

            // assert
            expect(promotionListDestoySpy).toHaveBeenCalled();
            expect(promotionTableColumnManagerDestroySpy).toHaveBeenCalled();
        });
    });
});