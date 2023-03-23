import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImportTypeConfig } from './import-type';
import { ImportTable, TableNames } from '@app/configuration/data-import/import-table';
import { EnvironmentService } from '@pp-core/environment';

@Injectable()
export class PromotionImportService {

	private importControllerUrl: string;

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) { 
    this.importControllerUrl = `${this.environmentService.getEnvironment().serverUrl}import`;
  }

	getMasterDataConfig(): Observable<ImportTable[]> {
    const getMasterDataConfigUrl = `${this.importControllerUrl}/importMasterDataConfiguration`;
		return this.httpClient.get<ImportTable[]>(getMasterDataConfigUrl);
  }

	saveMasterDataConfig(data: ImportTable): Observable<number> {
    const saveMasterDataConfigUrl = `${this.importControllerUrl}/importMasterDataConfiguration`;
		return this.httpClient.post<number>(saveMasterDataConfigUrl, data);
  }

  getImportTypeConfiguration(): Observable<ImportTypeConfig[]> {
    const importTypeConfigurationUrl = `${this.importControllerUrl}/importTypeConfiguration`;
    return this.httpClient.get<ImportTypeConfig[]>(importTypeConfigurationUrl);
  }

  getTableImportTypeConfiguration(tableName: string): Observable<ImportTypeConfig> {
    const tableImportTypeConfigurationUrl = `${this.importControllerUrl}/importTypeConfiguration/${tableName}`;
    return this.httpClient.get<ImportTypeConfig>(tableImportTypeConfigurationUrl);
  }

  saveImportTypeConfiguration(importData: ImportTypeConfig): Observable<ImportTypeConfig> {
    const saveImportTypeConfigurationUrl = `${this.importControllerUrl}/importTypeConfiguration`;
    return this.httpClient.put<ImportTypeConfig>(saveImportTypeConfigurationUrl, importData);
  }

  importExternalPromos(tableName: TableNames): Observable<void> {
    const importExternalPromosUrl = `${this.importControllerUrl}/externalPromos/${tableName}`;
    return this.httpClient.get<void>(importExternalPromosUrl);
  }

  getImportForecastDemandValues(): Observable<string[]> {
    const url = `${this.importControllerUrl}/ForecastDemand/values`;
    return this.httpClient.get<string[]>(url);
  }

  importForecastDemand(importTypeName: string): Observable<void> {
    const url = `${this.importControllerUrl}/ForecastDemand/${importTypeName}`;
    return this.httpClient.get<void>(url);
  }

}
