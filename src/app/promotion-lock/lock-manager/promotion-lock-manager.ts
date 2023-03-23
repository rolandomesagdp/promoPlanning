import { PromotionLock, PromotionLockService } from "@app/promotion-lock";
import { LockManager } from "@app/promotion-lock/lock-manager";
import { UserAccountService } from "@pp-core/auth/user";
import { SnackbarService } from "@pp-core/snackbar";
import { ConfirmationDialogService } from "@shared/components/confirmation-dialog";

export class PromotionLockManager extends LockManager {

    constructor(promotionLockService: PromotionLockService, userAccountService: UserAccountService, 
        confirmationService: ConfirmationDialogService, snackBarService: SnackbarService) {
        super(true, promotionLockService, userAccountService, confirmationService, snackBarService);
    }

    lock(promotionLock: PromotionLock): void {
        throw new Error("Method not implemented.");
    }

    unlock(promotionLock: PromotionLock): void {
        throw new Error("Method not implemented.");
    }

    forceUnlock(promotionLock: PromotionLock): void {
        throw new Error("Method not implemented.");
    }
}