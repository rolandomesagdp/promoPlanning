import { CalendarTasksService, CalendarTaskType, PpCalendarTask } from "@app/calendar/tasks";
import { ConfirmationDialogService } from "@shared/components/confirmation-dialog";
import { PromotionLock } from "../../promotion-lock/promotion-lock-model";
import { PromotionLockService } from "../../promotion-lock/promotion-lock.service";
import { LockManager } from "../../promotion-lock/lock-manager/lock-manager";
import { catchError, tap } from "rxjs/operators";
import { IPpFilters } from "@app/pp-filters/filters";
import { SnackbarService } from "@pp-core/snackbar";
import { NEVER, of } from "rxjs";
import { LogService } from "@pp-core/logging";
import { UserAccountService } from "@pp-core/auth/user";

export class CalendarTaskManager extends LockManager {
	private className: string = "CalendarTaskManager";
	private tasksList: PpCalendarTask[];

	loadingTasks: boolean = false;
	errorMessage: string = "";

	constructor(private calendarTasksService: CalendarTasksService, private logger: LogService, 
		snackBar: SnackbarService, listenToUnlockRequests: boolean, promotionLockService: PromotionLockService, 
		userAccountService: UserAccountService, confirmationDialogService: ConfirmationDialogService) {
		super(listenToUnlockRequests, promotionLockService, userAccountService, confirmationDialogService, snackBar)
	}

	get tasks(): PpCalendarTask[] {
		return this.tasksList;
	}

	loadTasks(filters: IPpFilters): void {
		this.loadingTasks = true;
		this.subscriptionManager.add(
			this.calendarTasksService.getCalendar(filters).pipe(
				tap((tasks: PpCalendarTask[]) => {
					this.logger.debug(this.className, "loadTasks", "Tasks retreived from backend", [tasks]);
					this.tasksList =  [...tasks];
					this.loadingTasks = false;
				}),
				catchError(error => {
					this.errorMessage = `There was an error during the load of the calendar. Details: ${error.error}`;
					this.logger.error(this.className, "loadTasks", this.errorMessage, [error]);
					this.snackBar.openError(this.errorMessage);
					this.loadingTasks = false;
					return of(NEVER);
				})
			).subscribe());
	}

	lock(promotionLock: PromotionLock): void {
		const taskToLock = this.tasksList ? this.tasksList.find(x => x.elementId === promotionLock.promotionId) : null;
		if (taskToLock && taskToLock.elementType === CalendarTaskType.Promo) {
			taskToLock.isLocked = true;
			taskToLock.lockedUser = promotionLock.lockedBy;
			taskToLock.lockStartTime = new Date(promotionLock.lockStart);
		}
	}

	unlock(promotionLock: PromotionLock): void {
		const taskToUnlock = this.tasksList ? this.tasksList.find(x => x.elementId === promotionLock.promotionId) : null;
		if (taskToUnlock && taskToUnlock.elementType === CalendarTaskType.Promo) {
			taskToUnlock.isLocked = false;
			taskToUnlock.lockedUser = "";
			taskToUnlock.lockStartTime = null;
		}
	}

	forceUnlock(promotionLock: PromotionLock): void {
		this.unlock(promotionLock);
	}
}