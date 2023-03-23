import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@pp-core/environment';
import { Observable } from 'rxjs';
import { Permission } from '@pp-core/permissions/permission.model';

@Injectable()
export class PermissionsMasterHttpService {

  private masterUrl: string;

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) {
    this.masterUrl = `${this.environmentService.getEnvironment().serverUrl}config/permissions`;
  }

  getPermissionsMasterData(): Observable<Permission[]> {
    const url = `${this.masterUrl}/masterData`;
		return this.httpClient.get<Permission[]>(url);
  }
}
