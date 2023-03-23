import { PpTableColumn } from '@app/dynamic-grid-configuration';


export class DefaultColumnConfiguration {

    get totalColumns(): PpTableColumn[] {
        return [
            { position: 1, columnHeader: 'Name', property: 'name' }
        ]
    }

}