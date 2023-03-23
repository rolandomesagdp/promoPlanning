import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PromotionExport } from "@app/export/promotion-export";
import { NavigationLinks, PpNavigation, PromotionFormNavigation, promotionFormNavigation } from "@app/navigation";
import { PromotionLock, PromotionLockService, PromotionLockType } from "@app/promotion-lock";
import { LockManager } from "@app/promotion-lock/lock-manager";
import { UserAccountService } from "@pp-core/auth/user";
import { LogService } from "@pp-core/logging";
import { SnackbarService } from "@pp-core/snackbar";
import { ConfirmationDialogService } from "@shared/components/confirmation-dialog";
import { ConfirmationResponse, ConfirmDialogData } from "@shared/components/confirmation-dialog/data";
import { BehaviorSubject, NEVER, Observable, of } from "rxjs";
import { catchError, concatMap, map, tap } from "rxjs/operators";
import { PromotionPermissionsManager } from "../promotion-permissions/promotion-permissions-manager";
import { IPromotion } from "../promotion/promotion.model";
import { PromotionService } from "../promotion-service/promotion.service";
import { PromotionSimulationService } from "../promotion-simulation";
import { ToggleDrawerService } from "@shared/components/drawer-card/toggle-drawer-service";
import { PromotionFactory } from "../promotion/promotion.factory.class";
import { PromotionFormService } from "../promotion-form/promotion-form.service";

@Injectable()
export class PromotionActionsManager extends LockManager {
    private className: string = "PromotionActionsManager";
    updatedPromotion: IPromotion;
    promotionExport: PromotionExport;
    
    get editModeEnabled(): boolean {
        return this.promotionFormService.promotionForm !== null
    };

    private promotionDeletedSubject$: BehaviorSubject<IPromotion> = new BehaviorSubject<IPromotion>(null);
    promotionDeleted$: Observable<IPromotion> = this.promotionDeletedSubject$.asObservable();

    private promotionEditedSubject$: BehaviorSubject<IPromotion> = new BehaviorSubject<IPromotion>(null);
    promotionEdited$: Observable<IPromotion> = this.promotionEditedSubject$.asObservable();

    savingPromotionData: boolean = false;

    constructor(public router: Router, userAccountService: UserAccountService,
        promotionLockService: PromotionLockService, public logger: LogService,
        confirmationDialog: ConfirmationDialogService, snackBar: SnackbarService,
        public promotionService: PromotionService, public promotionPermissions: PromotionPermissionsManager,
        public simulationService: PromotionSimulationService, private toggleDrawerService: ToggleDrawerService,
        public promotionFormService: PromotionFormService) {
        super(true, promotionLockService, userAccountService, confirmationDialog, snackBar);
    }

    toggleEditMode(): Observable<void> {
        if (this.editModeEnabled) {
            return this.unlockPromotion(this.promotionPermissions.promotion.promoId).pipe(
                tap(() => {
                    this.promotionFormService.clearForm();
                }),
                catchError(error => {
                    return this.handleError("Error when trying to edit a Promotion", "toggleEditMode", error);
                })
            );
        }
        else {
            return this.promotionLockService.lockPromotion(this.promotionPermissions.promotion.promoId)
            .pipe(
                tap(() => {
                    this.promotionFormService.initializeForm(this.promotionPermissions.promotion);
                    console.log(this.promotionFormService.promotionForm);
                }),
                catchError(error => {
                    this.snackBar.openError(`Some error. Details: ${error}`);
                    this.logger.error("PromotionActionsManager", "toggleEditMode", "Error when trying to edit promotion", error);
                    return NEVER;
                })
            );
        }
    }

    update(): void {
        this.savingPromotionData = true;
        const promotion: IPromotion = PromotionFactory.createFromForm(this.promotionFormService.promotionForm).promotion;
        this.subscriptionManager.add(this.saveObservablePromotion(promotion).pipe(
                concatMap((promotion: IPromotion) => {
                    this.updatedPromotion = {...promotion };
                    return this.toggleEditMode().pipe(map(() => promotion))
                }),
                tap((editedPromotion: IPromotion) => {
                    this.snackBar.openSuccess("Promotion successfully saved");
                    this.savingPromotionData = false;
                    this.promotionEditedSubject$.next(editedPromotion);
                })).subscribe());
    }

    closeDrawer(): void {
        if (this.simulationService.simulationIsActive) {
            this.snackBar.openWarn("You should first accept or reject the simulation before closing the Promotion details.");
        }
        else {
            if (this.editModeEnabled) {
                this.subscriptionManager.add(this.toggleEditMode().pipe(
                    tap(() => this.toggleDrawerService.toggleDrawer())).subscribe());
            }
            else {
                this.toggleDrawerService.toggleDrawer();
            }
        }
    }

