import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationLinks } from '@app/navigation';
import { FiltersManager } from '@app/pp-filters/filters';
import { IPromotion, IPromotionBase, PromotionListManager, PromotionSummaryService } from '@app/promotion-common';
import { IPromotionSummary } from '@app/promotion-common/promotion';
import { PromotionActionsManager } from '@app/promotion-common/promotion-actions/promotion-actions.manager';
import { PromotionLockService } from '@app/promotion-lock';
import { UserAccountService } from '@pp-core/auth/user';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { ConfirmationDialogService } from '@shared/components/confirmation-dialog';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pp-promotion-cards',
  templateUrl: './promotion-cards.component.html',
  styleUrls: ['./promotion-cards.component.scss']
})
export class PromotionCardsComponent implements OnInit, OnDestroy {
  promotionCardsManager: PromotionListManager<IPromotionSummary>;
  selectedPromotionId: string;

  constructor(promoLockService: PromotionLockService, userAccountService: UserAccountService,
    confirmationDialogService: ConfirmationDialogService, snackBar: SnackbarService,
    router: Router, route: ActivatedRoute, promotionSummaryService: PromotionSummaryService, 
    filtersManager: FiltersManager, logger: LogService, private promotionActions: PromotionActionsManager,
    private drawerToggler: ToggleDrawerService) {
    this.promotionCardsManager = new PromotionListManager<IPromotionSummary>(promotionSummaryService, logger, route, router, filtersManager, 
      snackBar, false, promoLockService, userAccountService, confirmationDialogService, NavigationLinks.promotionCards);
  }

  ngOnInit(): void {
    this.promotionCardsManager.loadingPromotions = true;
    this.promotionCardsManager.subscribeToQueryParamChanges();
    this.promotionCardsManager.connectToPromotionLockNotificationHub();
    this.promotionCardsManager.subscriptionManager.add(this.promotionActions.promotionDeleted$
      .subscribe((deletedPromotion: IPromotion) => { this.onPromotionDeleted(deletedPromotion) }));
    this.promotionCardsManager.subscriptionManager.add(this.promotionActions.promotionEdited$.pipe(
      tap((promotion: IPromotionBase) => this.onPromotionEdited(promotion)) ).subscribe());
  }

  onPageChange(pageChangeEvent: PageEvent): void {
    this.promotionCardsManager.pageChanged = true;
    this.promotionCardsManager.filtersManager.filters.pageSize = pageChangeEvent.pageSize;
    this.promotionCardsManager.filtersManager.filters.pageIndex = pageChangeEvent.pageIndex;
    this.promotionCardsManager.applyFilters();
  }

  onViewPromotion(promotionId: string): void {
    this.selectedPromotionId = promotionId;
    this.drawerToggler.toggleDrawer();
  }

  ngOnDestroy(): void {
    //this.promotionActions.destroy();
    this.promotionCardsManager.destroy();
  }

  private onPromotionDeleted(deletedPromotion: IPromotion): void {
    if(deletedPromotion) {
      if (this.promotionCardsManager.promotions.length === 1) {
        // apply filters reducing the pageIndex.
      }
      else this.promotionCardsManager.deletePromotionFromList(deletedPromotion);
    }
  }

  private onPromotionEdited(promotion: IPromotionBase): void {
    if(promotion) {
      this.promotionCardsManager.updatePromotionInList(promotion);
    }
  }
}
