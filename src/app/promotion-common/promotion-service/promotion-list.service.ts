import { IPpFilters } from "@app/pp-filters/filters";
import { UnitsOfMeasurement } from "@pp-core/units-of-measurement";
import { Observable } from "rxjs";
import { IPromotionBase } from "..";

export interface IPromotionListService {
    getPromotions(filters: IPpFilters): Observable<IPromotionBase[]>;

    getPromotionsCount(filters: IPpFilters): Observable<number>;

    getById(promotionId: string, unitOfMeasurement?: UnitsOfMeasurement): Observable<IPromotionBase>;
}