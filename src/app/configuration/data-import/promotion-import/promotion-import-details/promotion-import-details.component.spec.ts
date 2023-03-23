import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

import { PromotionImportDetailsComponent } from './promotion-import-details.component';
import { PromotionImportDetailsComponentSpecSetup } from './promotion-import-details.component.specsetup';

describe('PromotionImportDetailsComponent', () => {
    const specSetup: PromotionImportDetailsComponentSpecSetup = new PromotionImportDetailsComponentSpecSetup();
    let component: PromotionImportDetailsComponent;
    let fixture: ComponentFixture<PromotionImportDetailsComponent>;
    let matDialogRefMock = jasmine.createSpyObj(["close"]);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PromotionImportDetailsComponent],
            imports: [PpAngularMaterialModule],
            providers: [
                { provide: MatDialogRef, useValue: matDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: specSetup.getImportTypeConfig() },
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionImportDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    describe("onInit", () => {
        it("should call buildDescriptionAndFormat function", () => {
            // arrange
            const buildDescriptionAndFormatSpy = spyOn(component, "buildDescriptionAndFormat");

            // act
            component.ngOnInit();

            // assert
            expect(buildDescriptionAndFormatSpy).toHaveBeenCalled();
        });
    });

    describe("buildDescriptionAndFormat", () => {
        it("should define the description and the format labels to be displayed", () => {
            // act
            component.buildDescriptionAndFormat();

            // assert
            expect(component.longDescription).toBeTruthy();
            expect(component.format).toBeTruthy();
        });
    });

    describe("buildAttributesCampaignDescriptionAndFormat", () => {
        it("should define the description and the format labels for table AttributesCampaign", () => {

            // act
            component.buildAttributesCampaignDescriptionAndFormat();

            // assert
            expect(component.longDescription).toEqual("Import of the attributes for the campaigns. It has dependencies with the Campaigns table.");
            expect(component.format).toEqual("[campaign_name], [attribute_name], [value], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]");
        });
    });

    describe("buildAttributesParticipantDescriptionAndFormat", () => {
        it("should define the description and the format labels for table AttributesParticipant", () => {
            
            // act
            component.buildAttributesParticipantDescriptionAndFormat();

            // assert
            expect(component.longDescription).toEqual("Import of the participant attributes. It has dependencies with the following tables: Promotions; Participants.");
            expect(component.format).toEqual("[promo_name], [promo_id], [product_id], [market_id], [attribute_name], [value], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]");
        });
    });

    describe("buildAttributesPromoDescriptionAndFormat", () => {
        it("should define the description and the format labels for table AttributesPromo", () => {

            // act
            component.buildAttributesPromoDescriptionAndFormat();

            // assert
            expect(component.longDescription).toEqual("Import of the promotional attributes. It has dependencies with the Promotions table.");
            expect(component.format).toEqual("[promo_name], [promo_id], [attribute_name], [value], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]");
        });
    });

    describe("buildCampaignsDescriptionAndFormat", () => {
        it("should define the description and the format labels for table Campaigns", () => {

            // act
            component.buildCampaignsDescriptionAndFormat();

            // assert
            expect(component.longDescription).toEqual("Import of campaign records.");
            expect(component.format).toEqual("[campaign_name], [description], [start_date], [end_date], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]");
        });
    });

    describe("buildPromoParticipantsDescriptionAndFormat", () => {
        it("should define the description and the format labels for table PromoParticipants", () => {

            // act
            component.buildPromoParticipantsDescriptionAndFormat();

            // assert
            expect(component.longDescription).toEqual("Import of the promotion participants together with its associated	forecast and/or demand (optional). It has dependencies with table Promotions.");
            expect(component.format).toEqual("[promo_name], [promo_id], [product_id], [market_id], [event_cluster], [co], [units_base], [units], [base_demand], [total_demand], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]");
        });
    });

    describe("buildPromotionsDescriptionAndFormat", () => {
        it("should define the description and the format labels for table Promotions", () => {

            // act
            component.buildPromotionsDescriptionAndFormat();

            // assert
            expect(component.longDescription).toEqual("Import of the promotions.");
            expect(component.format).toEqual("[promo_id], [promo_name], [description], [promo_type], [start_date_out], [end_date_out] ,[start_date_in], [end_date_in], [status], [campaign_name], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]");
        });
    });

    describe("closeDialog", () => {
        it("should close the dialog", () => {

            // act
            component.closeDialog();

            // assert
            expect(component.dialogRef.close).toHaveBeenCalled();
        });
    });

});
