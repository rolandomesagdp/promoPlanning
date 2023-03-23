import { NEVER, Observable, of } from "rxjs";
import { catchError, concatMap, tap } from "rxjs/operators";
import { IPpFilters, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, FiltersManager, PpFilters } from "@app/pp-filters/filters";
import { PromotionLockService } from "@app/promotion-lock";
import { LockManager } from "@app/promotion-lock/lock-manager";
import { PromotionLock } from "@app/promotion-lock/promotion-lock-model";
import { SnackbarService } from "@pp-core/snackbar";
import { ConfirmationDialogService } from "@shared/components/confirmation-dialog";
import { LogService } from "@pp-core/logging";
import { UserAccountService } from "@pp-core/auth/user";
import { IPromotionBase, IPromotionListService } from "@app/promotion-common";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { leftNavMenuItems, NavigationLinks, PpNavigation, PromotionNavigation } from "@app/navigation";
import { PromotionFilterAuthors } from "@pp-core/local-storage";

export class PromotionListManager<T extends IPromotionBase> extends LockManager {
	private className: string = "PromotionListManager";
	private promos: T[];
	private promosTotalCount: number;
	navigationItem: PpNavigation;
	filtersAuthor: PromotionFilterAuthors = PromotionFilterAuthors.promotionListComponent;;
	errorMessage: string = "";
	loadingPromotions: boolean = false;
	lowerPageSize: number = DEFAULT_PAGE_SIZE;
	pageSize: number = DEFAULT_PAGE_SIZE;
	pageIndex: number = DEFAULT_PAGE_INDEX;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	pageChanged: boolean = false;

	constructor(private promotionService: IPromotionListService,
		private logger: LogService,
		private route: ActivatedRoute,
		public router: Router,
		public filtersManager: FiltersManager,
		snackBar: SnackbarService,
		listenToUnlockRequests: boolean,
		promotionLockService: PromotionLockService,
		userAccountService: UserAccountService,
		confirmationDialogService: ConfirmationDialogService,
		navigationItemRouterLink: NavigationLinks) {
		super(listenToUnlockRequests, promotionLockService, userAccountService, confirmationDialogService, snackBar);
		this.navigationItem = leftNavMenuItems.find(x => x.routerLink === navigationItemRouterLink);
	}

	get promotions(): T[] {
		return this.promos;
	}

	get promotionsCount(): number {
		return this.promosTotalCount;
	}

	lock(promotionLock: PromotionLock): void {
		const promoToLock = this.promos ? this.promos.find(x => x.promoId === promotionLock.promotionId) : null;
		if (promoToLock) {
			promoToLock.isLocked = true;
			promoToLock.lockedUser = promotionLock.lockedBy;
			promoToLock.lockStartTime = new Date(promotionLock.lockStart);
			const message = `Promotion ${promotionLock.promotionId} was locked by user ${promotionLock.lockedBy}`;
			this.logger.debug(this.className, "lock", message, [promotionLock, promoToLock]);
		}
	}

	unlock(promotionLock: PromotionLock): void {
		let message: string = "";
		const promoToUnlock = this.promos ? this.promos.find(x => x.promoId === promotionLock.promotionId) : null;
		if (promoToUnlock) {
			promoToUnlock.isLocked = false;
			promoToUnlock.lockedUser = "";
			promoToUnlock.lockStartTime = null;
			message = `Promotion ${promotionLock.promotionId} was unlocked by user ${promotionLock.lockedBy}`;
			this.logger.debug(this.className, "unlock", message, [promotionLock, promoToUnlock]);

			if(this.unlockRequestedByMe(promotionLock)) {
				this.snackBar.openWarn(message);
				this.removeFromMyUnlockRequests(promotionLock);
			}
		}
	}

	forceUnlock(promotionLock: PromotionLock): void {
		this.unlock(promotionLock);
	}

	loadPromotions(filters: IPpFilters): void {
		if (this.pageChanged) {
			this.loadNexPage(filters);
		}
		else {
			this.loadWithCount(filters);
		}
	}

