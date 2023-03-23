import { Pipe, PipeTransform } from '@angular/core';
import { IPromotionType } from './promotion-type.model';
import { PromotionTypeService } from './promotion-type.service';

@Pipe({
  name: 'promotionType'
})
export class PromotionTypePipe implements PipeTransform {

  constructor(private promotionTypeService: PromotionTypeService) { }

  transform(promotionTypeId: number): string {
    const promoType: IPromotionType = this.promotionTypeService
      .promotionTypes.find(x => x.promotypeId === promotionTypeId);

    return promoType ? promoType.name : "No Promotion Type";
  }
}