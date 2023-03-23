import { TableNames } from "../../import-table";
import { ImportType, ImportTypeConfig } from "../import-type";

export class PromotionImportListComponentSpecSetup {
    constructor() { }

    getImportTypeConfig(): ImportTypeConfig {
        return {
            description: "Some Description",
            importTable: TableNames.AttributesCampaign,
            sourceDB: "someDB",
            sourceTable: "someTable",
            importType: ImportType.IMPORT_AND_OVERRIDE
        }
    }

    getDialogConfig() { 
        return { 
            height: '320px',
            width: '750px',
            autoFocus: false,
            data: this.getImportTypeConfig() 
        }
    };

}