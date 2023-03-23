import { PromoAttribute } from "../promotion-attributes/promotion-attribute.model";
import { PromotionFlag } from "../promotion-flag/promotion-flag";
import { IPromotionBase } from "./promotion-base";

export interface IPromotion extends IPromotionBase {
    promoId: string;
	name: string;
	description: string;
	imageUrl: string;
	status: number;
	campaignId: string;
	sellInStartDate: string;
	sellInEndDate: string;
	sellOutStartDate: string;
	sellOutEndDate: string;
	promoTypeId: number;
	isPastPromotion: boolean;
	forecast: number;
	uplift: number;
	upliftPercent: number;
	isLocked: boolean;
	lockedUser: string;
	lockStartTime: Date;
	promoAttributes: PromoAttribute[];
	flags: PromotionFlag[];
}