import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PromotionImportService } from '../promotion-import.service';
import { PromotionImportEditComponent } from '../promotion-import-edit/promotion-import-edit.component';
import { PromotionImportViewModel } from './promotion-import-list-view.model';
import { ImportType, ImportTypeConfig } from '../import-type';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { SnackbarService } from '@pp-core/snackbar';
import { PromotionImportDetailsComponent } from '../promotion-import-details/promotion-import-details.component';
import { Column, TableNames } from '@app/configuration/data-import/import-table';
import { LogService } from '@pp-core/logging';

@Component({
  selector: 'pp-promotion-import-list',
  templateUrl: './promotion-import-list.component.html',
  styleUrls: ['./promotion-import-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionImportListComponent implements OnDestroy {

  promotionImportVM: PromotionImportViewModel = new PromotionImportViewModel(this.importService);
  displayedColumns: string[] = [ 'description', 'insert_new_record_only', 'insert_and_overwrite', 'action'];
  column = Column;
  title: string = "Promotions Import";
  //loading: boolean = false;
  dialogRef: MatDialogRef<PromotionImportEditComponent>;

  subscriptionManager: SubscriptionsManager = new SubscriptionsManager();

  ImportTypes = ImportType;

  constructor(public importService: PromotionImportService, public snackbarService: SnackbarService, public dialog: MatDialog, public logService: LogService) { }

  importAllExternalPromos(): void {
    this.promotionImportVM.loading = true;
    this.subscriptionManager.add(
      this.importService.importExternalPromos(TableNames.All).subscribe(() => {
        this.promotionImportVM.loading = false;
        this.snackbarService.openSuccess('Imported all table successfully');
      }, err => {
        this.promotionImportVM.loading = false;
        this.logService.error('PromotionImportListComponent', 'importAllExternalPromos', 'err in table import', err);
        this.snackbarService.openError('Tables are not imported');
      })
    );
  }

  edit(importCofigData: ImportTypeConfig) {
    const dialogConfig = { height: '320px', width: '750px', autoFocus: false, data: importCofigData };
    this.dialogRef = this.dialog.open(PromotionImportEditComponent, dialogConfig);
    this.subscriptionManager.add(this.dialogRef.afterClosed().subscribe((importCofigData: ImportTypeConfig) => 
                                this.promotionImportVM.importConfigEdited$.next(importCofigData)));
  }

  import(importCofigData: ImportTypeConfig) {
    this.promotionImportVM.loading = true;
    this.subscriptionManager.add(
      this.importService.importExternalPromos(importCofigData.importTable).subscribe(() => {
        this.promotionImportVM.loading = false;
        this.snackbarService.openSuccess(`Imported ${importCofigData.importTable} table successfully`);
      }, err => {
        this.promotionImportVM.loading = false;
        this.logService.error('PromotionImportListComponent', 'import', 'err in import table', err);
        this.snackbarService.openError(`Table ${importCofigData.importTable} not imported`);
      })
    )
  }

  showDetails(importCofigData: ImportTypeConfig) {
    const dialogConfig = { height: '380px', width: '750px', autoFocus: false, data: importCofigData};
    this.dialog.open(PromotionImportDetailsComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }
}
