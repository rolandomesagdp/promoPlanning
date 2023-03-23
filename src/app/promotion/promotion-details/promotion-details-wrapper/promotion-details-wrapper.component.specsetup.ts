import { IPromotion } from "@app/promotion-common";

export class PromoDetailsWrapperSpecSetup {
    get promoIdOne(): string {
        return "idOne";
    }

    get promoIdTwo(): string {
        return "idTwo";
    }

    get promotions(): IPromotion[] {
        return [{
            promoId: "idOne",
            name: "Dummy Promo Name",
            description: "Some description",
            imageUrl: "some/url",
            status: 1,
            campaignId: "dummyCampaignId",
            sellInStartDate: new Date().toDateString(),
            sellInEndDate: new Date().toDateString(),
            sellOutStartDate: new Date().toDateString(),
            sellOutEndDate: new Date().toDateString(),
            promoTypeId: 1,
            isPastPromotion: false,
            forecast: 12,
            uplift: 12,
            upliftPercent: 12,
            isLocked: false,
            lockedUser: "",
            lockStartTime: null,
            promoAttributes: [],
            flags: []
        }, {
            promoId: "idTwo",
            name: "Dummy Promo Name",
            description: "Some description",
            imageUrl: "some/url",
            status: 1,
            campaignId: "dummyCampaignId",
            sellInStartDate: new Date().toDateString(),
            sellInEndDate: new Date().toDateString(),
            sellOutStartDate: new Date().toDateString(),
            sellOutEndDate: new Date().toDateString(),
            promoTypeId: 1,
            isPastPromotion: false,
            forecast: 12,
            uplift: 12,
            upliftPercent: 12,
            isLocked: false,
            lockedUser: "",
            lockStartTime: null,
            promoAttributes: [],
            flags: []
        }]
    }

    constructor() { }
}

export class PromotionPermissionsMock {
    promotion: IPromotion;

    constructor() { }
}