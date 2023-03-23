import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPromotionStatus } from '../promotion-status.model';
import { PromotionStatusService } from '../promotion-status.service';
import { PromotionStatusChipInputs } from './promotion-status-chip-input.enum';

import { PromotionStatusChipComponent } from './promotion-status-chip.component';

describe('PromotionStatusChipComponent', () => {
    const noStatusText: string = "No status";
    const noStatusColor: string = "#D92D20";
    const noStatusTooltip: string = "Either the provided status does not exists or there is no status available.";
    const status: IPromotionStatus[] = [
        { sequence: 1, statusId: 1, statusValue: "Active", isScoring: true, color: "#FF5733" },
        { sequence: 2, statusId: 2, statusValue: "Cancelled", isScoring: true, color: "#333BFF" },
    ];
    let component: PromotionStatusChipComponent;
    let fixture: ComponentFixture<PromotionStatusChipComponent>;
    let promoStatusServiceMock = jasmine.createSpyObj("promoStatusServiceMock", ["loadPromotionStatus"], {
        promotionStatus: status
    })

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PromotionStatusChipComponent],
            providers: [{ provide: PromotionStatusService, useValue: promoStatusServiceMock }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionStatusChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should set chipText, color and tooltip on init", () => {
        expect(component.chipText).toBeTruthy();
        expect(component.chipColor).toBeTruthy();
        expect(component.chipTooltip).toBeTruthy();
    });

    describe("provided component input", () => {
        it("should be set to promotionStatus if promotion status object is provided as input", () => {
            // act
            component.status = {...status[0]};

            // assert
            expect(component.providedInputType).toEqual(PromotionStatusChipInputs.promotionStatus);
        });

        it("should be set to promotionStatusId if promotion status id is provided as input", () => {
            // act
            component.statusId = 1;

            // assert
            expect(component.providedInputType).toEqual(PromotionStatusChipInputs.promotionStatusId);
        });

        it("should be set to promotionStatusValue if promotion status value is provided as input", () => {
            // act
            component.statusValue = "Cancelled";

            // assert
            expect(component.providedInputType).toEqual(PromotionStatusChipInputs.promotionStatusValue);
        });

        it("should be set to none if no input is provided", () => {
            // assert
            expect(component.providedInputType).toEqual(PromotionStatusChipInputs.none);
        });
    });

    describe("status chip properties (text, color and tooltip)", () => {
        it("should be correctly set based on PromotionStatus input", () => {
            // arrange
            const statusInput: IPromotionStatus = {...status[0]};
            component.status = statusInput

            // act
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual(statusInput.statusValue);
            expect(component.chipColor).toEqual(statusInput.color);
            expect(component.chipTooltip).toContain(statusInput.statusValue);
        });

        it("should be correctly set based on Promotion status value input", () => {
            // arrange
            const statusInput: IPromotionStatus = {...status[0]};
            component.statusValue = statusInput.statusValue;

            // act
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual(statusInput.statusValue);
            expect(component.chipColor).toEqual(statusInput.color);
            expect(component.chipTooltip).toContain(statusInput.statusValue);
        });

        it("should display 'No status' with error background color and informative tooltip on invalid status value input", () => {
            // arrange
            component.statusValue = "Invalid status value";

            // act
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual(noStatusText);
            expect(component.chipColor).toEqual(noStatusColor);
            expect(component.chipTooltip).toEqual(noStatusTooltip);
        });

        it("should be correctly set based on Promotion status id input", () => {
            // arrange
            const statusInput: IPromotionStatus = {...status[0]};
            component.statusId = statusInput.statusId;

            // act
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual(statusInput.statusValue);
            expect(component.chipColor).toEqual(statusInput.color);
            expect(component.chipTooltip).toContain(statusInput.statusValue);
        });

        it("should display 'No status' with error background color and informative tooltip on invalid status id input", () => {
            // arrange
            component.statusId = 5;

            // act
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual(noStatusText);
            expect(component.chipColor).toEqual(noStatusColor);
            expect(component.chipTooltip).toEqual(noStatusTooltip);
        });

        it("should display 'No status' with error background color and informative tooltip on no input provided", () => {
            // assert
            expect(component.chipText).toEqual(noStatusText);
            expect(component.chipColor).toEqual(noStatusColor);
            expect(component.chipTooltip).toEqual(noStatusTooltip);
        });
    });
});
