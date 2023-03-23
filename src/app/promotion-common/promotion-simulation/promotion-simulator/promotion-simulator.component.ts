import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { PromotionPermissionsManager } from '@app/promotion-common/promotion-permissions/promotion-permissions-manager';
import { IPromotionBase } from '@app/promotion-common/promotion/promotion-base';
import { IPromotionSummary } from '../../promotion/promotion-summary.model';
import { UnitOfMeasurement, UnitsOfMeasurementService } from '@pp-core/units-of-measurement';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { NEVER, Observable } from 'rxjs';
import { catchError, concatMap, finalize, map, tap } from 'rxjs/operators';
import { PromotionSummaryService } from '../../promotion-service/promotion-summary.service';
import { PromotionSimulationService } from '../promotion-simulation.service';
import { SimulationResult } from '../simulation-resutl.model';

@Component({
  selector: 'pp-promotion-simulator',
  templateUrl: './promotion-simulator.component.html',
  styleUrls: ['./promotion-simulator.component.scss']
})
export class PromotionSimulatorComponent implements OnChanges, OnDestroy {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  @Input() promotion: IPromotionBase;
  @Output() simulationAccepted: EventEmitter<string> = new EventEmitter<string>();
  simulating: boolean = false;
  actingOnSimulation = false;
  promotionSummary: IPromotionSummary = null;

  constructor(private promotionSummaryService: PromotionSummaryService, private uomService: UnitsOfMeasurementService,
    public simulationService: PromotionSimulationService, public promotionPermissions: PromotionPermissionsManager) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.promotionSummary = null;
  }

  runSimulation(): void {
    this.simulating = true;
    this.promotionSummary = null;
    this.subscriptionManager.add(
      this.simulationService.runSimulation(this.promotion.promoId).pipe(
        concatMap((simulationResult: SimulationResult) => {
          return this.loadSimulatedPromotionSummary(simulationResult)
        }),
        tap((simulatedPromotionSummary: IPromotionSummary) => {
            this.promotionSummary = { ...simulatedPromotionSummary };
            this.simulating = false;
        }),
        catchError((error) => {
          this.simulating = false;
          return NEVER;
        })).subscribe());
  }

  acceptSimulation(): void {
    this.actingOnSimulation = true;
    this.subscriptionManager.add(
      this.simulationService.saveSimulation().pipe(
        concatMap(() => this.simulationService.endSimulation()),
        tap(() => {
          this.simulationService.snackBar.openSuccess("Simulation correctly applied");
          this.simulationAccepted.emit(this.promotion.promoId)
        }),
        finalize(() => this.onSimulationFinished())).subscribe());
  }

  rejectSimulation(): void {
    this.actingOnSimulation = true;
    this.subscriptionManager.add(
      this.simulationService.endSimulation().pipe(
        tap(() => this.simulationService.snackBar.openSuccess("Simulation correctly rejected")),
        finalize(() => this.onSimulationFinished())).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

  private onSimulationFinished(): void {
    this.actingOnSimulation = false; 
    this.promotionSummary = null;
  }

  private loadSimulatedPromotionSummary(simulationResult: SimulationResult): Observable<IPromotionSummary> {
    const unitOfMeasurement: UnitOfMeasurement = this.uomService.selectedUnitOfMeasurement;
    return this.promotionSummaryService.getById(this.promotion.promoId, unitOfMeasurement.id).pipe(
      map((promotionSummary: IPromotionSummary) => {
        promotionSummary.imageUrl = "assets/images/promotions/promotion_aceite_coosur.jpg";
        promotionSummary.upliftPercent = simulationResult.upliftPercent;
        return promotionSummary;
      }));
  }
}
