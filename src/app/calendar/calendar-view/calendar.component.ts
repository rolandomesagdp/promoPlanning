import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FiltersManager, IPpFilters, PpFilters } from '@app/pp-filters/filters';
import { SnackbarService } from '@pp-core/snackbar';
import { NumberFormat } from '@shared/format';
import { CalendarTasksService, CalendarTaskType, PpCalendarTask } from '../tasks';
import { PromotionLockService } from '@app/promotion-lock';
import { ConfirmationDialogService } from '@shared/components/confirmation-dialog';
import { CalendarTaskManager } from './calendar-tasks-manager';
import { PromotionFilterAuthors } from '@pp-core/local-storage';
import { LogService } from '@pp-core/logging';
import { UserAccountService } from '@pp-core/auth/user';
import { NavigationLinks, PpNavigation } from '@app/navigation';
import { leftNavMenuItems } from '../../navigation/navigation-lists/left-navigation-items';
import { EnvironmentService } from '@pp-core/environment';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { DynamicGridConfigurationService, TableConfigParams, PpTableColumn } from '@app/dynamic-grid-configuration';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DefaultColumnConfiguration } from '@app/dynamic-grid-configuration/default-grid-configuration';
import { CalenderDynamicColumn } from '@app/calendar/calendar-view/calendar-dynamic-column.class';

@Component({
	selector: 'pp-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss', './devextreme-gantt-style-rewrite.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
	calendarNavigation: PpNavigation = leftNavMenuItems.find(x => x.routerLink === NavigationLinks.calendar);
	filtersAuthor: PromotionFilterAuthors = PromotionFilterAuthors.calendarComponent;
	tasksManager: CalendarTaskManager;
	ganttInstance: any;
	currentTime: Date;
	subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
	dynamicColumns: CalenderDynamicColumn[] = [];

	constructor(public route: ActivatedRoute, private router: Router, private environmentService: EnvironmentService,
		private snackBar: SnackbarService, calendarTasksService: CalendarTasksService, public filtersManager: FiltersManager,
		private logger: LogService, promoLockService: PromotionLockService, userAccountService: UserAccountService, 
		confirmationDialogService: ConfirmationDialogService, private dynamicGridConfigurationService: DynamicGridConfigurationService) {
		this.tasksManager = new CalendarTaskManager(calendarTasksService, this.logger, this.snackBar, false, promoLockService, userAccountService, confirmationDialogService);
		this.formatNumber = this.formatNumber.bind(this);
		this.formatPercentNumber = this.formatPercentNumber.bind(this);
	}

	ngOnInit(): void {
		this.tasksManager.loadingTasks = true;
		this.getColumnsConfiguration();
		this.subscribeToQueryParamChanges();
		this.tasksManager.connectToPromotionLockNotificationHub();
	}

	createNewPromotion(): void {
		console.log("Create new Promotion");
	}

	getPromotionsCount(): number {
		if(this.tasksManager && this.tasksManager.tasks) {
			const promotions: PpCalendarTask[] = this.tasksManager.tasks.filter(x => x.elementType === CalendarTaskType.Promo);
			return promotions.length;
		}
		return 0;
	}

	applyFilters(): void {
		const queryParams: Params = PpFilters.create(this.filtersManager.filters).toParams();
		this.navigate('calendar', queryParams);
	}

	onCalendarReady(ganttInstance: any): void {
		this.ganttInstance = ganttInstance;
	}

	disableDialog(e: any): void {
		if (e.key != 0) {
			e.cancel = true;
		}
	}

	formatNumber(value: number): string {
		return new NumberFormat(this.environmentService, value).formattedNumber;
	}

	formatPercentNumber(value: number): string {
		return new NumberFormat(this.environmentService, value).percentFormat;
	}

	taskSelected(task: PpCalendarTask): void {
		if (task.elementType === CalendarTaskType.Promo && !task.isLocked) {
			const promotionUrl: string = `promotion/${task.elementId}`;
			this.navigate(promotionUrl);
		}
	}

	navigate(url: string, params?: Params): void {
		this.router.navigate([url], { queryParams: params });
	}

	showParticipantsStatus(data: PpCalendarTask): boolean {
		return data.elementType === CalendarTaskType.PromoType ? false : true;
	}

	ngOnDestroy(): void {
		this.tasksManager.destroy();
		this.subscriptionManager.unsubscribe();
	}

	private subscribeToQueryParamChanges(): void {
		this.tasksManager.subscriptionManager.add(
			this.route.queryParams.subscribe((params: Params) => {
				if (this.paramsAvailableInUrl(params)) {
					this.onParamsChanged(params);
				}
				else {
					this.onFirstLoad();
				}
				this.tasksManager.loadTasks(this.filtersManager.filters);
			}));
	}

	private onParamsChanged(params: Params): void {
		this.filtersManager.filters = PpFilters.createFromParams(params);
	}

	private paramsAvailableInUrl(params: Params): boolean {
		const filtersModel: IPpFilters = PpFilters.createFromParams(params);
		const filters: PpFilters = PpFilters.create(filtersModel);
		return filters.filtersSelected;
	}

	private onFirstLoad(): void {
		this.filtersManager.setDefaultFilters(this.filtersAuthor);
		if (PpFilters.create(this.filtersManager.filters).filtersSelected) {
			this.applyFilters();
		}
	}

	public getColumnsConfiguration() {
		this.subscriptionManager.add(this.dynamicGridConfigurationService.getTableColumnsConfiguration(TableConfigParams.CALENDAR).pipe(
			catchError(error => {
				this.snackBar.openError('Error in getting columns configuration !');
				this.logger.error('CalendarComponent', 'getColumnsConfiguration', 'Error in getting columns configuration', error);
				return of(new DefaultColumnConfiguration().totalColumns);
			}),
			tap((columns: PpTableColumn[]) => {
				columns = [...columns.sort((a,b) => a.position - b.position)];
				columns.forEach(col => {
					this.dynamicColumns.push(CalenderDynamicColumn.build(col));
				});
			})).subscribe());
	}
}
