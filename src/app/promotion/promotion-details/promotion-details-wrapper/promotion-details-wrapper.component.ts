import { Component, Input } from '@angular/core';

@Component({
  selector: 'pp-promotion-details-wrapper',
  templateUrl: './promotion-details-wrapper.component.html',
  styleUrls: ['./promotion-details-wrapper.component.scss']
})
export class PromotionDetailsWrapperComponent {
  @Input() promotionId: string;

  constructor() { }
}