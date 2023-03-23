import { Component, Input, OnDestroy } from '@angular/core';
import { IPromotion } from '@app/promotion-common';
import { PromotionActionsManager } from '@app/promotion-common/promotion-actions/promotion-actions.manager';
import { PromotionFormService } from '@app/promotion-common/promotion-form';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';

@Component({
  selector: 'pp-promotion-details-actions',
  templateUrl: './promotion-details-actions.component.html',
  styleUrls: ['./promotion-details-actions.component.scss']
})
export class PromotionDetailsActionsComponent implements OnDestroy {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  @Input() promotion: IPromotion;
  
  get closeButtonEnabled(): boolean {
    return this.actions.simulationService.simulationIsActive;
  }

  get promotionEditButtonEnabled(): boolean {
    return this.actions.promotionPermissions.userCanWrite() &&
    !this.actions.promotionPermissions.promotion.isLocked
  }

  get promotionSaveButtonEnabled(): boolean {
    return this.promotionFormService.promotionFormCanBeSaved;
  }

  constructor(public actions: PromotionActionsManager, private promotionFormService: PromotionFormService) { }
  
  editPromotion(): void {
    this.subscriptionManager.add(this.actions.toggleEditMode().subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }
}
