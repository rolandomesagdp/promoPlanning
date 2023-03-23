import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE_OPTIONS, FiltersManager, IPpFilters, PpFilters } from '@app/pp-filters/filters';
import { CampaignService } from '@app/campaign/campaign.service';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { NavigationLinks, PpNavigation, leftNavMenuItems } from '@app/navigation';
import { ICampaign } from '@app/campaign/campaign.model';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Observable, of, NEVER } from 'rxjs';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { tap, catchError, concatMap } from 'rxjs/operators';
import { CampaignListNavigation } from '@app/campaign/campaigns-list/campaign-list-navigation';

export class CampaignListManager <T> {
	private className: string = "CampaignListManager";
	private _campaigns: ICampaign[];
	private campaignTotalCount: number;
	navigationItem: PpNavigation;
	errorMessage: string = "";
	loadingCampaigns: boolean = false;
	lowerPageSize: number = DEFAULT_PAGE_SIZE;
	pageSize: number = DEFAULT_PAGE_SIZE;
	pageIndex: number = DEFAULT_PAGE_INDEX;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
	pageChanged: boolean = false;
	subscriptionManager: SubscriptionsManager = new SubscriptionsManager();

	constructor(private campaignService: CampaignService,
		private logger: LogService,
		private route: ActivatedRoute,
		public router: Router,
		public filtersManager: FiltersManager,
		private snackBar: SnackbarService,
		//userAccountService: UserAccountService,
		//confirmationDialogService: ConfirmationDialogService,
		navigationItemRouterLink: NavigationLinks) {
		this.navigationItem = leftNavMenuItems.find(x => x.routerLink === navigationItemRouterLink);
	}

	get campaigns(): ICampaign[] {
		return this._campaigns;
	}

	get CampaignsCount(): number {
		return this.campaignTotalCount;
	}


	loadCampaigns(filters: IPpFilters): void {
		if (this.pageChanged) {
			this.loadNexPage(filters);
		}
		else {
			this.loadWithCount(filters);
		}
	}

	deleteCampaignFromList(campaign: ICampaign): void {
		const filteredCampaigns: ICampaign[] = this.campaigns.filter(x => x.campaignId !== campaign.campaignId);
		this._campaigns = [...filteredCampaigns];
		this.campaignTotalCount = --this.campaignTotalCount;
	}

	// updatePromotionInList(updatedPromotion: IPromotionBase): void {
	// 	this.promotionService.getById(updatedPromotion.promoId).pipe(
	// 		tap((promotion: IPromotionBase) => {
	// 			const elementIndex = this.promos.findIndex(x => x.promoId === updatedPromotion.promoId);
	// 			const promos = Object.assign([...this.promos], {[elementIndex]: promotion });
	// 			this.promos = [...promos ];
	// 		})).subscribe();
	// }

	subscribeToQueryParamChanges(): void {
		this.subscriptionManager.add(
			this.route.queryParams.subscribe((params: Params) => {
				if (this.paramsAvailableInUrl(params)) {
					this.onParamsChanged(params);
				}
				else {
					this.onFirstLoad();
				}
				this.loadCampaigns(this.filtersManager.filters);
			}));
	}

	applyFilters(): void {
		let campaignListNavigation = CampaignListNavigation.createNavigation(this.navigationItem, this.filtersManager);
		campaignListNavigation.navigate(this.router);
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
		this.filtersManager.setDefaultCampaignFilters();
		if (PpFilters.create(this.filtersManager.filters).pageFiltersSelected) {
			this.applyFilters();
		}
	}

	private loadWithCount(filters: IPpFilters): void {
		this.loadingCampaigns = true;
		this.subscriptionManager.add(this.getFilteredCampaigns(filters).pipe(
			concatMap(() => {
				return this.getCampaignTotalCount(filters);
			})
		).subscribe(() => {
			this.loadingCampaigns = false;
		}));
	}

	private loadNexPage(filters: IPpFilters): void {
		this.loadingCampaigns = true;
		this.subscriptionManager.add(this.getFilteredCampaigns(filters).subscribe(() => {
			this.loadingCampaigns = false;
			this.pageChanged = false;
		}));
	}

	private getCampaignTotalCount(filters: IPpFilters): Observable<number> {
		return this.campaignService.getCampaignsCount(filters).pipe(
			tap((totalCount: number) => {
				this.logger.debug(this.className, "getCampaignTotalCount", "Calculated campaign count", [totalCount]);
				this.campaignTotalCount = totalCount;
			})
		);
	}

	private getFilteredCampaigns(filters: IPpFilters): Observable<ICampaign[]> {
		return this.campaignService.loadCampaigns(filters).pipe(
			tap((campaigns: ICampaign[]) => {
				this.logger.debug(this.className, "loadCampaigns", "Campaigns retreived from backend", [campaigns]);
				this._campaigns = [...campaigns];
			})
		);
	}

	public destroy() {
		this.subscriptionManager.unsubscribe();
	}
}