import { PpTableColumn } from '@app/dynamic-grid-configuration';

export type Alignment = "left" | "right";
export type DataType = "string" | "number" | "date";


export class CalenderDynamicColumn implements PpTableColumn {
    position: number;
    columnHeader: string;
    property: string;
    dataType: DataType;
    alignment: Alignment;
    format: string;
    cellTemplate: string;

    private constructor() { }

    static build(tableColumn: PpTableColumn): CalenderDynamicColumn {
        let col = new CalenderDynamicColumn();
        col.position = tableColumn.position;
        col.columnHeader = tableColumn.columnHeader;
        col.property = tableColumn.property;
        col.alignment = 'right';
        col.format = '';
                
        switch(tableColumn.property) {
            case 'name' : {
                col.dataType = "string";
                col.alignment = "left";
            }
            break;

            case 'numberOfPromos' : {
                col.dataType = "number";
            }
            break;

            case 'units' : {
                col.dataType = "number";
                col.format = "formatNumber";
            }
            break;

            case 'uplift' : {
                col.dataType = "number";
                col.format = "formatPercentNumber";
                col.cellTemplate ="custom-uplift";
            }
            break;

            case 'approvedParticipantsStatus' : {
                col.cellTemplate ="custom-approved-status";
            }
            break;

            case 'upliftQty' : {
                col.dataType = "number";
                col.format = "formatNumber";
            }
            break;

            case 'numberOfParticipants' : {
                col.dataType = "number";
                col.format = "fixedPoint";
            }
            break;
            
        }

        return col;
    }

}