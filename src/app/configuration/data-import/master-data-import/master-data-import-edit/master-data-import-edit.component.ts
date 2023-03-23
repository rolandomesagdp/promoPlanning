import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ImportTable } from '@app/configuration/data-import/import-table';
import { MasterDataService } from '@app/configuration/data-import/master-data-import/master-data.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '@pp-core/snackbar';
import { MasterDataDetailForm } from '@app/configuration/data-import/master-data-import/master-data-import-edit/master-data-detail.form';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { LogService } from '@pp-core/logging';

@Component({
  selector: 'pp-master-data-import-edit',
  templateUrl: './master-data-import-edit.component.html',
  styleUrls: ['./master-data-import-edit.component.scss']
})
export class MasterDataImportEditComponent implements OnInit, OnDestroy {

  masterDataImportForm: MasterDataDetailForm = new MasterDataDetailForm(this.fb, this.importTableData);
  public subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  
  loading: boolean = false;
  errorMessage: string = 'error in loading page !';

  constructor(@Inject(MAT_DIALOG_DATA) public importTableData: ImportTable,
              public dialogRef: MatDialogRef<MasterDataImportEditComponent>,
              private importService: MasterDataService,
              private snackbarService: SnackbarService,
              private fb: FormBuilder,
              private logService: LogService) { }

  ngOnInit(): void {
    this.masterDataImportForm.build();
  }

  saveSQLDefinition(): void {
    const importTableData: ImportTable = { ...this.importTableData, importSql: this.masterDataImportForm.importMasterData.value }
    this.loading = true;
    this.subscriptionManager.add(
      this.importService.saveMasterDataConfig(importTableData).subscribe(() => {
        this.loading = false;  
        this.snackbarService.openSuccess('Configuration Saved');
        this.dialogRef.close(importTableData);
      }, err => {
        this.loading = false;
        this.snackbarService.openError('Error in saving Configuration !');
        this.logService.error('MasterDataImportEditComponent', 'saveSQLDefinition', 'save defination error', err);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }

}
