import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { By } from '@angular/platform-browser';
import { PromotionPermissionsManager, PromotionSummaryService } from '@app/promotion-common';
import { PromotionSimulationService } from '@app/promotion-common/promotion-simulation';
import { PromotionSimulatorComponent } from '@app/promotion-common/promotion-simulation/promotion-simulator/promotion-simulator.component';
import { PromotionSummaryComponent } from '@app/promotion-common/promotion-summary';
import { UnitsOfMeasurement, UnitsOfMeasurementService } from '@pp-core/units-of-measurement';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { of } from 'rxjs';

import { PromotionDetailsLeftPannelComponent } from './promotion-details-left-pannel.component';
import { LeftPannelSpecSetup } from './promotion-details-left-pannel.component.specsetup';

describe('PromotionDetailsLeftPannelComponent', () => {
    const specSetup: LeftPannelSpecSetup = new LeftPannelSpecSetup();
    let component: PromotionDetailsLeftPannelComponent;
    let fixture: ComponentFixture<PromotionDetailsLeftPannelComponent>;
    let loader: HarnessLoader;

    let promotionSummaryServiceMock;
    let uomServiceMock;
    let simulationServiceMock;
    let promotionPermissionsMock;
    let snackBarMock;

    beforeEach(async () => {
        
        promotionSummaryServiceMock = jasmine.createSpyObj("promotionSummaryServiceMock", ["getById"]);
        uomServiceMock = jasmine.createSpyObj("uomServiceMock", ["loadUnitsOfMeasurement"], {
            selectedUnitOfMeasurement: specSetup.unitOfMeasurement
        });
        snackBarMock = jasmine.createSpyObj("snackBarMock", ["openSuccess", "openError"]);
        simulationServiceMock = jasmine.createSpyObj("simulationServiceMock", ["runSimulation", "saveSimulation", "endSimulation"], {
            simulationIsActive: true,
            snackBar: snackBarMock
        });
        simulationServiceMock.runSimulation.and.returnValue(of(specSetup.simulationResutl));
        simulationServiceMock.saveSimulation.and.returnValue(of(null));
        simulationServiceMock.endSimulation.and.returnValue(of(null));

        promotionPermissionsMock = jasmine.createSpyObj("promoitonPermissionsMock", ["simulationIsAllowed"]);
        promotionPermissionsMock.simulationIsAllowed.and.returnValue(true);

        await TestBed.configureTestingModule({
            imports: [PpAngularMaterialModule],
            declarations: [
                PromotionDetailsLeftPannelComponent,
                PromotionSimulatorComponent,
                PromotionSummaryComponent
            ],
            providers: [
                { provide: PromotionSummaryService, useValue: promotionSummaryServiceMock },
                { provide: UnitsOfMeasurementService, useValue: uomServiceMock },
                { provide: PromotionSimulationService, useValue: simulationServiceMock },
                { provide: PromotionPermissionsManager, useValue: promotionPermissionsMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionDetailsLeftPannelComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        component.promotionSummaryService.getById = (promotionId: string, uom: UnitsOfMeasurement) => {
            return of(specSetup.promotionSummaries.find(x => x.promoId === promotionId));
        }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("UI elements", () => {
        beforeEach(() => {
            component.promotionId = specSetup.promotionIdOne;
            component.ngOnChanges({
                promotionId: new SimpleChange(null, specSetup.promotionIdOne, true)
            });
            fixture.detectChanges();
        });
        describe("promotion summary", () => {
            it("should be printed if a promotion id is provided", () => {
                // assert
                const summaryElement = fixture.debugElement.query(By.directive(PromotionSummaryComponent));
                const promotionSummaryName = fixture.debugElement.query(By.css("#promotion-summary-name")).nativeElement.innerText;
                const expectedSummary = specSetup.promotionSummaries.find(x => x.promoId === specSetup.promotionIdOne);
                expect(summaryElement).toBeTruthy();
                expect(promotionSummaryName).toEqual(expectedSummary.promoName);
            });

            it("should re-render if the promotion id changes", () => {
                // act
                component.promotionId = specSetup.promotionIdTwo;
                component.ngOnChanges({
                    promotionId: new SimpleChange(null, specSetup.promotionIdTwo, false)
                });
                fixture.detectChanges();

                // assert
                // assert
                const summaryElement = fixture.debugElement.query(By.directive(PromotionSummaryComponent));
                const promotionSummaryName = fixture.debugElement.query(By.css("#promotion-summary-name")).nativeElement.innerText;
                const expectedSummary = specSetup.promotionSummaries.find(x => x.promoId === specSetup.promotionIdTwo);
                expect(summaryElement).toBeTruthy();
                expect(promotionSummaryName).toEqual(expectedSummary.promoName);
            });
        });

        describe("promotion simulator", () => {
            it("should print on first load", () => {
                // assert
                const simulatorElement = fixture.debugElement.query(By.directive(PromotionSimulatorComponent));
                expect(simulatorElement).toBeTruthy();
            });

            it("should reload the summary on simulation accepted", async () => {
                // arrange
                const loadSummarySpy = spyOn(component, "loadPromotionSummary");
                const simulationButton = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
                await simulationButton.click();

                // act
                const acceptSimulationButton = await loader.getHarness(MatButtonHarness.with({ selector: '#accept-simulation-button'}));
                await acceptSimulationButton.click();
                fixture.detectChanges();
                
                // assert
                
                expect(loadSummarySpy).toHaveBeenCalled();
            });
        });
    });
});
