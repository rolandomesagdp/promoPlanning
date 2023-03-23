import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignService } from '@app/campaign/campaign.service';
import { PromotionFormService } from '@app/promotion-common/promotion-form/promotion-form.service';
import { PromotionStatusService } from '@app/promotion-status';
import { PromotionTypeService } from '@app/promotion-type';
import { EnvironmentService } from '@pp-core/environment';
import { LocalStorageService } from '@pp-core/local-storage';
import { PromoSellDate } from '@pp-core/settings/promo-sell-date.enum';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { PromotionDetailsFormComponent } from './promotion-details-form.component';
import { PromotionDetailsFormComponentSpecSetup } from './promotion-details-form.component.specsetup';

describe('PromotionDetailsFormComponent', () => {
    let specSetup = new PromotionDetailsFormComponentSpecSetup();
    let component: PromotionDetailsFormComponent;
    let fixture: ComponentFixture<PromotionDetailsFormComponent>;
    let settingsManagerMock;
    let environmentServiceMock;
    let campaignServiceMock;
    let promoTypeServiceMock;
    let localStorageServiceMock;
    let promoStatusServiceMock;

    beforeEach(async () => {
        settingsManagerMock = jasmine.createSpyObj("settingsManagerMock", ["loadAppSettings"], {
            promoSellDate: PromoSellDate.sellIn
        });
        environmentServiceMock = jasmine.createSpyObj("environmentServiceMock", ["getEnvironment"]);
        environmentServiceMock.getEnvironment.and.returnValue({
            serverUrl: "someUrl",
            production: false,
            local_id: "eg-ing"
        });
        localStorageServiceMock = jasmine.createSpyObj("localStorageServiceMock", ["getSettings", "addSettings"]);
        campaignServiceMock = jasmine.createSpyObj("campaignServiceMock", ["loadCampaigns"], {
            campaigns: specSetup.availableCampaigns
        });
        promoTypeServiceMock = jasmine.createSpyObj("promoTypeServiceMock", ["loadPromoTypes"], {
            promotionTypes: specSetup.availablePromoTypes
        });
        promoStatusServiceMock = jasmine.createSpyObj("promoStatusServiceMock", ["loadPromotionStatus"], {
            promotionStatus: []
        });

        await TestBed.configureTestingModule({
            imports: [ 
                ReactiveFormsModule,
                HttpClientTestingModule
             ],
            declarations: [PromotionDetailsFormComponent],
            providers: [
                PromotionFormService,
                { provide: SettingsManager, usevalue: settingsManagerMock },
                { provide: CampaignService, useValue: campaignServiceMock },
                { provide: PromotionTypeService, useValue: promoTypeServiceMock },
                { provide: LocalStorageService, useValue: localStorageServiceMock },
                { provide: EnvironmentService, useValue: environmentServiceMock },
                { provide: PromotionStatusService, useValue: promoStatusServiceMock }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionDetailsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
