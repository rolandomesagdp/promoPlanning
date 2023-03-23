import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '@pp-core/environment';
import { LocalStorageService } from '@pp-core/local-storage';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { IPromotionStatus } from './promotion-status.model';

@Injectable()
export class PromotionStatusService {
  private promotionStatusController: string;
  private _promotionStatus: IPromotionStatus[];

  get promotionStatus(): IPromotionStatus[] {
    if(!this._promotionStatus) {
      this._promotionStatus = this.localStorage.getPromotionStatus();
    }
    return this._promotionStatus;
  }

  constructor(environmentService: EnvironmentService, private httpClient: HttpClient, private localStorage: LocalStorageService) { 
    this.promotionStatusController = `${environmentService.getEnvironment().serverUrl}status`;
  }

  loadPromotionStatus(): Observable<void> {
    const url: string = `${this.promotionStatusController}/config`
    return this.getObservableStatus().pipe(
      concatMap((promotionStatus: IPromotionStatus[]) => {
        this.localStorage.setPromotionStatus(promotionStatus);
        return of(void 0);
      })
    )
  }

  private getObservableStatus(): Observable<IPromotionStatus[]> {
    return of([
      {
        statusId: 1,
        sequence: 1,
        statusValue: "Draft",
        isScoring: false,
        color: "#2b39f7"
      },
      {
        statusId: 2,
        sequence: 2,
        statusValue: "Under review",
        isScoring: false,
        color: "#f2a41c"
      },
      {
        statusId: 3,
        sequence: 3,
        statusValue: "Confirmed",
        isScoring: true,
        color: "#20b251"
      },
      {
        statusId: 4,
        sequence: 4,
        statusValue: "Cancelled",
        isScoring: false,
        color: "#b22020"
      },
      {
        statusId: 14,
        sequence: 5,
        statusValue: "Approved",
        isScoring: false,
        color: "#68d91c"
      },
      {
        statusId: 20,
        sequence: 6,
        statusValue: "Under validation",
        isScoring: false,
        color: "#b14cb8"
      },
      {
        statusId: 24,
        sequence: 9,
        statusValue: "Planned",
        isScoring: false,
        color: "#ffee05"
      },
      {
        statusId: 25,
        sequence: 8,
        statusValue: "Cancelled",
        isScoring: false,
        color: "#f61313"
      },
      {
        statusId: 27,
        sequence: 7,
        statusValue: "ApiTestingStatus",
        isScoring: false,
        color: "#ffffff"
      },
      {
        statusId: 29,
        sequence: 10,
        statusValue: "QA test",
        isScoring: true,
        color: "#04ff00"
      }
    ])
  }
}
