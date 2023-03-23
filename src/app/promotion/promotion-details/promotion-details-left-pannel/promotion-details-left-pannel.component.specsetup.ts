import { IPromotionSummary } from "@app/promotion-common/promotion"
import { SimulationResult } from "@app/promotion-common/promotion-simulation/simulation-resutl.model"
import { UnitOfMeasurement, UnitsOfMeasurement } from "@pp-core/units-of-measurement"

export class LeftPannelSpecSetup {
    constructor() { }

    get promotionIdOne(): string { return "summary1" };

    get promotionIdTwo(): string { return "summary2" };

    get promotionSummaries(): IPromotionSummary[] {
        return [{
            promoId: "summary1",
	        promoName: "Summary 1",
	        description: "Some description",
	        imageUrl: "assets/images/promotions/default-promotion-image.jpg",
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
        }, {
            promoId: "summary2",
	        promoName: "Summary 2",
	        description: "Some description",
	        imageUrl: "assets/images/promotions/default-promotion-image.jpg",
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
        }]
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