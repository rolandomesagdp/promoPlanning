import { IPromotion, PromoAttribute } from "@app/promotion-common";
import { PpUser, UserType } from "@pp-core/auth/user";

export class PromotionListComponentSepcSetup {
    aDate: Date = new Date();

    constructor() { }

    getUser(): PpUser {
        return {
            userId: 1,
            userName: "someUserName",
            email: "some@email.com",
            firstName: "someFirstName",
            lastName: "someLastName",
            disabledPermissions: [],
            clientDisabledPermissions: "",
            disabledAttributes: [],
            userGroups: [],
            blacklistStatusIds: [],
            admin: true,
            userType: UserType.dataEntry,
            auth: {
                token: "",
                uuid: ""
            },
            canReadAllGroups: false
        }
    }

    getPromotions(): IPromotion[] {
        const promotions: IPromotion[] = [{
            promoId: "Promo1",
            name: "First Promo",
            description: "First Promo description",
            imageUrl: "",
            status: 1,
            campaignId: "Campaign1",
            sellInStartDate: "2021/10/11",
            sellInEndDate: "2021/10/15",
            sellOutStartDate: "2021/10/11",
            sellOutEndDate: "2021/10/15",
            promoTypeId: 1,
            isPastPromotion: false,
            forecast: 20,
            uplift: 20,
            upliftPercent: 0,
            isLocked: false,
            lockedUser: "system",
            lockStartTime: new Date(),
            promoAttributes: this.getPromoAttributes(),
            flags: []
        }, {
            promoId: "Promo2",
            name: "Second Promo",
            description: "Second Promo description",
            imageUrl: "",
            status: 1,
            campaignId: "Campaign2",
            sellInStartDate: "2021/10/11",
            sellInEndDate: "2021/10/15",
            sellOutStartDate: "2021/10/11",
            sellOutEndDate: "2021/10/15",
            promoTypeId: 1,
            isPastPromotion: false,
            forecast: 20,
            uplift: 20,
            upliftPercent: 0,
            isLocked: false,
            lockedUser: "system",
            lockStartTime: new Date(),
            promoAttributes: this.getPromoAttributes(),
            flags: []
        }, {
            promoId: "Promo3",
            name: "Third Promo",
            description: "Third Promo description",
            imageUrl: "",
            status: 1,
            campaignId: "Campaign3",
            sellInStartDate: "2021/10/11",
            sellInEndDate: "2021/10/15",
            sellOutStartDate: "2021/10/11",
            sellOutEndDate: "2021/10/15",
            promoTypeId: 1,
            isPastPromotion: false,
            forecast: 20,
            uplift: 20,
            upliftPercent: 0,
            isLocked: false,
            lockedUser: "system",
            lockStartTime: new Date(),
            promoAttributes: this.getPromoAttributes(),
            flags: []
        }];
        return promotions;
    }

    getPromotionsCount(): number {
        return 3;
    }

    private getPromoAttributes(): PromoAttribute[] {
        return [{
            promoId: "Promo1",
            attributeId: 1,
            value: "Value 1",
            promoTypeId: 1
        }]
    }
}