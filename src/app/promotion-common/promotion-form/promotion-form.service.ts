import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICampaign } from '@app/campaign/campaign.model';
import { CampaignService } from '@app/campaign/campaign.service';
import { IPromotionStatus, PromotionStatusService } from '@app/promotion-status';
import { IPromotionType, PromotionTypeService } from '@app/promotion-type';
import { PromoSellDate } from '@pp-core/settings';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { IPromotion } from '../promotion/promotion.model';
import { PromotionFormValidationErrorNames } from './promotion-form-validation-error-names.enum';
import { PromotionFormValidators } from './promotion-form.validator';

@Injectable()
export class PromotionFormService {
  private _promotion: IPromotion;
  private _promotionForm: FormGroup = null;

  get availableCampaigns(): ICampaign[] {
    return this.campaignsService.campaigns;
  }

  get availableStatus(): IPromotionStatus[] {
    return this.promoStatusService.promotionStatus;
  }

  get availablePromoTypes(): IPromotionType[] {
    return this.promoTypeService.promotionTypes;
  }

  get promotion(): IPromotion {
    return this._promotion;
  }

  get promotionForm(): FormGroup {
    return this._promotionForm;
  }
  

  get promotionFormCanBeSaved(): boolean {
    return this.promotionForm &&
      this.promotionForm.valid &&
      this.promotionForm.dirty
  }

  constructor(private formBuilder: FormBuilder, 
    private settings: SettingsManager, 
    private campaignsService: CampaignService,
    private promoTypeService: PromotionTypeService,
    private promoStatusService: PromotionStatusService) { }

  initializeForm(promotion: IPromotion): void {
    this._promotion = promotion;
    this._promotionForm = this.formBuilder.group({
      promoId: [this.promotion.promoId, Validators.required],
      name: [this.promotion.name, Validators.required],
      description: [this.promotion.description],
      promoTypeId: [this.promotion.promoTypeId],
      status: [this.promotion.status, Validators.required],
      campaignId: [this.promotion.campaignId],
      sellInStartDate: [this.promotion.sellInStartDate, this.getRequiredDateValidator(PromoSellDate.sellIn)],
      sellInEndDate: [this.promotion.sellInEndDate, this.getRequiredDateValidator(PromoSellDate.sellIn)],
      sellOutStartDate: [this.promotion.sellOutStartDate, this.getRequiredDateValidator(PromoSellDate.sellOut)],
      sellOutEndDate: [this.promotion.sellOutEndDate, this.getRequiredDateValidator(PromoSellDate.sellOut)],
      promoAttributes: this.formBuilder.array([])
    }, { validators: [PromotionFormValidators.sellInStartLessThanSellInEnd, PromotionFormValidators.sellOutStartLessThanSellOutEnd] });
  }

  clearForm(): void {
    this._promotion = null;
    this._promotionForm = null;
  }

  controlIsValid(errorType: PromotionFormValidationErrorNames, controlName: string): boolean {
    const control: AbstractControl = this._promotionForm.get(controlName)
    if((this.promotionForm.touched || this.promotionForm.dirty) && (this.promotionForm.errors?.[errorType] || !control.valid)) {
      return false;
    }
    else return true;
  }

  getControlValidationError(errorType: PromotionFormValidationErrorNames, controlName: string): string {
    const requiredError: string = this.getControlRequiredError(controlName);
    if(requiredError) return requiredError;

    const errorMessage: string = this._promotionForm.errors?.[errorType] ? this._promotionForm.errors?.[errorType] : "";
    return errorMessage;
  }

  private getRequiredDateValidator(sellDate: PromoSellDate): Validators {
    return this.settings.promoSellDate === sellDate ? Validators.required : null;
  }
  
  private getControlRequiredError(controlName: string): string {
    const control: AbstractControl = this._promotionForm.get(controlName);
    return control.errors?.required ? "This field is required" : "";
  }
}
