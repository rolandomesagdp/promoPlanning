import { UnitOfMeasurement, UnitsOfMeasurement } from "@pp-core/units-of-measurement";

export class UnitOfMeasurementSelectorSpecSetUp {
    constructor() { }

    get defaultUnitOfMeasurement(): UnitOfMeasurement {
        return this.availableUnitsOfMeasurement[0];
    }

    get availableUnitsOfMeasurement(): UnitOfMeasurement[] {
        return [{
            id: UnitsOfMeasurement.Units,
            name: "Units"
        },
        {
            id: UnitsOfMeasurement.UnitWeight,
            name: "Unit Weight"
        },
        {
            id: UnitsOfMeasurement.UnitVol,
            name: "Unit Volume"
        }
    ]
    }
}