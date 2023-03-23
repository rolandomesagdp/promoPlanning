import { HttpClient } from '@angular/common/http';
import { IPromotion } from '@app/promotion-common';
import { EnvironmentService } from '@pp-core/environment';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ExportPromotion } from './promotion-export.model';

export class PromotionExport {
  private promotionExportController: string;
  csvContent: string;
  exportPromotionData: ExportPromotion;
  fileName: string;

  get promotionId(): string {
    return this._promotionId;
  }

  get promotionName(): string {
    return this._promotionName
  }

  constructor(private _promotionId: string, private _promotionName: string, 
    public snackbarService: SnackbarService, public logService: LogService, 
    public httpClient: HttpClient, public environmentService: EnvironmentService) {
    this.promotionExportController = `${this.environmentService.getEnvironment().serverUrl}promos`;
    this.fileName = `${this.promotionName}.csv`;
  }

  executeExport(promotion: IPromotion): Observable<void> {
    return this.setExportPromotionData().pipe(
      concatMap(() => {
        this.generateCSVContent();
        this.downloadCSVFile();
        this.snackbarService.openSuccess(`Promotion ${promotion.name} successfully exported to file ${this.fileName}.`);
        return of(void 0);
      }),
      catchError(error => {
        const message: string = `There was an error while trying to export Promotion ${promotion.name}. Details: ${error}`;
        this.snackbarService.openError(message);
        this.logService.error("PromotionFormHeaderActionsComponent", "onExportPromotionClicked", message, error);
        return of(NEVER)
      })
    );
  }

  // Only test the return type: ExportPromotion and not ExportPromotion[]
  getExportPromotionData(): Observable<ExportPromotion> {
    const exportDataUrl = `${this.promotionExportController}/exportData/${this.promotionId}`;
    return this.httpClient.get<ExportPromotion[]>(exportDataUrl).pipe(map((exportPromotion: ExportPromotion[]) => exportPromotion[0]));
  }

  setExportPromotionData(): Observable<ExportPromotion> {
    return this.getExportPromotionData().pipe(
      concatMap((exportPromotion: ExportPromotion) => {
        if (exportPromotion) {
          this.exportPromotionData = exportPromotion;
          return of(this.exportPromotionData);
        } 
        else {
          this.snackbarService.openError(`API returned empty response`);
          return throwError('API returned empty response');
        }
      }),
      catchError(error => {
        this.logService.error('PromotionExport', 'setExportPromotionData', 'API did not return any data', error);
        this.snackbarService.openError(`API did not return any data`);
        return throwError('API did not return any data');
      })
    )
  }

  generateCSVContent(): void {
    if (this.exportPromotionData && this.exportPromotionData.promo) {
      const separator = ',';
      const keys = Object.keys(this.exportPromotionData);
      const dataRow = keys.map(k => this.exportPromotionData[k]).join(',');
      this.csvContent = keys.join(separator) + '\n' + dataRow;
    } else {
      this.snackbarService.openWarn(`There is no export promotion data to generate CSV`);
    }
  }

  downloadCSVFile(): void {
    if (this.csvContent) {
      const blob = new Blob([this.csvContent], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, this.fileName);
      } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
          // Browsers that support HTML5 download attribute
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', this.fileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } else {
      this.snackbarService.openWarn(`There is no CSV data to download`);
    }
  }

}
