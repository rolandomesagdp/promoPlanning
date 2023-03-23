import { FormGroup } from "@angular/forms";
import { IPromotionSummary } from "./promotion-summary.model";
import { IPromotion } from "./promotion.model";

export class PromotionFactory {
    private _promotion: IPromotion = null;

    get promotion(): IPromotion {
        return this._promotion;
    }

    private constructor(promotion: IPromotion) {
        this._promotion = promotion;
     }

    static createFromSummary(promotionSummary: IPromotionSummary): PromotionFactory {
        const promotion: IPromotion = {
            promoId: promotionSummary.promoId,
            name: promotionSummary.promoName,
            description: promotionSummary.description,
            imageUrl: promotionSummary.imageUrl,
            status: +promotionSummary.status,
            campaignId: "",
            sellInStartDate: promotionSummary.startDate,
            sellInEndDate: promotionSummary.endDate,
            sellOutStartDate: promotionSummary.startDate,
            sellOutEndDate: promotionSummary.endDate,
            promoTypeId: +promotionSummary.promoType,
            isPastPromotion: false,
            forecast: 0,
            uplift: promotionSummary.uplift,
            upliftPercent: promotionSummary.upliftPercent,
            isLocked: promotionSummary.isLocked,
            lockedUser: promotionSummary.lockedUser,
            lockStartTime: promotionSummary.lockStartTime,
            promoAttributes: [],
            flags: []
        }
        return new PromotionFactory(promotion);
    }

    static createFromForm(promotionForm: FormGroup): PromotionFactory {
        const promotionFormValue = promotionForm.value;
        const promotion: IPromotion = {
            promoId: promotionFormValue.promoId,
            name: promotionFormValue.name,
            description: promotionFormValue.description,
            imageUrl: "",
            status: +promotionFormValue.status,
            campaignId: promotionFormValue.campaignId,
            sellInStartDate: new Date(promotionFormValue.sellInStartDate).toLocaleDateString(),
            sellInEndDate: new Date(promotionFormValue.sellInEndDate).toLocaleDateString(),
            sellOutStartDate: new Date(promotionFormValue.sellOutStartDate).toLocaleDateString(),
            sellOutEndDate: new Date(promotionFormValue.sellOutEndDate).toLocaleDateString(),
            promoTypeId: +promotionFormValue.promoTypeId,
            isPastPromotion: false,
            forecast: 0,
            uplift: 0,
            upliftPercent: 0,
            isLocked: false,
            lockedUser: "",
            lockStartTime: null,
            promoAttributes: promotionFormValue.promoAttributes,
            flags: []
        }
        return new PromotionFactory(promotion);
    }
}