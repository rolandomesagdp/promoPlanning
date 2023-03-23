import { Component, Input } from '@angular/core';
import { IAttribute } from '@app/attributes';
import { IPromotion, PromoAttribute } from '@app/promotion-common';

@Component({
  selector: 'pp-promotion-details-read',
  templateUrl: './promotion-details-read.component.html',
  styleUrls: ['./promotion-details-read.component.scss']
})
export class PromotionDetailsReadComponent  {
  @Input() promotion: IPromotion;
  @Input() attributes: IAttribute[];

  constructor() { }

  getDuration(startDateString: string, endDateString: string): string {
    const startDate: any = new Date(startDateString);
    const endDate: any = new Date(endDateString);
    const diffInMs = Math.abs(endDate - startDate);
    const differenceInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
    return differenceInDays.toString();
  }

  getAttributeName(promoAttribute: PromoAttribute): string {
    const attribute = this.attributes.find(x => x.attributeId === promoAttribute.attributeId);
    return attribute ? attribute.name : `Attribute with id ${promoAttribute.attributeId} does not exists`;
  }
}
