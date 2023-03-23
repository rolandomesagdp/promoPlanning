import { IPromotionSummary } from "@app/promotion-common/promotion/promotion-summary.model";
import { IPromotion } from "@app/promotion-common/promotion/promotion.model";
import { UnitOfMeasurement, UnitsOfMeasurement } from "@pp-core/units-of-measurement";
import { SimulationResult } from "../simulation-resutl.model";

export class PromotionSimulationSpecSetup {
    constructor() { }

    get promotion(): IPromotion {
        return {
            promoId: "dummyPromoId",
	        name: "Dummy Promo Name",
	        description: "Some description",
	        imageUrl: "some/url",
	        status: 1,
	        campaignId: "dummyCampaignId",
	        sellInStartDate: "23/23/23",
            sellInEndDate: "23/23/23",
	        sellOutStartDate: "23/23/23",
	        sellOutEndDate: "23/23/23",
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
        }
    }

    get promotionSummary(): IPromotionSummary {
        return {
            promoId: "dummyPromoId",
	        promoName: "Dummy Promo Name",
	        description: "Some description",
	        imageUrl: "some/url",
            promoType: "1",
	        status: "1",
            duration: "5",
	        startDate: "23/23/23",
            endDate: "23/23/23",
            participantsCount: 10,
            upliftPercent: 12,
	        uplift: 12,
            roi: 32,
	        isLocked: false,
	        lockedUser: "",
	        lockStartTime: null
        }
    }

    get unitOfMeasurement(): UnitOfMeasurement {
        return {
            id: UnitsOfMeasurement.Units,
            name: "Units"
        }
    }

    get simulationResutl(): SimulationResult {
        return {
            forecast: 20,
            upliftPercent: 30
        }
    }
}