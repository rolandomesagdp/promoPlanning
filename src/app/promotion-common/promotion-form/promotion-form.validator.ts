import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PromotionFormValidationErrorNames } from "./promotion-form-validation-error-names.enum";

export class PromotionFormValidators {

  constructor() { }

  static sellInStartLessThanSellInEnd: ValidatorFn = (promotionForm: AbstractControl): ValidationErrors | null => {
    const sellInStartValue: string = promotionForm.get("sellInStartDate").value;
    const sellInEndValue: string = promotionForm.get("sellInEndDate").value;
    const sellInStartDate: Date = sellInStartValue ? new Date(sellInStartValue) : null;
    const sellInEndDate: Date = sellInEndValue ? new Date(sellInEndValue) : null;

    let errorToReturn: ValidationErrors = null;
    if(sellInStartDate && sellInEndDate && sellInStartDate >= sellInEndDate) {
      errorToReturn = { [PromotionFormValidationErrorNames.sellInStartLessThanSellInEnd]: "Sell in start date should be less than sell in end date." }
    }

    return errorToReturn;
  };

  static sellOutStartLessThanSellOutEnd: ValidatorFn = (promotionForm: AbstractControl): ValidationErrors | null => {
    const sellOutStartValue: string = promotionForm.get("sellOutStartDate").value;
    const sellOutEndValue: string = promotionForm.get("sellOutEndDate").value;
    const sellOutStartDate: Date = sellOutStartValue ? new Date(sellOutStartValue) : null;
    const sellOutEndDate: Date = sellOutEndValue ? new Date(sellOutEndValue) : null;

    let errorToReturn: ValidationErrors = null;
    if(sellOutStartDate && sellOutEndDate && sellOutStartDate >= sellOutEndDate) {
      errorToReturn = { [PromotionFormValidationErrorNames.sellOutStartLessThanSellOutEnd]: "Sell out start date should be less than sell out end date" }
    }

    return errorToReturn;
  };
}