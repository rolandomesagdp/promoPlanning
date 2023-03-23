export interface IPromotionBase {
    promoId: string;
    isLocked: boolean;
	lockedUser: string;
	lockStartTime: Date;
}