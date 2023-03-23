import { PpTableColumn, DynamicGridConfigurationService, TableConfigParams } from '@app/dynamic-grid-configuration';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { tap, catchError } from 'rxjs/operators';
import { NEVER } from 'rxjs';

export class CampaignTableColumnManager {
    loading: boolean = false;
    private dynamicColumns: Array<PpTableColumn> = [];
    private configuredColumns: string[] = [];
    private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();

    constructor(private dynamicGridConfigService: DynamicGridConfigurationService,
                private logService: LogService, private snackBar: SnackbarService) {}

    public getTableColumns() {
        this.loading = true;
        this.subscriptionManager.add(
            this.dynamicGridConfigService.getTableColumnsConfiguration(TableConfigParams.CAMPAIGN_TABLE).pipe(
                tap((columns: PpTableColumn[])=> {
                    this.dynamicColumns = columns.sort((a,b) => a.position - b.position);
                    this.configuredColumns = columns.map(c => c.property).concat('actions');
                    this.loading = false;
                }), 
                catchError((err) => {
                    this.snackBar.openError('Error in getting columns configuration !');
                    //this.logService.error('PromosTableComponent', 'getPrmotionTableColumnsConfig', 'Error in getting columns configuration', err);
                    return NEVER;
                }) 
            ).subscribe()
        ) 
    }

    get displayedColumns() {
        return this.configuredColumns;
    }

    public getColumnHeaderName(property: string): string {
		return this.dynamicColumns.find(d => d.property == property) ? this.dynamicColumns.find(d => d.property == property).columnHeader : '';
	}

    public destroy() {
        this.subscriptionManager.unsubscribe();
    }

}