import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CampaignService } from '@app/campaign/campaign.service';
import { IPromotion } from '@app/promotion-common';
import { PromotionFormService } from '@app/promotion-common/promotion-form/promotion-form.service';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';

@Component({
  selector: 'pp-promotion-details-form',
  templateUrl: './promotion-details-form.component.html',
  styleUrls: ['./promotion-details-form.component.scss']
})
export class PromotionDetailsFormComponent implements OnInit, OnDestroy {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  @Input() promotion: IPromotion
  
  constructor(public promotionFormService: PromotionFormService, private campaignService: CampaignService) { }
  
  ngOnInit(): void {
    this.subscriptionManager.add(this.campaignService.loadCampaigns(null).subscribe());
  }

  getError(someInput: string): string {
    return someInput;
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }
}