	deletePromotionFromList(promotionToDelete: IPromotionBase): void {
		const filteredPromos: T[] = this.promos.filter(x => x.promoId !== promotionToDelete.promoId);
		this.promos = [...filteredPromos];
	}

	updatePromotionInList(updatedPromotion: IPromotionBase): void {
		this.promotionService.getById(updatedPromotion.promoId).pipe(
			tap((promotion: IPromotionBase) => {
				const elementIndex = this.promos.findIndex(x => x.promoId === updatedPromotion.promoId);
				const promos = Object.assign([...this.promos], {[elementIndex]: promotion });
				this.promos = [...promos ];
			})).subscribe();
	}

	subscribeToQueryParamChanges(): void {
		this.subscriptionManager.add(
			this.route.queryParams.subscribe((params: Params) => {
				if (this.paramsAvailableInUrl(params)) {
					this.onParamsChanged(params);
				}
				else {
					this.onFirstLoad();
				}
				this.loadPromotions(this.filtersManager.filters);
			}));
	}

	applyFilters(): void {
		let promotionListNavigation = PromotionNavigation.createPromoNavigation(this.navigationItem, this.filtersManager);
		promotionListNavigation.navigate(this.router);
	}

	private onParamsChanged(params: Params): void {
		this.filtersManager.filters = PpFilters.createFromParams(params);
		this.pageIndex = +this.filtersManager.filters.pageIndex;
		this.pageSize = +this.filtersManager.filters.pageSize;
	}

	private paramsAvailableInUrl(params: Params): boolean {
		const filtersModel: IPpFilters = PpFilters.createFromParams(params);
		const filters: PpFilters = PpFilters.create(filtersModel);
		return filters.filtersSelected || filters.pageFiltersSelected;
	}

	private onFirstLoad(): void {
		this.filtersManager.setDefaultFilters(this.filtersAuthor);
		if (PpFilters.create(this.filtersManager.filters).filtersSelected) {
			this.applyFilters();
		}
	}

	private loadWithCount(filters: IPpFilters): void {
		this.loadingPromotions = true;
		this.subscriptionManager.add(this.getFilteredPromotions(filters).pipe(
			concatMap(() => {
				return this.getPromotionTotalCount(filters);
			})
		).subscribe(() => {
			this.loadingPromotions = false;
		}));
	}

	private loadNexPage(filters: IPpFilters): void {
		this.loadingPromotions = true;
		this.subscriptionManager.add(this.getFilteredPromotions(filters).subscribe(() => {
			this.loadingPromotions = false;
			this.pageChanged = false;
		}));
	}

	private getPromotionTotalCount(filters: IPpFilters): Observable<number | Observable<never>> {
		return this.promotionService.getPromotionsCount(filters).pipe(
			tap((promosTotalCount: number) => {
				this.logger.debug(this.className, "getPromotionTotalCount", "Calculated promotions count", [promosTotalCount]);
				this.promosTotalCount = promosTotalCount;
			}),
			catchError(error => {
				this.errorMessage = `There was an error during the load of the promotions count. Details: ${error.error}`
				this.logger.error(this.className, "getPromotionTotalCount", this.errorMessage, [error]);
				this.snackBar.openError(this.errorMessage);
				this.loadingPromotions = false;
				return of(NEVER);
			})
		);
	}

	private getFilteredPromotions(filters: IPpFilters): Observable<T[] | Observable<never>> {
		return this.promotionService.getPromotions(filters).pipe(
			tap((promos: T[]) => {
				this.logger.debug(this.className, "loadPromotions", "Promotions retreived from backend", [promos]);
				this.promos = [...promos];
			}),
			catchError(error => {
				this.errorMessage = `There was an error during the load of the promotions. Details: ${error.error}`;
				this.logger.error(this.className, "loadPromotions", this.errorMessage, [error]);
				this.snackBar.openError(this.errorMessage);
				this.loadingPromotions = false;
				return of(NEVER);
			})
		);
	}
}