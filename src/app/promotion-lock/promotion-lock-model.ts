import { PromotionLockType } from "./promotion-lock-type.enum";

export interface PromotionLock {
	promotionId: string;
	lockType: PromotionLockType;
	message: string;
	lockedBy: string;
	lockStart: Date;
}