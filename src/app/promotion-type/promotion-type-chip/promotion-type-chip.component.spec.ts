import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPromotionType } from '../promotion-type.model';
import { PromotionTypeService } from '../promotion-type.service';
import { PromotionTypeChipInputs } from './promotion-type-chip-inputs';

import { PromotionTypeChipComponent } from './promotion-type-chip.component';

describe('PromotionTypeChipComponent', () => {
    const promotionTypes: IPromotionType[] = [
        { promotypeId: 1, name: "Discount", isPromoClustering: true },
        { promotypeId: 2, name: "Multi-buy", isPromoClustering: true },
        { promotypeId: 1, name: "Discount", isPromoClustering: true }
    ];

    let component: PromotionTypeChipComponent;
    let fixture: ComponentFixture<PromotionTypeChipComponent>;
    let promoTypeServiceMock = jasmine.createSpyObj("promoTypeServiceMock", ["loadPromotionTypes"], {
        promotionTypes: [...promotionTypes]
    })

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PromotionTypeChipComponent],
            providers: [
                { provide: PromotionTypeService, useValue: promoTypeServiceMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionTypeChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("on init", () => {
        it("should set the chip text and tooltip", () => {
            // assert
            expect(component.chipText).toBeTruthy();
            expect(component.chipTooltip).toBeTruthy();
        });
    });

    describe("providedInputType", () => {
        it("should recognize promo type id input when provided", () => {
            // act
            component.promotionTypeId = 1;

            // assert
            expect(component.providedInputType).toEqual(PromotionTypeChipInputs.promotionTypeId);
        });

        it("should recognize promo type name input when provided", () => {
            // act
            component.promotionTypeName = "Discount";

            // assert
            expect(component.providedInputType).toEqual(PromotionTypeChipInputs.promotionTypeName);
        });

        it("should recognize promo type input when provided", () => {
            // act
            component.promotionType = promotionTypes[0];

            // assert
            expect(component.providedInputType).toEqual(PromotionTypeChipInputs.promotionType);
        });

        it("should recognize when no input is provided", () => {
            // assert
            expect(component.providedInputType).toEqual(PromotionTypeChipInputs.none);
        });
    });

    describe("chip text and tooltip", () => {
        it("should be correctly set up based on provided PromotionType", () => {
            // act
            component.promotionType = promotionTypes[0];
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual(promotionTypes[0].name);
            expect(component.chipTooltip).toContain(promotionTypes[0].name);
        });

        it("should be correctly set up based on provided PromotionType name", () => {
            // act
            component.promotionTypeName = promotionTypes[1].name;
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual(promotionTypes[1].name);
            expect(component.chipTooltip).toContain(promotionTypes[1].name);
        });

        it("should be correctly set up based on provided PromotionType id", () => {
            // act
            component.promotionTypeId = promotionTypes[2].promotypeId;
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual(promotionTypes[2].name);
            expect(component.chipTooltip).toContain(promotionTypes[2].name);
        });

        it("should display 'No Promotion Type available' message when no input is provided", () => {
            // act
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual("No Promotion Type");
            expect(component.chipTooltip).toEqual("Promotion Type not available.");
        });

        it("should display 'No Promotion Type available' message when an invalid promotionTypeId is provided", () => {
            // act
            component.promotionTypeId = 20;
            component.ngOnInit();

            // assert
            expect(component.chipText).toEqual("No Promotion Type");
            expect(component.chipTooltip).toEqual("Promotion Type not available.");
        });
    });
});
