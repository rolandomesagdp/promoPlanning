import { TableNames } from '@app/configuration/data-import/import-table';

export class ImportTable {
    id: number;
    tableName: TableNames;
    description: string;
    importSql: string;

    constructor() {}
}
