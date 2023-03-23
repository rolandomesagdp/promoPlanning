import { Injectable } from "@angular/core";
import { UserAccountService } from "@pp-core/auth/user";
import { PpPermissions } from "@pp-core/permissions";
import { PromoSellDate } from "@pp-core/settings";
import { SettingsManager } from "@pp-core/settings/settings-manager";
import { IPromotion } from "../promotion/promotion.model";

@Injectable()
export class PromotionPermissionsManager {
    private permissions: PpPermissions = new PpPermissions();
    promotion: IPromotion;

    constructor(public userAccountService: UserAccountService, private settings: SettingsManager) { }

    userIsAdmin(): boolean {
        return this.userAccountService.currentUser.admin;
    }

    userCanRead(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.PROMOTION_VIEW);
    }

    userCanCopy(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.PROMOTION_TABLE_COPY);
    }

    userCanWrite(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.PROMOTION_WRITE);
    }

    userCanReadRoi(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.PROMOTION_ROI_READ);
    }

    userCanWriteUplift(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.PROMOTION_UPLIFT_WRITE);
    }

    userCanDelete(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.PROMOTION_DELETE);
    }

    userCanUnlock(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.DASHBOARD_UNLOCK_PROMOTION);
    }

    userCanExport(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.NEW_PROMOTION_EXPORT);
    }

    simulationIsAllowed(): boolean {
        return this.userAccountService.permissionManager.isAllowedPermission(this.permissions.NEW_PROMOTION_SIMULATE) 
        && this.userAccountService.userIsPlanner
        && this.promotion
        && this.promotion.promoTypeId !== null
        && this.promotion.promoTypeId !== 0
        && this.promotion.promoTypeId !== undefined
        && this.promotionIsInTheFuture();
    }

    private promotionIsInTheFuture(): boolean {
		const today: Date = new Date();
		const promoEndDate: Date = this.settings.promoSellDate === PromoSellDate.sellIn
			? new Date(this.promotion.sellInEndDate) : new Date(this.promotion.sellOutEndDate);
        const promotionIsInTheFuture = promoEndDate > today;
		return promotionIsInTheFuture;
	}
}