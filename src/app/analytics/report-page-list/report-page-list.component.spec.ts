import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { BoxComponent, BoxModule } from "@shared/components/box";
import { PromoPlanningSpinnerModule } from "@shared/components/spinner";
import { PpAngularMaterialModule } from "@shared/pp-angular-material";
import { ReportPageListComponent } from ".";
import { AnalyticsService } from "../analytics-services";
import { ReportPageListComponetSpecSetUp } from "./report-page-list.component.specsetup";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { LogService } from "@pp-core/logging";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("ReportPageListComponent", () => {
    const spectSetUp: ReportPageListComponetSpecSetUp = new ReportPageListComponetSpecSetUp();
    let routerMock, analyticsServiceMock, loggerMock;

    let fixture: ComponentFixture<ReportPageListComponent>;
    let component: ReportPageListComponent;

    beforeEach(() => {
        routerMock = jasmine.createSpyObj(["navigate"]);
        analyticsServiceMock = jasmine.createSpyObj(["getAllPages"]);
        analyticsServiceMock.getAllPages.and.returnValue(of(null))
        loggerMock = jasmine.createSpyObj(["debug"]);

        TestBed.configureTestingModule({
            declarations: [ ReportPageListComponent ],
            imports: [ 
                BrowserAnimationsModule, 
                PpAngularMaterialModule, 
                BoxModule, 
                PromoPlanningSpinnerModule,
                HttpClientTestingModule ],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: AnalyticsService, useValue: analyticsServiceMock },
                { provide: LogService, useValue: loggerMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ReportPageListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    })

    describe("buildBoxModel()", () => {
        it("should build correct BoxModel from an external ReportPage", () => {
            // arrage
            const externalReportPage = spectSetUp.createExternalReportPage();

            // act
            const externalBoxModel = component.buildBoxModel(externalReportPage);
            
            // assert
            expect(externalBoxModel).toEqual(spectSetUp.createExternalReportPageBoxModel());
        });

        it("should build correct BoxModel from an internal ReportPage", () => {
            // arrage
            const internalReportPage = spectSetUp.createInternalReportPage();

            // act
            const internalBoxModel = component.buildBoxModel(internalReportPage);
            
            // assert
            expect(internalBoxModel).toEqual(spectSetUp.createInternalReportPageBoxModel());
        });
    });

    describe("navigateToReportsPage()", () => {
        it("should navigate to the correct internal report page", () => {
            // arrange
            const internalReportPage = spectSetUp.createInternalReportPage();

            // act
            component.navigateToReportsPage(internalReportPage);

            // assert
            const internalReportPageRoute = [`analytics/report-page/${internalReportPage.id}`];
            expect(routerMock.navigate).toHaveBeenCalledOnceWith(internalReportPageRoute);
        });

        it("should navigat to the correct external report page", () => {
            // arrange
            const windowsSpy = spyOn(window, "open");
            const externalReportPage = spectSetUp.createExternalReportPage();
            
            // act
            component.navigateToReportsPage(externalReportPage);

            // assert
            expect(windowsSpy).toHaveBeenCalledOnceWith(externalReportPage.externalLink, "_blank");
        });
    });

    describe("Titles", () => {
        it("should print the correct title", () => {
            // assert
            const title = fixture.debugElement.query(By.css("#title")).nativeElement.textContent;

            expect(title).toEqual(component.title);
        });

        it("should print the correct subtitle", () => {
            // assert
            const title = fixture.debugElement.query(By.css("#subtitle")).nativeElement.textContent;

            expect(title).toEqual(component.subtitle);
        });
    });

    describe("Report pages print", () => {
        it("should print correct amount of report pages", () => {
            // arrange
            const reportPages = spectSetUp.createReportPageArray();
            analyticsServiceMock.getAllPages.and.returnValue(of(reportPages));
            
            // act
            fixture = TestBed.createComponent(ReportPageListComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            // assert
            const reportPageBoxesLength = fixture.debugElement.queryAll(By.directive(BoxComponent)).length;
            expect(reportPageBoxesLength).toEqual(reportPages.length);
        });
    });
});
