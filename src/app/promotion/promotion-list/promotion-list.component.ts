import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PromotionLockService } from '@app/promotion-lock';
import { SnackbarService } from '@pp-core/snackbar';
import { ConfirmationDialogService } from '@shared/components/confirmation-dialog';
import { NumberFormat } from '@shared/format';
import { UserAccountService } from '@pp-core/auth/user/user-account-service/user-account.service';
import { FiltersManager } from '@app/pp-filters/filters';
import { PageEvent } from '@angular/material/paginator';
import { LogService } from '@pp-core/logging';
import { IPromotion, IPromotionBase, PromotionListManager, PromotionService } from '@app/promotion-common';
import { EnvironmentService } from '@pp-core/environment';
import { PromotionActionsManager } from '@app/promotion-common/promotion-actions/promotion-actions.manager';
import { NavigationLinks } from '@app/navigation';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';
import { DynamicGridConfigurationService } from '@app/dynamic-grid-configuration';
import { PromotionTableColumnManager } from '@app/promotion/promotion-list/promotion-table-column-manager';

@Component({
  selector: 'pp-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss', '../../../../src/themes/elements-styles/pp-mat-table.scss']
})
export class PromotionListComponent implements OnInit, OnDestroy {
  promotionListManager: PromotionListManager<IPromotion>;
  promotionTableColumnManager: PromotionTableColumnManager;
  selectedPromotionId: string;

  constructor(private environmentService: EnvironmentService, route: ActivatedRoute, router: Router,
    userAccountService: UserAccountService, filtersManager: FiltersManager, promotionService: PromotionService,
    snackBar: SnackbarService, logger: LogService, promoLockService: PromotionLockService,
    dynamicGridConfigService: DynamicGridConfigurationService,
    confirmationDialogService: ConfirmationDialogService, private drawerToggler: ToggleDrawerService, 
    private actions: PromotionActionsManager) {
    this.promotionListManager = new PromotionListManager<IPromotion>(promotionService, logger, route, router, filtersManager, 
      snackBar, false, promoLockService, userAccountService, confirmationDialogService, NavigationLinks.promotionsList);
    this.promotionTableColumnManager = new PromotionTableColumnManager(dynamicGridConfigService, logger, snackBar);
  }

  ngOnInit(): void {
    this.promotionTableColumnManager.getTableColumns();
    this.promotionListManager.loadingPromotions = true;
    this.promotionListManager.subscribeToQueryParamChanges();
    this.promotionListManager.connectToPromotionLockNotificationHub();
    
    this.promotionListManager.subscriptionManager.add(this.actions.promotionDeleted$
      .subscribe((deletedPromotion: IPromotion) => { this.onPromotionDeleted(deletedPromotion) }));
    this.promotionListManager.subscriptionManager.add(this.actions.promotionEdited$.pipe(
      tap((promotion: IPromotionBase) => this.onPromotionEdited(promotion)) ).subscribe());
  }

  onPageChange(pageChangeEvent: PageEvent): void {
    this.promotionListManager.pageChanged = true;
    this.promotionListManager.filtersManager.filters.pageSize = pageChangeEvent.pageSize;
    this.promotionListManager.filtersManager.filters.pageIndex = pageChangeEvent.pageIndex;
    this.promotionListManager.applyFilters();
  }

  getFormattedNumber(numberToFormat: number): string {
    return new NumberFormat(this.environmentService, numberToFormat).formattedNumber;
  }

  getPercentFormattedNumber(numberToFormat: number): string {
    return new NumberFormat(this.environmentService, numberToFormat).percentFormat;
  }

  getActionIconClass(promotion: IPromotion): string {
    return promotion.isLocked ? "promotions-table-action-icon-disabled" : "promotions-table-action-icon";
  }

  viewPromotion(promotion: IPromotion): void {
    this.selectedPromotionId = promotion.promoId;
    this.drawerToggler.toggleDrawer();
  }

  deletePromotion(promotion: IPromotion): void {
    this.actions.subscriptionManager.add(
    this.actions.deletePromotion(promotion).pipe(
      tap((deletedPromotion: IPromotion) => {
        if(this.promotionListManager.promotions.length === 1) {
          const currentPageIndex = this.promotionListManager.filtersManager.filters.pageIndex;
          this.promotionListManager.filtersManager.filters.pageIndex = currentPageIndex - 1;
          this.promotionListManager.applyFilters();
        }
        else {
          this.promotionListManager.deletePromotionFromList(deletedPromotion);
        }
      })
    ).subscribe());
  }

  ngOnDestroy(): void {
    this.promotionListManager.destroy();
    this.promotionTableColumnManager.destroy();
    //this.actions.destroy();
  }

  private onPromotionEdited(promotion: IPromotionBase): void {
    if(promotion) {
      this.promotionListManager.updatePromotionInList(promotion);
    }
  }

  private onPromotionDeleted(deletedPromotion: IPromotion): void {
    if(deletedPromotion) {
      if (this.promotionListManager.promotions.length === 1) {
        // apply filters reducing the pageIndex.
      }
      else this.promotionListManager.deletePromotionFromList(deletedPromotion);
    }
  }
}