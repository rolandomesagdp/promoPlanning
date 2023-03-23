import { EventEmitter } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { UserAccountService } from '@pp-core/auth/user';
import { PpPermissions } from '@pp-core/permissions';
import { SnackbarService } from '@pp-core/snackbar';
import { ConfirmationDialogService } from '@shared/components/confirmation-dialog';
import { ConfirmationResponse, ConfirmDialogData } from '@shared/components/confirmation-dialog/data';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PromotionLock } from '../promotion-lock-model';
import { PromotionLockType } from '../promotion-lock-type.enum';
import { PromotionLockService } from '../promotion-lock.service';

export abstract class LockManager {
	private connection: any;
	subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
	permissions: PpPermissions = new PpPermissions();
	promotionUnlockedEvent$: EventEmitter<PromotionLock> = new EventEmitter<PromotionLock>();
	forcedUnlockEvent$: EventEmitter<PromotionLock> = new EventEmitter<PromotionLock>();
	myUnlockRequests: PromotionLock[] = [];

	constructor(public listenToUnlockRequests: boolean, public promotionLockService: PromotionLockService,
		public userAccountService: UserAccountService, public confirmationService: ConfirmationDialogService,
		public snackBar: SnackbarService) { }

	abstract lock(promotionLock: PromotionLock): void;

	abstract unlock(promotionLock: PromotionLock): void;

	abstract forceUnlock(promotionLock: PromotionLock): void;

	connectToPromotionLockNotificationHub(): void {
		// this.connection = new signalR.HubConnectionBuilder()
		// 	.configureLogging(signalR.LogLevel.Information)
		// 	.withUrl("promotionLock")
		// 	.build();

		// this.connection.start().then(function () {
		// 	console.log('Connected!');
		// }).catch(function (err) {
		// 	return console.error(err.toString());
		// });

		// this.connection.on("BroadcastMessage", (payload: PromotionLock) => {
		// 	this.onLockMessageReceived(payload);
		// });
	}

	onLockMessageReceived(promotionLock: PromotionLock): void {
		switch (promotionLock.lockType) {
			default: case PromotionLockType.locked: {
				this.lock(promotionLock)
				break;
			}
			case PromotionLockType.unlocked: {
				this.unlock(promotionLock);
				break;
			}
			case PromotionLockType.unlockForced:
				this.forceUnlock(promotionLock);
				break;
			case PromotionLockType.unlockRequested: {
				this.onUnlockRequestedByAnotherUser(promotionLock);
				break;
			}
		}
	}

	onUnlockRequestedByAnotherUser(promotionLock: PromotionLock): void {
		if (this.listenToUnlockRequests) {
			const dialogData = this.buildUnlockRequestConfirmationDialogData(promotionLock);
			this.subscriptionManager.add(
				this.confirmationService.confirm(dialogData).subscribe((result: ConfirmationResponse) => {
					if (result === ConfirmationResponse.Accept) {
						this.subscriptionManager.add(this.promotionLockService.unlockPromotion(promotionLock.promotionId)
							.subscribe(() => {
								this.promotionUnlockedEvent$.emit(promotionLock);
							}));
					}
				})
			);
		}
	}

	requestUnlock(promotionToUnlock: PromotionLock) {
		if (this.userAccountService.permissionManager.isAllowedPermission(this.permissions.DASHBOARD_UNLOCK_PROMOTION)) {
			const message: string = `Promotion with id '${promotionToUnlock.promotionId}' is locked by the user ${promotionToUnlock.lockedBy}. Do you want request an unlock?`;
			const dialogData = ConfirmDialogData.build('Unlock promotion', message, true, "Yes", true, "No", "425px");
			this.subscriptionManager.add(
				this.confirmationService.confirm(dialogData).subscribe((result: ConfirmationResponse) => {
					if (result === ConfirmationResponse.Accept) {
						this.subscriptionManager.add(this.promotionLockService.requestPromotionUnlock(promotionToUnlock.promotionId).pipe(
							tap(() => {
								this.myUnlockRequests = [...this.myUnlockRequests, promotionToUnlock];
								this.snackBar.openSuccess(`An unlock was requested for Promotion with id '${promotionToUnlock.promotionId}'.`)
							})
						).subscribe());
					}
				}));
		}
	}

	forcePromotionUnlock(promotionToLock: PromotionLock): void {
		const dialogData = ConfirmDialogData.build("Promotion unlock request",
			`You are about to force an unlock for promotion "${promotionToLock.promotionId}". This might lead to data loss. Please, confirm that you want to proceed with the forced unlock process.`,
			true, "Yes", true, "No", "425px");
		this.subscriptionManager.add(
			this.confirmationService.confirm(dialogData).subscribe((result: ConfirmationResponse) => {
				if (result === ConfirmationResponse.Accept) {
					this.subscriptionManager.add(
						this.promotionLockService.forcePromotionUnlock(promotionToLock.promotionId).pipe(
							tap(() => {
								this.snackBar.openSuccess(`An unlock was requested for Promotion with id '${promotionToLock.promotionId}'.`)
							})
						).subscribe());
				}
			}));
	}

	unlockRequestedByMe(promotionLock: PromotionLock): boolean {
		const myPromotionLock = this.myUnlockRequests.find(x => x.promotionId === promotionLock.promotionId);
		if(myPromotionLock) return true;
		else return false;
	}

	removeFromMyUnlockRequests(promotionLock: PromotionLock): void {
		const myUnlockRequestsFiltered = this.myUnlockRequests.filter(x => x.promotionId !== promotionLock.promotionId);
		this.myUnlockRequests = [...myUnlockRequestsFiltered ];
	}

	unlockPromotion(promotionId: string): Observable<void> {
        return this.promotionLockService.unlockPromotion(promotionId);
		return of();
    }

	destroy(): void {
		this.subscriptionManager.unsubscribe();
		if (this.connection) {
			this.connection.stop();
		}
	}

	private buildUnlockRequestConfirmationDialogData(promotionLock: PromotionLock): ConfirmDialogData {
		const title: string = "Promotion unlock requested";
		const message: string = `User '${promotionLock.lockedBy}' requested to unlock this promotion. Please, confirm or reject the request.`;
		return ConfirmDialogData.build(title, message, true, "Confirm", true, "Reject", "425px");
	}
}