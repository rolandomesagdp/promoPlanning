import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from "@environments/environment";

@Injectable()
export class PromotionLockService {
  promotionLockController: string;

  constructor(private httpClient: HttpClient) { 
    this.promotionLockController = `${environment.serverUrl}promos`;
  }

  lockPromotion(promotionId: string): Observable<void> {
    const url: string = `${this.promotionLockController}/lock/promotionId/${promotionId}`;
    //return this.httpClient.get<void>(url);
    return of(null);
  }

  unlockPromotion(promotionId: string): Observable<void> {
    const url: string = `${this.promotionLockController}/unlock/promotionId/${promotionId}`;
    // return this.httpClient.get<void>(url);
    return of(null);
  }

  requestPromotionUnlock(promotionId: string): Observable<void> {
    const url: string = `${this.promotionLockController}/requestUnlock/promotionId/${promotionId}`;
    return this.httpClient.get<void>(url);
  }

  forcePromotionUnlock(promotionId: string): Observable<void> {
    const url: string = `${this.promotionLockController}/forceUnlock/promotionId/${promotionId}`;
    return this.httpClient.get<void>(url);
  }
}
