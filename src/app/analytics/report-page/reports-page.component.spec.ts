import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { BackButtonModule } from "@shared/components/back-button";
import { DrawerCardModule } from "@shared/components/drawer-card";
import { PromoPlanningSpinnerModule } from "@shared/components/spinner";
import { PpDevextremeModule } from "@shared/pp-devextreme";
import { AnalyticsService } from "../analytics-services";
import { BarChartComponent } from "../charts/bar-chart/bar-chart.component";
import { ChartHostDirective } from "../charts/chart-host.directive";
import { ChartWrapperComponent } from "../charts/chart-wrapper/chart-wrapper.component";
import { PieChartComponent } from "../charts/pie-chart/pie-chart.component";
import { FiltersManager, FiltersService } from "../../pp-filters/filters";
import { ReportPageComponentSepSetup, ReportPageRouteMock } from "./reports-page.component.specSetup";
import { ReportPageComponent } from "./reports-page.component";
import { AnalyticsFiltersComponent } from "@app/pp-filters/analytics-filters";
import { LocalStorageService } from "@pp-core/local-storage";
import { LogService } from "@pp-core/logging";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('ReportPageComponent', () => {
    const setUp: ReportPageComponentSepSetup = new ReportPageComponentSepSetup();
    let routeMock, routerMock, analyticsServiceMock, loggerMock, 
    filtersManager, localStorageMock, filtersServiceMock;
    let component: ReportPageComponent;
    let fixture: ComponentFixture<ReportPageComponent>;

    beforeEach(() => {
        filtersManager = jasmine.createSpyObj(["applyFilters", ["filters"]]);
        filtersServiceMock = jasmine
        .createSpyObj([
        "getCampaingSelectItems", 
        "getPromoTypeSelectItems", 
        "getPromoTypeSO99SelectItems",
        "getPromoStatusSelectItems",
        "getPromoAttributeFilterSelectItems",
        "getProductCategoriesSelectItems",
        "getMarketCategoriesSelectItems"
        ])
        routeMock = new ReportPageRouteMock();
        routerMock = jasmine.createSpyObj(["navigate"]);
        analyticsServiceMock = jasmine.createSpyObj(["getChartsByPage", "getReportPageById"]);
        loggerMock = jasmine.createSpyObj(["debug"]);
        localStorageMock = jasmine.createSpyObj(["getPromotionFilters", "addPromotionFilters", "clear"])

        TestBed.configureTestingModule({
            declarations: [ 
                ReportPageComponent,
                AnalyticsFiltersComponent,
                ChartWrapperComponent,
                ChartHostDirective,
                BarChartComponent, 
                PieChartComponent
            ],
            imports: [
                BrowserAnimationsModule,
                PpDevextremeModule,
                DrawerCardModule,
                BackButtonModule,
                PromoPlanningSpinnerModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: FiltersService, useValue: filtersServiceMock },
                { provide: FiltersManager, useValue: filtersManager },
                { provide: AnalyticsService, useValue: analyticsServiceMock },
                { provide: LogService, useValue: loggerMock },
                { provide: ActivatedRoute, useValue: routeMock },
                { provide: Router, useValue: routerMock },
                { provide: LocalStorageService, useValue: localStorageMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportPageComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("getChartContainerClass()", () => {
        it("should return 'full-width-chart-container' if is full screen chart", () => {
            // arrange
            const fullScreenChart = setUp.getFullScreenChart();

            // act
            const chartContainerClass = component.getChartContainerCssClass(fullScreenChart.printFullScreen);

            // assert
            expect(chartContainerClass).toEqual("full-width-chart-container");
        });

        it("should return 'half-width-chart-container' if is half screen chart", () => {
            // arrange
            const halfScreenChart = setUp.getHalfScreenChart();

            // act
            const chartContainerClass = component.getChartContainerCssClass(halfScreenChart.printFullScreen);

            // assert
            expect(chartContainerClass).toEqual("half-width-chart-container");
        });
    });
});