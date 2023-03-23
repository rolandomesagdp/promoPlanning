import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AttributesService } from '@app/attributes/attributes.service';
import { IPromotion, PromotionPermissionsManager, PromotionService } from '@app/promotion-common';
import { PromotionActionsManager } from '@app/promotion-common/promotion-actions/promotion-actions.manager';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'pp-promotion-details-right-pannel',
  templateUrl: './promotion-details-right-pannel.component.html',
  styleUrls: ['./promotion-details-right-pannel.component.scss']
})
export class PromotionDetailsRightPannelComponent implements OnInit, OnChanges, OnDestroy {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  private promotionIdChangeSubject$: Subject<string> = new Subject<string>();
  private promotionIdChangedEvent$: Observable<string> = this.promotionIdChangeSubject$.asObservable();

  @Input() promotionId: string;

  private promotion$: Observable<IPromotion> = this.promotionIdChangedEvent$.pipe(
    concatMap((promotionId: string) => this.promotionService.getById(promotionId)),
    tap((promotion: IPromotion) => {
      this.promotionPermissions.promotion = {...promotion }
    })
  );

  viewModel$ = this.promotion$.pipe(
    concatMap((promotion: IPromotion) => {
      return combineLatest(
        of(promotion),
        this.attributesService.getAttributes(promotion.promoTypeId))
    }),
    map(([promotion, attributes]) => {
      return {
        promotion,
        attributes
      }}));

  constructor(private promotionService: PromotionService,
    private attributesService: AttributesService,
    public promotionPermissions: PromotionPermissionsManager,
    public actions: PromotionActionsManager) { }
  
  ngOnInit(): void {
    this.subscriptionManager.add(this.actions.promotionEdited$.pipe(
      tap((promotion: IPromotion) => this.onPromotionEdited(promotion))).subscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
		if (this.promotionIdChanged(changes)) {
      this.promotionIdChangeSubject$.next(this.promotionId);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

  private onPromotionEdited(promotion: IPromotion): void {
    if(promotion) {
      this.promotionIdChangeSubject$.next(promotion.promoId)
    }
  }

  private promotionIdChanged(changes: SimpleChanges): boolean {
    return changes['promotionId'] 
      && changes['promotionId'].currentValue 
      && changes['promotionId'].currentValue !== changes['promotionId'].previousValue
  }
}
