import { TableNames } from "../../import-table";
import { ImportType, ImportTypeConfig } from "../import-type";

export class PromotionImportDetailsComponentSpecSetup {
    constructor() {}

    getImportTypeConfig(): ImportTypeConfig {
        return {
            description: "Some Description",
            importTable: TableNames.AttributesCampaign,
            sourceDB: "someDB",
            sourceTable: "someTable",
            importType: ImportType.IMPORT_AND_OVERRIDE
        }
    }  
    
}