import { Component, Input, OnInit } from '@angular/core';
import { IPromotionType } from '../promotion-type.model';
import { PromotionTypeService } from '../promotion-type.service';
import { PromotionTypeChipInputs } from './promotion-type-chip-inputs';

@Component({
  selector: 'pp-promotion-type-chip',
  templateUrl: './promotion-type-chip.component.html',
  styleUrls: ['./promotion-type-chip.component.scss']
})
export class PromotionTypeChipComponent implements OnInit {
  @Input() promotionTypeId: number;
  @Input() promotionTypeName: string;
  @Input() promotionType: IPromotionType;
  chipText: string;
  chipTooltip: string;

  get providedInputType(): PromotionTypeChipInputs {
    if(this.promotionType) return PromotionTypeChipInputs.promotionType;
    if(this.promotionTypeName) return PromotionTypeChipInputs.promotionTypeName;
    if(this.promotionTypeId) return PromotionTypeChipInputs.promotionTypeId;
    if(!this.promotionType && !this.promotionTypeName && !this.promotionTypeId) return PromotionTypeChipInputs.none;
  }

  constructor(private promotionTypeService: PromotionTypeService) { }

  ngOnInit(): void {
    this.setChipTextAndTooltip();
  }

  private setChipTextAndTooltip(): void {
    switch(this.providedInputType) {
      case PromotionTypeChipInputs.promotionType:
        this.setValuesFromPromotionType();
        break;
      case PromotionTypeChipInputs.promotionTypeName:
        this.setValuesFromPromotionTypeName();
        break;
      case PromotionTypeChipInputs.promotionTypeId:
        this.setValuesFromPromotionTypeId();
        break;
      default: case PromotionTypeChipInputs.none:
        this.setValuesOnNonInputProvided();
        break;
    }
  }

  private setValuesFromPromotionType(): void {
    this.chipText = this.promotionType.name;
    this.chipTooltip = `Promotion Type: ${this.promotionType.name}`;
  }

  private setValuesFromPromotionTypeName(): void {
    this.chipText = this.promotionTypeName;
    this.chipTooltip = `Promotion Type: ${this.promotionTypeName}`;
  }

  private setValuesFromPromotionTypeId(): void {
    this.promotionType = {...this.promotionTypeService.promotionTypes.find(x => x.promotypeId === this.promotionTypeId) };
    if(this.promotionType && this.promotionType.name)
      this.setValuesFromPromotionType();
    else
      this.setValuesOnNonInputProvided();
  }

  private setValuesOnNonInputProvided(): void {
    this.chipText = "No Promotion Type";
    this.chipTooltip = "Promotion Type not available.";
  }
}
