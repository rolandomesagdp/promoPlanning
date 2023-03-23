import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, IPpFilters, PpFilters } from "@app/pp-filters/filters";
import { IPromotion, PromoAttribute, PromotionService } from "@app/promotion-common";
import { PromotionLockService, PromotionLockType } from "@app/promotion-lock";
import { PromotionLock } from "@app/promotion-lock/promotion-lock-model";
import { PromotionListManager } from "@app/promotion-common/promotion/promotion-list-manager";
import { UserAccountService } from "@pp-core/auth/user";
import { LogService } from "@pp-core/logging";
import { SnackbarService } from "@pp-core/snackbar";
import { ConfirmationDialogService } from "@shared/components/confirmation-dialog";
import { NavigationLinks } from "@app/navigation";

export class LockManagerSpecSetup {
    promotionService: PromotionService;
    logService: LogService;
    snackbarService: SnackbarService;
    promotionLockService: PromotionLockService;
    userAccountService: UserAccountService;
    confirmationDialogService: ConfirmationDialogService;

    constructor() { }

    buildLockManager(): PromotionListManager<IPromotion> {
        return new PromotionListManager(
            this.promotionService, 
            this.logService,
            null,
            null, 
            null,
            this.snackbarService,
            false, 
            this.promotionLockService, 
            this.userAccountService, 
            this.confirmationDialogService,
            NavigationLinks.promotionsList);
    }

    getPromotionLockModel(): PromotionLock {
        return {
            promotionId: "Promo1",
            lockType: PromotionLockType.locked,
            message: "Locking promotion",
            lockedBy: "system",
            lockStart: new Date()
        } 
    }

    getPromotions(): IPromotion[] {
        const promotions: IPromotion[] = [{
            promoId: "Promo1",
            name: "First Promo",
            description: "First Promo description",
            imageUrl: "",
            status: 1,
            campaignId: "Campaign1",
            sellInStartDate: "2021/10/11",
            sellInEndDate: "2021/10/15",
            sellOutStartDate: "2021/10/11",
            sellOutEndDate: "2021/10/15",
            promoTypeId: 1,
            isPastPromotion: false,
            forecast: 20,
            uplift: 20,
            upliftPercent: 0,
            isLocked: false,
            lockedUser: "system",
            lockStartTime: new Date(),
            promoAttributes: this.getPromoAttributes(),
            flags: []
        }, {
            promoId: "Promo2",
            name: "Second Promo",
            description: "Second Promo description",
            imageUrl: "",
            status: 1,
            campaignId: "Campaign2",
            sellInStartDate: "2021/10/11",
            sellInEndDate: "2021/10/15",
            sellOutStartDate: "2021/10/11",
            sellOutEndDate: "2021/10/15",
            promoTypeId: 1,
            isPastPromotion: false,
            forecast: 20,
            uplift: 20,
            upliftPercent: 0,
            isLocked: false,
            lockedUser: "system",
            lockStartTime: new Date(),
            promoAttributes: this.getPromoAttributes(),
            flags: []
        }, {
            promoId: "Promo3",
            name: "Third Promo",
            description: "Third Promo description",
            imageUrl: "",
            status: 1,
            campaignId: "Campaign3",
            sellInStartDate: "2021/10/11",
            sellInEndDate: "2021/10/15",
            sellOutStartDate: "2021/10/11",
            sellOutEndDate: "2021/10/15",
            promoTypeId: 1,
            isPastPromotion: false,
            forecast: 20,
            uplift: 20,
            upliftPercent: 0,
            isLocked: false,
            lockedUser: "system",
            lockStartTime: new Date(),
            promoAttributes: this.getPromoAttributes(),
            flags: []
        }];
        return promotions;
    }

    getPromotionsCount(): number {
        return 3;
    }

    getPromotionFilters(): IPpFilters {
        let filters: IPpFilters = PpFilters.createEmptyModel();
        filters.pageIndex = DEFAULT_PAGE_INDEX;
        filters.pageSize = DEFAULT_PAGE_SIZE;
        return filters;
    }

    private getPromoAttributes(): PromoAttribute[] {
        return [{
            promoId: "Promo1",
            attributeId: 1,
            value: "Value 1",
            promoTypeId: 1
        }]
    }
}