import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromotionImportService } from '@app/configuration/data-import/promotion-import/promotion-import.service';
import { ImportType, ImportTypeConfig } from '../import-type';
import { CheckboxOption } from './checkbox.model';
import { PromotionImportForm } from './promotion-import.form';
import { Observable } from 'rxjs';
import { SnackbarService } from '@pp-core/snackbar';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { LogService } from '@pp-core/logging';

@Component({
  selector: 'pp-promotion-import-edit',
  templateUrl: './promotion-import-edit.component.html',
  styleUrls: ['./promotion-import-edit.component.scss']
})
export class PromotionImportEditComponent implements OnInit, OnDestroy {

  importTypeConfig: ImportTypeConfig = this.data;
  importTableTypeConfig: ImportTypeConfig;
  checkboxOptions: CheckboxOption[];
  promotionImportForm: PromotionImportForm = new PromotionImportForm(this.fb, this.importTypeConfig);
  loading: boolean = false;
  errorMessage: string;
  subscriptionManager: SubscriptionsManager = new SubscriptionsManager();

  constructor(@Inject(MAT_DIALOG_DATA) public data: ImportTypeConfig, public dialogRef: MatDialogRef<PromotionImportEditComponent>,
  public importService: PromotionImportService, public snackbarService: SnackbarService, private fb: FormBuilder, public logService: LogService) {}

  ngOnInit() {
    this.checkboxOptions = this.createCheckboxOptions();
    this.promotionImportForm.build();
    this.getTableImportTypeConfiguration();
  }

  createCheckboxOptions(): CheckboxOption[] {
    return [
      { title: 'Insert new records only', value: ImportType.IMPORT_ONLY_NEW},
      { title: 'Insert new records and override existing ones', value: ImportType.IMPORT_AND_OVERRIDE}
      // { title: 'Delete all the records before the import', value: ImportType.DELETE_BEFORE_IMPORT}
    ]
  }

  getTableImportTypeConfiguration() {
    this.loading = true;
      this.subscriptionManager.add(
        this.importService.getTableImportTypeConfiguration(this.importTypeConfig.importTable).subscribe((config) => {
          this.importTableTypeConfig = config;
          this.loading = false;
        }, err => {
          this.loading = false;
          this.errorMessage = 'Error in loading page !';
          this.logService.error('PromotionImportEditComponent', 'getTableImportTypeConfiguration', 'err in getting table import config', err);
        })
      )
  }

  importTable(): void {
    this.loading = true;
    this.subscriptionManager.add(
      this.importService.importExternalPromos(this.importTypeConfig.importTable).subscribe(() => {
        this.loading = false;
        this.snackbarService.openSuccess(`Imported ${this.importTypeConfig.importTable} table successfully`)
      }, err => {
        this.loading = false;
        this.logService.error('PromotionImportEditComponent', 'importTable', 'err in importing table', err);
        this.snackbarService.openError(`Table ${this.importTypeConfig.importTable} not imported`);
      })
    );
  }

  saveImportData(): void {
    this.loading = true;
    const importData: ImportTypeConfig = {...this.importTypeConfig, importType: this.promotionImportForm.importType.value};
    this.subscriptionManager.add(
      this.importService.saveImportTypeConfiguration(importData).subscribe(() => {
        this.loading = false;
        this.snackbarService.openSuccess(`Successfully Updated`);
        this.dialogRef.close(importData);
      }, err => {
        this.loading = false;
        this.logService.error('PromotionImportEditComponent', 'saveImportData', 'err in saving data', err);
        this.snackbarService.openError(`Not updated`);
        this.dialogRef.close();
      })
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }

}
