import { CalendarTasksService, CalendarTaskType, PpCalendarTask } from "@app/calendar/tasks";
import { PromotionLockService, PromotionLockType } from "@app/promotion-lock";
import { PromotionLock } from "@app/promotion-lock/promotion-lock-model";
import { UserAccountService } from "@pp-core/auth/user";
import { LogService } from "@pp-core/logging";
import { SnackbarService } from "@pp-core/snackbar";
import { ConfirmationDialogService } from "@shared/components/confirmation-dialog";
import { CalendarTaskManager } from "../calendar-tasks-manager";

export class CalendarTasksManagerSpecSetup {
    calendarTasksService: CalendarTasksService;
    logService: LogService;
    snackbarService: SnackbarService;
    promotionLockService: PromotionLockService;
    userAccountService: UserAccountService;
    confirmationDialogService: ConfirmationDialogService;
    
    constructor() { }

    buildCalendarTasksManager(): CalendarTaskManager {
        return new CalendarTaskManager(
            this.calendarTasksService, 
            this.logService, 
            this.snackbarService,
            true,
            this.promotionLockService,
            this.userAccountService,
            this.confirmationDialogService);
    }

    getCalendarTasks(): PpCalendarTask[] {
        return [{
            id: 1,
            parentId: 0,
            elementId: "PromoType1",
            elementType: CalendarTaskType.PromoType,
            startDate: new Date(),
            endDate: new Date(),
            name: "Promo Type 1",
            numberOfParticipants: 1,
            unitBase: "50",
            units: "50",
            uplift: "20%",
            upliftQty: "100",
            numberOfPromos: 20,
            currentStatus: 1,
            color: "someColor",
            status: 1,
            isLocked: false,
            lockedUser: "",
            lockStartTime: new Date()
        }, {
            id: 11,
            parentId: 1,
            elementId: "Promo1",
            elementType: CalendarTaskType.Promo,
            startDate: new Date(),
            endDate: new Date(),
            name: "Promo 1",
            numberOfParticipants: 1,
            unitBase: "50",
            units: "50",
            uplift: "20%",
            upliftQty: "100",
            numberOfPromos: 20,
            currentStatus: 1,
            color: "someColor",
            status: 1,
            isLocked: false,
            lockedUser: "",
            lockStartTime: new Date()
        }];
    }

    getPromotionLockModel(): PromotionLock {
        return {
            promotionId: "Promo1",
            lockType: PromotionLockType.locked,
            message: "some message",
            lockedBy: "system",
            lockStart: new Date()
        }
    }

    getPromotionTypeLockModel(): PromotionLock {
        return {
            promotionId: "PromoType1",
            lockType: PromotionLockType.locked,
            message: "some message",
            lockedBy: "system",
            lockStart: new Date()
        }
    }
}