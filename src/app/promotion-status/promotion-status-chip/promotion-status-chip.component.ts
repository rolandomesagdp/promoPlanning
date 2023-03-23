import { Component, Input, OnInit } from '@angular/core';
import { IPromotionStatus } from '../promotion-status.model';
import { PromotionStatusService } from '../promotion-status.service';
import { PromotionStatusChipInputs } from './promotion-status-chip-input.enum';

@Component({
  selector: 'pp-promotion-status-chip',
  templateUrl: './promotion-status-chip.component.html',
  styleUrls: ['./promotion-status-chip.component.scss']
})
export class PromotionStatusChipComponent implements OnInit {
  @Input() status: IPromotionStatus;
  @Input() statusId: number;
  @Input() statusValue: string;
  chipText: string;
  chipColor: string;
  chipTooltip: string;

  get providedInputType(): PromotionStatusChipInputs {
    if(this.status) return PromotionStatusChipInputs.promotionStatus;
    if(this.statusId) return PromotionStatusChipInputs.promotionStatusId;
    if(this.statusValue) return PromotionStatusChipInputs.promotionStatusValue;
    if(!this.status && !this.statusId && !this.statusValue) return PromotionStatusChipInputs.none;
  }
  
  constructor(private promotionStatusService: PromotionStatusService) { }

  ngOnInit(): void {
    this.setChipTextAndTooltip();
  }

  private setChipTextAndTooltip(): void {
    switch(this.providedInputType) {
      case PromotionStatusChipInputs.promotionStatusValue:
        this.setValuesFromStatusValue();
        break;
      case PromotionStatusChipInputs.promotionStatus:
        this.setValuesFromPromotionStatus();
        break;
      case PromotionStatusChipInputs.promotionStatusId:
        this.setValuesFromPromotionStatusId();
        break;
      default: case PromotionStatusChipInputs.none:
        this.setValuesOnNoInputProvided();
        break;
    }
  }

  private setValuesFromPromotionStatus(): void {
    this.chipText = this.status.statusValue;
    this.chipColor = this.status.color;
    this.chipTooltip = `Promotion status: ${this.status.statusValue}`;
  }

  private setValuesFromPromotionStatusId(): void {
    const currentStatus: IPromotionStatus = this.promotionStatusService.promotionStatus.find(x => x.statusId === this.statusId);
    if(currentStatus) {
      this.status = {...currentStatus }
      this.setValuesFromPromotionStatus();
    }
    else 
      this.setValuesOnNoInputProvided();
  }

  private setValuesFromStatusValue(): void {
    const currentStatus: IPromotionStatus = this.promotionStatusService.promotionStatus.find(x => x.statusValue === this.statusValue);
    if(currentStatus) {
      this.status = {...currentStatus }
      this.setValuesFromPromotionStatus();
    }
    else 
      this.setValuesOnNoInputProvided();
  }

  private setValuesOnNoInputProvided(): void {
    this.chipText = "No status";
    this.chipColor = "#D92D20";
    this.chipTooltip = "Either the provided status does not exists or there is no status available.";
  }
}
