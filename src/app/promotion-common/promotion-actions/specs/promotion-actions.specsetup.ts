import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IPromotion } from "@app/promotion-common/promotion/promotion.model";

export class PromotionActionsComponentSpecSetup {
    get promotion(): IPromotion {
        return { promoId: "dummyPromoId", name: "dummyPromoName",
        description: "dummyPromoDescription", status: 1, campaignId: "dummyCampaignId", sellInStartDate: "OneDate", 
        sellInEndDate: "AnotherDate", sellOutStartDate: "JustAnotherDate", sellOutEndDate: "LastDummyDate", promoTypeId: 1,
        isPastPromotion: false, forecast: 12, uplift: 12, isLocked: false, lockedUser: "", lockStartTime: null,
        promoAttributes: [], flags: [], imageUrl: "", upliftPercent: 0 }
    }

    get promotionForm(): FormGroup {
        return new FormGroup({
            promoId: new FormControl(this.promotion.promoId, [Validators.required]),
            name: new FormControl(this.promotion.name, [Validators.required]),
            description: new FormControl(this.promotion.description),
            promoTypeId: new FormControl(this.promotion.promoTypeId),
            status: new FormControl(this.promotion.status, [Validators.required]),
            campaignId: new FormControl(this.promotion.campaignId),
            sellInStartDate: new FormControl(this.promotion.sellInStartDate, [Validators.required]),
            sellInEndDate: new FormControl(this.promotion.sellInEndDate, [Validators.required]),
            sellOutStartDate: new FormControl(this.promotion.sellOutStartDate, [Validators.required]),
            sellOutEndDate: new FormControl(this.promotion.sellOutEndDate, [Validators.required]),
            promoAttributes: new FormArray([])
        })
    }
}

export class PromotionPermissionsMock {

    constructor() { }
    
    userIsAdmin(): boolean {
        return true;
    }

    userCanRead(): boolean {
        return true;
    }

    userCanCopy(): boolean {
        return true;
    }

    userCanWrite(): boolean {
        return true;
    }

    userCanReadRoi(): boolean {
        return true;
    }

    userCanWriteUplift(): boolean {
        return true;
    }

    userCanDelete(): boolean {
        return true;
    }

    userCanUnlock(): boolean {
        return true;
    }

    userCanExport(): boolean {
        return true;
    }
}