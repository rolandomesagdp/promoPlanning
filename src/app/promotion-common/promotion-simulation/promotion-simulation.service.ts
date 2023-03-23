import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '@pp-core/environment';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { UnitOfMeasurement, UnitsOfMeasurementService } from '@pp-core/units-of-measurement';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, finalize, tap } from 'rxjs/operators';
import { PromotionService } from '../promotion-service/promotion.service';
import { IPromotion } from '../promotion/promotion.model';
import { SimulationResult } from './simulation-resutl.model';

@Injectable()
export class PromotionSimulationService {
  private className: string = "PromotionSimulationService";
  private currentSimulationId: number;
  private currentPromotionId: string;
  private simulationController: string;

  get simulationIsActive(): boolean {
    return this.currentSimulationId ? true : false;
  }

  get simulatedPromotion(): string {
    return this.currentPromotionId;
  }

  constructor(private httpClient: HttpClient, 
    environmentService: EnvironmentService,
    private promotionService: PromotionService,
    private uomService: UnitsOfMeasurementService,
    private logService: LogService,
    public snackBar: SnackbarService) {
		this.simulationController = `${environmentService.getEnvironment().serverUrl}simulation`;
	}

  runSimulation(promotionId: string): Observable<SimulationResult> {
    this.currentPromotionId = promotionId;
    const simulationUrl: string = `${this.simulationController}/run/unitOfMeasurement/${this.uomService.selectedUnitOfMeasurement.id}`;
    return this.promotionService.getById(promotionId).pipe(
      concatMap((promotion: IPromotion) => {
        return this.httpClient.post<number>(simulationUrl, promotion);
      }),
      concatMap((simulationId: number) => {
        this.currentSimulationId = simulationId;
        return this.getCurrentSimulationResult(simulationId, this.currentPromotionId, this.uomService.selectedUnitOfMeasurement);
      }),
      catchError(error => {
        const message: string = `There was an error during the simulation for promotion with id ${this.currentPromotionId}. Details: ${error.error}`;
        this.logErrorAndNotify("runSimulation", message, error);
        this.deactivateCurrentSimulation();
        return throwError(message);
      })
    )
  }

  saveSimulation(): Observable<null> {
    const url = `${this.simulationController}/save/simulationId/${this.currentSimulationId}/promotionId/${this.currentPromotionId}/unitOfMeasurement/${this.uomService.selectedUnitOfMeasurement.id}`;
    return this.httpClient.post<null>(url, null).pipe(
      catchError(error => {
        const message: string = `There was an error trying to save simulation for promotion with id ${this.currentPromotionId}. Details: SimulationId: ${this.currentSimulationId}. Error: ${error.error}`;
        this.logErrorAndNotify("saveSimulation", message, error);
        return throwError(message);
      }),
      finalize(() => this.deactivateCurrentSimulation()));
  }

  endSimulation(): Observable<number> {
    const url = `${this.simulationController}/result/simulationId/${this.currentSimulationId}/promotionId/${this.currentPromotionId}`;
    return this.httpClient.delete<number>(url).pipe(
      catchError(error => {
        const message: string = `There was an error trying to end simulation for promotion with id ${this.currentPromotionId}. Details: SimulationId: ${this.currentSimulationId}. Error: ${error.error}`;
        this.logErrorAndNotify("endSimulation", message, error);
        return throwError(message);
      }),
      finalize(() => this.deactivateCurrentSimulation()));
  }

  private deactivateCurrentSimulation(): void {
    this.currentSimulationId = 0;
    this.currentPromotionId = "";
  }

  private getCurrentSimulationResult(simulationId: number, promotionId: string, uom: UnitOfMeasurement): Observable<SimulationResult> {
    const resultUrl: string = `${this.simulationController}/result/total/simulationId/${simulationId}/promotionId/${promotionId}/unitOfMeasurement/${uom.id}`;
    return this.httpClient.get<SimulationResult>(resultUrl);
  }

  private logErrorAndNotify(functionName: string, message: string, logParam: any): void {
    this.logService.error(this.className, functionName, message, logParam);
    this.snackBar.openError(message);
  }
}
