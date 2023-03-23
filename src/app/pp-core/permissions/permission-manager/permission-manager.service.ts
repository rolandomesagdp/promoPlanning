import { Injectable } from '@angular/core';
import { Permission } from '@pp-core/permissions/permission.model';
import { LocalStorageService } from '@pp-core/local-storage';
import { PermissionsMasterHttpService } from '@pp-core/permissions/permissions-master-http.service/permissions-master-http.service';

@Injectable()
export class PermissionManagerService {

  private disabledAttributes: string[] = [];
  private disabledPermissions: string[] = [];
  private permissionsMap: Map<string, number> = new Map();
 
  constructor(private localStorageService: LocalStorageService,
              private permissionMasterService: PermissionsMasterHttpService) { }

   public setDisabledAttributes(attributes: string[]): void {
    this.disabledAttributes = [...attributes];
   }

   public setDisabledPermissions(): void {
    this.getDefaultPermissions();
    this.disabledPermissions = [...this.localStorageService.getDisabledPermissions()];
   }

  public isAllowedPermission(permission: string, statusId?: number): boolean {
    return true;
  }

  private getDefaultPermissions() {
    this.permissionMasterService.getPermissionsMasterData().subscribe(res => {
      console.log(res);
    })
  }

  private setPermissionMap(permissions: Array<Permission>) {
    permissions.forEach((p: Permission) => {
      this.permissionsMap.set(p.name, p.id);
    });
  }

}
