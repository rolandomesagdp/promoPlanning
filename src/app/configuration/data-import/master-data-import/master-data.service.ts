import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableNames, ImportTable } from '@app/configuration/data-import/import-table';
import { EnvironmentService } from '@pp-core/environment';

@Injectable()
export class MasterDataService {

  private importControllerUrl: string;

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) {
    this.importControllerUrl = `${this.environmentService.getEnvironment().serverUrl}import`;
  }

  getMasterDataConfig(): Observable<ImportTable[]> {
    const getMasterDataConfigUrl = `${this.importControllerUrl}/importMasterDataConfiguration`;
		return this.httpClient.get<ImportTable[]>(getMasterDataConfigUrl);
  }

  importMasterData(tableName: TableNames): Observable<void> {
    const importMasterDataUrl = `${this.importControllerUrl}/masterData/${tableName}`;
    return this.httpClient.get<void>(importMasterDataUrl);
  }

  saveMasterDataConfig(data: ImportTable): Observable<number> {
    const saveImportDataUrl = `${this.importControllerUrl}/importMasterDataConfiguration`;
		return this.httpClient.post<number>(saveImportDataUrl, data);
  }

}
