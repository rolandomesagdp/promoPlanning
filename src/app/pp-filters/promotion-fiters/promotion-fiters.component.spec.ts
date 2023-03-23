import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStorageService } from '@pp-core/local-storage';
import { LogService } from '@pp-core/logging';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';
import { of } from 'rxjs';
import { FiltersManager, FiltersService } from '../filters';

import { PromotionFitersComponent } from './promotion-fiters.component';

describe('PromotionFitersComponent', () => {
    let toggleDrawerServiceMock, filtersServiceMock,
        loggerMock, localStorageMock, settingsManagerMock;
    let component: PromotionFitersComponent;
    let fixture: ComponentFixture<PromotionFitersComponent>;

    beforeEach(async () => {
        toggleDrawerServiceMock = jasmine.createSpyObj(["toggleDrawer"]);
        filtersServiceMock = jasmine.createSpyObj([
            "getCampaingSelectItems", 
            "getPromoTypeSelectItems",
            "getPromoStatusSelectItems",
            "getProductCategoriesSelectItems",
            "getMarketCategoriesSelectItems"
        ]);
        loggerMock = jasmine.createSpyObj(["debug"]);
        localStorageMock = jasmine.createSpyObj(["getPromotionFilters", "addPromotionFilters", "clear", "addPromotionFiltersAuthor"]);
        settingsManagerMock = jasmine.createSpyObj(["getLogLevel"]);
        await TestBed.configureTestingModule({
            declarations: [PromotionFitersComponent],
            imports: [HttpClientTestingModule],
            providers: [
                FiltersManager,
                { provide: ToggleDrawerService, useValue: toggleDrawerServiceMock },
                { provide: FiltersService, useValue: filtersServiceMock },
                { provide: LogService, userValue: loggerMock },
                { provide: LocalStorageService, useValue: localStorageMock },
                { provide: SettingsManager, useValue: settingsManagerMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        filtersServiceMock.getCampaingSelectItems.and.returnValue(of([]));
        filtersServiceMock.getPromoTypeSelectItems.and.returnValue(of([]));
        filtersServiceMock.getPromoStatusSelectItems.and.returnValue(of([]));
        filtersServiceMock.getProductCategoriesSelectItems.and.returnValue(of([]));
        filtersServiceMock.getMarketCategoriesSelectItems.and.returnValue(of([]));


        fixture = TestBed.createComponent(PromotionFitersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("Clear filters button", () => {
        it("should correctly clear the filters on click", () => {
            // arrange
            const filtersManagerClearSpy = spyOn(component.filtersManager, "clearFilters");
            component.filtersManager.filters.searchValue = "promo";

            // act
            component.clearFilters();

            // assert
            expect(filtersManagerClearSpy).toHaveBeenCalled();
        });

        it("should clear the stored default filters", () => {
            // arrange
            const clearDefaultFiltersSpy = spyOn(component.filtersManager, "clearDefaultFilters");
            component.filtersManager.filters.searchValue = "promo";

            // act
            component.clearFilters();

            // assert
            expect(clearDefaultFiltersSpy).toHaveBeenCalled();
        });

        it("should apply the filters after on click", () => {
            // arrange
            const applyFiltersSpy = spyOn(component, "applyFilters");
            component.filtersManager.filters.searchValue = "promo";

            // act
            component.clearFilters();

            // assert
            expect(applyFiltersSpy).toHaveBeenCalled();
        });
    });

    describe("Apply filters button", () => {
        it("should apply the filters on click", () => {
            // arrange
            const applyFiltersSpy = spyOn(component, "applyFilters");

            // act
            component.onApplyButtonClick();

            // assert
            expect(applyFiltersSpy).toHaveBeenCalled();
        });

        it("should store applied filters as default filters", () => {
            // arrange
            const saveCurrentDefaultFiltersSpy = spyOn(component.filtersManager, "saveCurrentFiltersAsDefault");

            // act
            component.onApplyButtonClick();

            // assert
            expect(saveCurrentDefaultFiltersSpy).toHaveBeenCalled();
        });
    });
    
    describe("onDestroy", () => {
        it("should clean the filters manager.", () => {
            // arrange
            const cleanFiltersManagerSpy = spyOn(component.filtersManager, "cleanFiltersManager");

            // act
            component.ngOnDestroy();

            // assert
            expect(cleanFiltersManagerSpy).toHaveBeenCalled();
        });
    });
});