    editForecast(promotion: IPromotion): void {
        if (this.promotionPermissions.userCanWriteUplift() && !promotion.isLocked && !promotion.isPastPromotion) {
            const forecastEditNav = promotionFormNavigation.find(x => x.routerLink === NavigationLinks.forecastEdit);
            PromotionFormNavigation.createPromotionFormNavigation(forecastEditNav, promotion.promoId).navigate(this.router);
        }
        else {
            this.viewForecastDetails(promotion);
        }
    }

    viewForecastDetails(promotion: IPromotion): void {
        const forecastDetails = promotionFormNavigation.find(x => x.routerLink === NavigationLinks.forecastDetails);
        PromotionFormNavigation.createPromotionFormNavigation(forecastDetails, promotion.promoId).navigate(this.router);
    }

    addParticipants(promotion: IPromotion): void {
        if (this.promotionPermissions.userCanWrite() && !promotion.isLocked) {
            const participants = promotionFormNavigation.find(x => x.routerLink === NavigationLinks.promotionParticipants);
            PromotionFormNavigation.createPromotionFormNavigation(participants, promotion.promoId).navigate(this.router);
        }
    }

    participantAttributes(promotion: IPromotion): void {
        if (this.promotionPermissions.userCanWrite() && !promotion.isLocked) {
            const participantAtt = promotionFormNavigation.find(x => x.routerLink === NavigationLinks.participantAttributes);
            PromotionFormNavigation.createPromotionFormNavigation(participantAtt, promotion.promoId).navigate(this.router);
        }
    }

    promotionRoi(promotion: IPromotion): void {
        if (this.promotionPermissions.userCanReadRoi()) {
            const roiNav = promotionFormNavigation.find(x => x.routerLink === NavigationLinks.promotionRoi);
            PromotionFormNavigation.createPromotionFormNavigation(roiNav, promotion.promoId).navigate(this.router);
        }
    }

    copyPromotion(promotion: IPromotion): void {
        const promotionCopyNav: PpNavigation = promotionFormNavigation.find(x => x.routerLink === NavigationLinks.promotionCopy);
        PromotionFormNavigation.createPromotionFormNavigation(promotionCopyNav, promotion.promoId).navigate(this.router);
    }

    deletePromotion(promotion: IPromotion): Observable<IPromotion> {
        const dialogData: ConfirmDialogData = ConfirmDialogData
            .build(`Delete Promotion '${promotion.name}'`,
                `Please, confirm that you want to permanently delete the promotion '${promotion.name}'.`,
                true, "Confirm", true, "Cancel", "75");

        return this.confirmationService.confirm(dialogData).pipe(
            concatMap((confirmationResponse: ConfirmationResponse) => {
                if (confirmationResponse === ConfirmationResponse.Accept) return this.promotionService.deletePromo(promotion.promoId);
                else return NEVER;
            }),
            map(() => {
                this.snackBar.openSuccess(`Promotion '${promotion.name}' was correctly deleted.`);
                this.promotionDeletedSubject$.next(promotion);
                return promotion;
            }),
            catchError(error => {
                return this.handleError(`Promotion '${promotion.name}' failed to delete.`, "deletePromotion", error);
            })
        );
    }

    requestPromotionUnlock(promotion: IPromotion): void {
        const promotionUnlock: PromotionLock = {
            promotionId: promotion.promoId,
            lockType: PromotionLockType.unlockRequested,
            message: `User ${this.userAccountService.currentUser.userName} just requested an unlock for promotion "${promotion.name}"`,
            lockedBy: this.userAccountService.currentUser.userName,
            lockStart: new Date()
        }
        this.requestUnlock(promotionUnlock);
        this.logger.debug(this.className, "requestPromotionUnlock", "Promotion unlock requested", [promotionUnlock]);
    }

    issueForcedPromotionUnlock(promotion: IPromotion): void {
        const promotionUnlock: PromotionLock = {
            promotionId: promotion.promoId,
            lockType: PromotionLockType.unlockRequested,
            message: `User ${this.userAccountService.currentUser.userName} just requested an unlock for promotion "${promotion.name}"`,
            lockedBy: this.userAccountService.currentUser.userName,
            lockStart: new Date()
        }
        this.forcePromotionUnlock(promotionUnlock);
        this.logger.debug(this.className, "requestPromotionUnlock", "Promotion unlock requested", [promotionUnlock]);
    }

    lock(promotionLock: PromotionLock): void {
        throw new Error("This function is not supposed to be used in this class.");
    }

    unlock(promotionLock: PromotionLock): void {
        throw new Error("This function is not supposed to be used in this class.");
    }

    forceUnlock(promotionLock: PromotionLock): void {
        throw new Error("This function is not supposed to be used in this class.");
    }

    private handleError(message: string, sourceFunction: string, error: any): Observable<never> {
        this.snackBar.openError(`${message}. Details: ${error}`);
        this.logger.error(this.className, sourceFunction, "Error when trying to edit promotion", error);
        return NEVER;
    }

    private saveObservablePromotion(promotion: IPromotion): Observable<IPromotion> {
        return of(promotion);
    }
}