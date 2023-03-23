import { IPromotionBase } from "./promotion-base";

export interface IPromotionSummary extends IPromotionBase {
    promoId: string;
	promoName: string;
	description: string;
	imageUrl: string;
	promoType: string;
	status: string;
	duration: string;
	startDate: string;
	endDate: string;
	participantsCount: number;
	upliftPercent: number;
	uplift: number;
	roi: number;
    isLocked: boolean;
	lockedUser: string;
	lockStartTime: Date;
}