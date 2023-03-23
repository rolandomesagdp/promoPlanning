import { AttributeValidationType } from "./attribute-validation-type";
import { AttributeValue } from "./attribute-value";

export interface IAttribute {
    promoTypeId: number;
    promoTypeName: string;
    attributeId: number;
    name: string;
    validationType: AttributeValidationType,
    owner: string,
    isPromoClustering: boolean
    sO99AttributeId: number,
    costType: number;
    defaultValues: AttributeValue[]
}