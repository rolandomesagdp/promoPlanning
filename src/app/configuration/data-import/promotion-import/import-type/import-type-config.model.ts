import { ImportType } from "./import-type.enum";
import { TableNames } from '@app/configuration/data-import/import-table';

export interface ImportTypeConfig {
    description: string;
    importTable: TableNames;
    sourceDB: string;
    sourceTable: string;
    importType: ImportType;
}
