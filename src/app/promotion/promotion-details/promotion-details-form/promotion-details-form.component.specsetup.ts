import { ICampaign } from "@app/campaign/campaign.model";
import { IPromotionType } from "@app/promotion-type";

export class PromotionDetailsFormComponentSpecSetup {
    constructor() { }

    get availableCampaigns(): ICampaign[] {
        return [{
            campaignId: "1",
            name: "One",
            description: "One",
            startDate: "01/01/01",
            endDate: "01/01/01",
            units: 0,
            baseline: 0,
            value: 0,
            upliftCalculated: 0,
            upliftPercent: 0
        },{
            campaignId: "2",
            name: "Two",
            description: "Two",
            startDate: "01/01/01",
            endDate: "01/01/01",
            units: 0,
            baseline: 0,
            value: 0,
            upliftCalculated: 0,
            upliftPercent: 0
        },{
            campaignId: "3",
            name: "Three",
            description: "Three",
            startDate: "01/01/01",
            endDate: "01/01/01",
            units: 0,
            baseline: 0,
            value: 0,
            upliftCalculated: 0,
            upliftPercent: 0
        }]
    }

    get availablePromoTypes(): IPromotionType[] {
        return [{
            promotypeId: 1,
            name: "One",
            isPromoClustering: false
        },{
            promotypeId: 2,
            name: "Two",
            isPromoClustering: false
        },{
            promotypeId: 3,
            name: "Three",
            isPromoClustering: false
        }]
    }
}