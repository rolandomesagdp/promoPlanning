import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { UnitOfMeasurement } from "./unit-of-measurement";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "@pp-core/local-storage";
import { UnitsOfMeasurement } from "./units-of-measurement.enum";

@Injectable()
export class UnitsOfMeasurementService {
    private unitsOfMeasurementControllerUrl: string = `${environment.serverUrl}promos`;
    private _selectedUnitOfMeasurement: UnitOfMeasurement;

    availableUnitsOfMeasurement: UnitOfMeasurement[];

    get selectedUnitOfMeasurement(): UnitOfMeasurement {
        return this._selectedUnitOfMeasurement; 
    }

    set selectedUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement) {
        this._selectedUnitOfMeasurement = unitOfMeasurement;
        this.localStorage.setSelectedUniOfMeasurement(this.selectedUnitOfMeasurement);
    }

    constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

    getUnitOfMeasurementById(unitOfMeasurementId: UnitsOfMeasurement): UnitOfMeasurement {
        return this.availableUnitsOfMeasurement.find(x => x.id === unitOfMeasurementId);
    }

    loadUnitsOfMeasurement(): Observable<UnitOfMeasurement[]> {
        if(this.localStorage.getAvailableUnitsOfMeasurement()) {
            this.availableUnitsOfMeasurement = this.localStorage.getAvailableUnitsOfMeasurement();
            this.setCurrentSelectionOrDefault()
            return of(this.availableUnitsOfMeasurement);
        }
        else {
            const getUnitsOfMeasurementUrl = `${this.unitsOfMeasurementControllerUrl}/unitsOfMeasurement`;
            return this.getObservableUnitsOfMeasurement().pipe(
                tap((unitsOfMeasurement: UnitOfMeasurement[]) => {
                    this.localStorage.setAvailableUnitsOfMeasurement(unitsOfMeasurement);
                    this.availableUnitsOfMeasurement = unitsOfMeasurement;
                    this.setCurrentSelectionOrDefault();
                })
            );
        }
    }

    private setCurrentSelectionOrDefault(): void {
        let storedSelection: UnitOfMeasurement = this.localStorage.getSelectedUnitOfMeasurement();
        if(!storedSelection) {
            storedSelection = this.availableUnitsOfMeasurement[0];
            this.localStorage.setSelectedUniOfMeasurement(storedSelection);
        }
        this._selectedUnitOfMeasurement = storedSelection;
    }

    private getObservableUnitsOfMeasurement(): Observable<UnitOfMeasurement[]> {
        return of([
            {
              id: 1,
              name: "Units"
            },
            {
              id: 2,
              name: "UnitCost"
            },
            {
              id: 6,
              name: "ListPrice"
            },
            {
              id: 3,
              name: "UnitVol"
            },
            {
              id: 5,
              name: "UnitCube"
            },
            {
              id: 4,
              name: "UnitWeight"
            },
            {
              id: 8,
              name: "HandlQty"
            },
            {
              id: 7,
              name: "MinSalsLot"
            },
            {
              id: 9,
              name: "LayerQty"
            },
            {
              id: 10,
              name: "PalletQty"
            }
          ])
    }
}