import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPromotion } from '../promotion/promotion.model';
import { IPromotionSummary } from '../promotion/promotion-summary.model';
import { PromotionFactory } from '../promotion/promotion.factory.class';

@Component({
  selector: 'pp-promotion-summary',
  templateUrl: './promotion-summary.component.html',
  styleUrls: ['./promotion-summary.component.scss']
})
export class PromotionSummaryComponent {
  @Input() promotion: IPromotionSummary
  @Input() showViewPromotionLink: boolean = true;
  @Input() showActionsButton: boolean = true;
  @Output() viewPromotion: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  getPromotion(): IPromotion {
    return PromotionFactory.createFromSummary(this.promotion).promotion;
  }
}
