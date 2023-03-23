import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@pp-core/environment';
import { Observable, of } from 'rxjs';
import { TableConfigParams } from '@app/dynamic-grid-configuration/table-config-params.types';
import { PpTableColumn } from '@app/dynamic-grid-configuration/table-column.model';

@Injectable()
export class DynamicGridConfigurationService {

  private configController: string;

  constructor(private httpClient: HttpClient, environmentService: EnvironmentService) {
		this.configController =  `${environmentService.getEnvironment().serverUrl}config`;
	}

  getTableColumnsConfiguration(tableConfigType: TableConfigParams): Observable<Array<PpTableColumn>> {
		const url = `${this.configController}/gridConfiguration/${tableConfigType}`;
		return of([
			{
				position: 1,
				columnHeader: "Promotion Name",
				property: "name"
			},
			{
				position: 2,
				columnHeader: "Status",
				property: "status"
			},
			{
				position: 5,
				columnHeader: "Uplift %",
				property: "upliftPercent"
			}
		]);
	}
}
