import { of } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromotionPermissionsManager } from '@app/promotion-common/promotion-permissions/promotion-permissions-manager';
import { PromotionSummaryService } from '@app/promotion-common/promotion-service/promotion-summary.service';
import { UnitsOfMeasurementService } from '@pp-core/units-of-measurement';
import { PromotionSimulationService } from '../promotion-simulation.service';
import { PromotionSimulatorComponent } from './promotion-simulator.component';
import { PromotionSimulationSpecSetup } from './promotion-simulation.specSetUp';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PromotionSummaryComponent } from '@app/promotion-common/promotion-summary/promotion-summary.component';
import { By } from '@angular/platform-browser';

describe('SimulationComponent', () => {
    const specSetUp: PromotionSimulationSpecSetup = new PromotionSimulationSpecSetup();
    let loader: HarnessLoader;
    let component: PromotionSimulatorComponent;
    let fixture: ComponentFixture<PromotionSimulatorComponent>;
    let summaryServiceMock;
    let uomServiceMock;
    let simulationServiceMock;
    let promoitonPermissionsMock;
    let snackbarMock;

    beforeEach(async () => {
        summaryServiceMock = jasmine.createSpyObj("summaryServiceMock", ["getById"]);
        summaryServiceMock.getById.and.returnValue(of(specSetUp.promotionSummary));

        uomServiceMock = jasmine.createSpyObj("uomServiceMock", ["loadUnitsOfMeasurement"], {
            selectedUnitOfMeasurement: specSetUp.unitOfMeasurement
        });

        snackbarMock = jasmine.createSpyObj("snackbarMock", ["openSuccess", "openError"]);

        simulationServiceMock = jasmine.createSpyObj("simulationServiceMock", ["runSimulation", "saveSimulation", "endSimulation"], {
            snackBar: snackbarMock
        });
        simulationServiceMock.runSimulation.and.returnValue(of(specSetUp.simulationResutl));
        simulationServiceMock.saveSimulation.and.returnValue(of(null));
        simulationServiceMock.endSimulation.and.returnValue(of(null));

        promoitonPermissionsMock = jasmine.createSpyObj("promoitonPermissionsMock", ["simulationIsAllowed"]);

        await TestBed.configureTestingModule({
            imports: [
                PpAngularMaterialModule,
            ],
            declarations: [
                PromotionSimulatorComponent,
                PromotionSummaryComponent
            ],
            providers: [
                { provide: PromotionSummaryService, useValue: summaryServiceMock },
                { provide: UnitsOfMeasurementService, useValue: uomServiceMock },
                { provide: PromotionSimulationService, useValue: simulationServiceMock },
                { provide: PromotionPermissionsManager, useValue: promoitonPermissionsMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionSimulatorComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        component.promotion = specSetUp.promotion;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("simulation", async () => {
        describe("allowed", async () => {
            beforeEach(async () => {
                component.promotionPermissions.simulationIsAllowed = () => {
                    return true;
                }

                fixture.detectChanges();
            });

            it("should print simulation card on first load", async () => {
                // assert
                const simulationCardHarness = await loader.getHarness(MatCardHarness);
                const cardTitle = await simulationCardHarness.getTitleText();
                expect(cardTitle).toEqual("Simulate");
            });

            describe("button", async () => {
                it("should be provided", async () => {
                    // assert
                    const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
                    expect(simulationButtonHarness).toBeTruthy();
                });

                it("should be disabled if simulation is running", async () => {
                    // act
                    component.simulating = true;
                    fixture.detectChanges();

                    // assert
                    const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
                    expect(await simulationButtonHarness.isDisabled()).toBeTrue();
                });

                it("should trigger the simulation process on clicked", async () => {
                    // arrange
                    const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));

                    // act
                    await simulationButtonHarness.click();

                    // assert
                    expect(simulationServiceMock.runSimulation).toHaveBeenCalled();
                });
            });

            describe("run", async () => {
                describe("success path", async () => {
                    it("should display a promotion summary at the end of a successfull simulation", async () => {
                        // arrange
                        const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
    
                        // act
                        await simulationButtonHarness.click();
    
                        // assert
                        const summaryComponent = fixture.debugElement.query(By.directive(PromotionSummaryComponent));
                        
                        expect(summaryComponent).toBeTruthy();
                    });
    
                    it("should show the promotion summary with the uplift percent returned by the simulation", async () => {
                       // arrange
                       const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
    
                       // act
                       await simulationButtonHarness.click();
    
                       // assert  
                       const expectedUpliftPercent = specSetUp.simulationResutl.upliftPercent;                 
                       expect(component.promotionSummary.upliftPercent).toBeTruthy(expectedUpliftPercent);
                    });
    
                    it("should display accept and reject buttons after simulation", async () => {
                        // arrange
                        const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
    
                        // act
                        await simulationButtonHarness.click();
    
                        // assert
                        const acceptSimulationButton = await loader.getHarness(MatButtonHarness.with({ selector: '#accept-simulation-button'}));
                        const rejectSimulationButton = await loader.getHarness(MatButtonHarness.with({ selector: '#reject-simulation-button'}));
    
                        expect(acceptSimulationButton).toBeTruthy();
                        expect(rejectSimulationButton).toBeTruthy();
                    });

                    describe("accept simulation", async () => {
                        it("should save the simulation result on click", async () => {
                            // arrange
                            const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
                            await simulationButtonHarness.click();

                            // act
                            const acceptSimulationButton = await loader.getHarness(MatButtonHarness.with({ selector: '#accept-simulation-button'}));
                            await acceptSimulationButton.click();

                            // assert
                            expect(component.simulationService.saveSimulation).toHaveBeenCalled();
                        });
                        
                        it("should end the simulation process on click", async () => {
                            // arrange
                            const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
                            await simulationButtonHarness.click();

                            // act
                            const acceptSimulationButton = await loader.getHarness(MatButtonHarness.with({ selector: '#accept-simulation-button'}));
                            await acceptSimulationButton.click();

                            // assert
                            expect(component.simulationService.endSimulation).toHaveBeenCalled();
                        });
                    });

                    describe("reject simulation", async () => {
                        it("should end the simulation process on click", async () => {
                            // arrange
                            const simulationButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#run-simulation-button'}));
                            await simulationButtonHarness.click();

                            // act
                            const rejectSimulationButton = await loader.getHarness(MatButtonHarness.with({ selector: '#reject-simulation-button'}));
                            await rejectSimulationButton.click();

                            // assert
                            expect(component.simulationService.saveSimulation).toHaveBeenCalled();
                        });
                    });
                });
            });
        });

        describe("not allowed", async () => {
            beforeEach(async () => {
                component.promotionPermissions.simulationIsAllowed = () => {
                    return false;
                }

                fixture.detectChanges();
            });

            it("should print a 'not allowed' simulation card", async () => {
                // assert
                const simulationCardHarness = await loader.getHarness(MatCardHarness);
                const cardTitle = await simulationCardHarness.getTitleText();
                expect(cardTitle).toEqual("Simulation not allowed");
            });

            it("should not provide action buttons: no action is allowed", async () => {
                // assert
                const actionButtons = await loader.getAllHarnesses(MatButtonHarness);
                expect(actionButtons.length).toEqual(0);
            });
        });
    });
});

