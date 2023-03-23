import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitsOfMeasurement, UnitsOfMeasurementService } from '@pp-core/units-of-measurement';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { of } from 'rxjs';
import { UnitOfMeasurementSelectorComponent } from '../unit-of-measurement-selector.component';
import { UnitOfMeasurementSelectorSpecSetUp } from './spec-setup';

describe('UnitOfMeasurementSelectorComponent', () => {
    let loader: HarnessLoader;
    const specSetup: UnitOfMeasurementSelectorSpecSetUp = new UnitOfMeasurementSelectorSpecSetUp();
    let uomSerciveMock;
    let component: UnitOfMeasurementSelectorComponent;
    let fixture: ComponentFixture<UnitOfMeasurementSelectorComponent>;

    beforeEach(async () => {
        uomSerciveMock = jasmine.createSpyObj("uomServiceMock", ["loadUnitsOfMeasurement", "getUnitOfMeasurementById"], {
            selectedUnitOfMeasurement: specSetup.defaultUnitOfMeasurement,
            availableUnitsOfMeasurement: specSetup.availableUnitsOfMeasurement
        });
        uomSerciveMock.loadUnitsOfMeasurement.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            declarations: [ UnitOfMeasurementSelectorComponent ],
            imports: [ ReactiveFormsModule, BrowserAnimationsModule, PpAngularMaterialModule ],
            providers: [
                { provide: UnitsOfMeasurementService, useValue: uomSerciveMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UnitOfMeasurementSelectorComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("Unit of measurement select", async () => {
        it("should be printed on the screen", async () => {
            // arrange
            const uomSelectHarness = await loader.getHarness(MatSelectHarness);

            // act
            expect(uomSelectHarness).toBeTruthy();
        });

        it("should print default selection on load", async () => {
            // arrange
            const uomSelectHarness = await loader.getHarness(MatSelectHarness);
            fixture.detectChanges();

            // assert
            const selectedOption = await uomSelectHarness.getValueText();
            expect(selectedOption).toEqual(component.unitsOfMeasurementService.selectedUnitOfMeasurement.name);
        });

        it("should print the correct options", async () => {
            // arrange
            const uomSelectHarness = await loader.getHarness(MatSelectHarness);

            // act
            await uomSelectHarness.open();
            const options = await uomSelectHarness.getOptions();

            // assert
            expect(options.length).toEqual(component.unitsOfMeasurementService.availableUnitsOfMeasurement.length);
        });

        it("should correctly change the selection on user interaction", async () => {
            // arrange
            const uomSelectHarness = await loader.getHarness(MatSelectHarness);
            component.unitsOfMeasurementService.getUnitOfMeasurementById = (id: UnitsOfMeasurement) => {
                return specSetup.availableUnitsOfMeasurement.find(x => x.id === id)
            }

            // act
            await uomSelectHarness.open();
            await uomSelectHarness.clickOptions({ text: `${specSetup.availableUnitsOfMeasurement[1].name}` });

            // assert
            expect(component.unitOfMeasurement.value).toEqual(UnitsOfMeasurement.UnitWeight);
        });
    })
});
