import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UnitsOfMeasurement, UnitsOfMeasurementService } from '@pp-core/units-of-measurement';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { tap } from 'rxjs/operators';
import { UnitOfMeasurement } from '../unit-of-measurement';

@Component({
  selector: 'pp-unit-of-measurement-selector',
  templateUrl: './unit-of-measurement-selector.component.html',
  styleUrls: ['./unit-of-measurement-selector.component.scss']
})
export class UnitOfMeasurementSelectorComponent implements OnDestroy {
  private subscriptionsManager: SubscriptionsManager = new SubscriptionsManager();
  unitOfMeasurement: FormControl = new FormControl();

  constructor(public unitsOfMeasurementService: UnitsOfMeasurementService) { }

  ngOnInit(): void {
    this.subscriptionsManager.add(
      this.unitsOfMeasurementService.loadUnitsOfMeasurement().pipe(
        tap(() => {
          this.unitOfMeasurement.setValue(this.unitsOfMeasurementService.selectedUnitOfMeasurement.id)
        })
      ).subscribe());

    this.subscriptionsManager.add(
      this.unitOfMeasurement.valueChanges.pipe(
        tap((unitOfMeasurementId: UnitsOfMeasurement) => this.updateGlobalSelection(unitOfMeasurementId))
      ).subscribe());
  }

  getTestingId(uom: UnitOfMeasurement): string {
    return `${uom.id}-${uom.name}`.replace(/\s/g, "").toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptionsManager.unsubscribe();
  }

  private updateGlobalSelection(unitOfMeasurementId: UnitsOfMeasurement): void {
    const newSelection: UnitOfMeasurement = this.unitsOfMeasurementService.getUnitOfMeasurementById(unitOfMeasurementId);
    this.unitsOfMeasurementService.selectedUnitOfMeasurement = newSelection;
  }
}
