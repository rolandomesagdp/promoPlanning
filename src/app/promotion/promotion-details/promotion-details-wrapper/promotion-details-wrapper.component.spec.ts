import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromotionDetailsWrapperComponent } from './promotion-details-wrapper.component';
import { PromoDetailsWrapperSpecSetup } from './promotion-details-wrapper.component.specsetup';

describe('PromotionDetailsWrapperComponent', () => {
    const specSetup: PromoDetailsWrapperSpecSetup = new PromoDetailsWrapperSpecSetup();
    let component: PromotionDetailsWrapperComponent;
    let fixture: ComponentFixture<PromotionDetailsWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PromotionDetailsWrapperComponent],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionDetailsWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
