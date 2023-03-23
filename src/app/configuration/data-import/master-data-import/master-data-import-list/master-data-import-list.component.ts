import { Component, OnInit } from '@angular/core';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MasterDataService } from '../master-data.service';
import { SnackbarService } from '@pp-core/snackbar';
import { TableNames, ImportTable } from '@app/configuration/data-import/import-table';
import { MasterDataImportEditComponent } from '@app/configuration/data-import/master-data-import/master-data-import-edit/master-data-import-edit.component';
import { LogService } from '@pp-core/logging';

@Component({
  selector: 'pp-master-data-import-list',
  templateUrl: './master-data-import-list.component.html',
  styleUrls: ['./master-data-import-list.component.scss']
})
export class MasterDataImportListComponent implements OnInit {

  title: string = 'Master Data';
  subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  columnsToDisplay: string[] = ["tableName", "importSql", "actions"];
  loading: boolean = false;
  masterDataImportConfig: ImportTable[];
  TableNames = TableNames;
  errorMessage: string;

  constructor(public importService: MasterDataService, private snackbarService: SnackbarService, public dialog: MatDialog, public logService: LogService) {}

  ngOnInit() {
    this.getMasterDataConfig();
  }

  getMasterDataConfig(): void {
    this.loading = true;
    this.subscriptionManager.add(
      this.importService.getMasterDataConfig().subscribe(config => {
      this.masterDataImportConfig = config;
        this.loading = false;
      }, err => {
        this.loading = false;
        this.errorMessage = `Error in loading page--${err.message}`;
        this.logService.error('MasterDataImportListComponent', 'getMasterDataConfig', 'getting config error', err);
      }));
  }
  
  edit(masterImportCofigData: ImportTable): void {
    const dialogConfig: MatDialogConfig = { height: '400px', width: '850px', autoFocus: false, disableClose: true, data: masterImportCofigData };
    const dialogRef = this.dialog.open(MasterDataImportEditComponent, dialogConfig);

    this.subscriptionManager.add(
      dialogRef.afterClosed().subscribe((editedData: ImportTable) => {
        let index = this.masterDataImportConfig.findIndex(m => m.id == editedData.id);
        if(index > 0) {
          this.masterDataImportConfig[index] = {...editedData};
          this.masterDataImportConfig = [...this.masterDataImportConfig];
        }
      }));
  }

  import(tableName: TableNames): void {
    this.loading = true;
      this.subscriptionManager.add(this.importService.importMasterData(tableName).subscribe(() => {
        this.loading = false;
        this.snackbarService.openSuccess(`Table ${tableName} imported`);
      }, err => {
        this.loading = false;
        this.logService.error('MasterDataImportListComponent', 'import', 'not imported', err);
        this.snackbarService.openError(`Table ${tableName} not imported !`);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

}
