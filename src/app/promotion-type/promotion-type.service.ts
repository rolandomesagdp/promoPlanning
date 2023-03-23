import { Injectable } from '@angular/core';
import { LocalStorageService } from '@pp-core/local-storage';
import { EnvironmentService } from '@pp-core/environment';
import { IPromotionType } from './promotion-type.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class PromotionTypeService {
  private promotionTypeController: string;
  private _promotionTypes: IPromotionType[];

  get promotionTypes(): IPromotionType[] {
    if(!this._promotionTypes) {
      this._promotionTypes = this.localStorage.getPromotionTypes();
    }

    return this._promotionTypes;
  }

  constructor(environmentService: EnvironmentService, private localStorage: LocalStorageService, private httpClient: HttpClient) { 
    this.promotionTypeController = `${environmentService.getEnvironment().serverUrl}promotypes`;
  }

  loadPromotionTypes(): Observable<void> {
    return this.getObservablePromotionTypes().pipe(
      concatMap((promotionTypes: IPromotionType[]) => {
        this.localStorage.setPromotionTypes(promotionTypes);
        return of(void 0);
      })
    )
  }

  private getObservablePromotionTypes(): Observable<IPromotionType[]> {
    return of([
      {
        promotypeId: 1,
        name: "Discount",
        isPromoClustering: true
      },
      {
        promotypeId: 2,
        name: "Multi-buy",
        isPromoClustering: false
      },
      {
        promotypeId: 3,
        name: "Other types",
        isPromoClustering: false
      },
      {
        promotypeId: 4,
        name: "Promo Attr Promo List",
        isPromoClustering: false
      },
      {
        promotypeId: 5,
        name: "Promo Attr Promo Fixed",
        isPromoClustering: false
      }
    ])
  }
}
