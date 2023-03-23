import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { PromotionSummaryService } from '@app/promotion-common';
import { IPromotionSummary } from '@app/promotion-common/promotion';
import { PromotionSimulationService } from '@app/promotion-common/promotion-simulation';
import { UnitOfMeasurement, UnitsOfMeasurementService } from '@pp-core/units-of-measurement';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pp-promotion-details-left-pannel',
  templateUrl: './promotion-details-left-pannel.component.html',
  styleUrls: ['./promotion-details-left-pannel.component.scss']
})
export class PromotionDetailsLeftPannelComponent implements OnChanges, OnDestroy {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  @Input() promotionId: string;
  promotionSummary: IPromotionSummary
  
  constructor(public promotionSummaryService: PromotionSummaryService,
    private unitOfMeasurementService: UnitsOfMeasurementService,
    private simulationService: PromotionSimulationService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
		if (this.promotionIdChanged(changes)) {
      this.loadPromotionSummary();
    }
  }

  loadPromotionSummary(): void {
    this.promotionSummary = null;
    const unitOfMeasurement: UnitOfMeasurement = this.unitOfMeasurementService.selectedUnitOfMeasurement;
    this.subscriptionManager.add(
      this.promotionSummaryService.getById(this.promotionId, unitOfMeasurement.id).pipe(
        tap((promotionSummary: IPromotionSummary) => {
          this.promotionSummary = {...promotionSummary };
        })).subscribe());
  }

  getBackgroundClass(): string {
    return this.simulationService.simulationIsActive ? "left-pannel-container-simulated" : "";
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

  private promotionIdChanged(changes: SimpleChanges): boolean {
    return changes['promotionId'] 
      && changes['promotionId'].currentValue 
      && changes['promotionId'].currentValue !== changes['promotionId'].previousValue
  }
}
