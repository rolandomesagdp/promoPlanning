import { Pipe, PipeTransform } from '@angular/core';
import { IPromotionStatus } from './promotion-status.model';
import { PromotionStatusService } from './promotion-status.service';

@Pipe({
  name: 'promotionStatus'
})
export class PromotionStatusPipe implements PipeTransform {

  constructor(private promotionStatusService: PromotionStatusService) { }

  transform(promotionStatusId: number): string {
    const promotionStatus: IPromotionStatus = this.promotionStatusService
      .promotionStatus.find(x => x.statusId === promotionStatusId)
    return promotionStatus ? promotionStatus.statusValue : "No promotion status";
  }
}
