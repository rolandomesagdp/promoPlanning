import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { LoginModel } from '../..';
import { LocalStorageService } from '@pp-core/local-storage/local-storage.service';
import { LogService } from '@pp-core/logging';
import { EnvironmentService } from '@pp-core/environment';
import {​​ PermissionManagerService }​​ from '@pp-core/permissions/permission-manager/permission-manager.service';
import { PpUser } from '../pp-user.model';
import { UserType } from '../user-type.enum';

@Injectable()
export class UserAccountService {
  private _currentUser: PpUser;
  private className: string = "UserAccountService";
  private accountControllerUrl;
  private authControllerUrl;

  get currentUser(): PpUser {
    if (!this._currentUser)
      this._currentUser = this.localStorage.getUser();
    return this._currentUser;
  }

  get userIsAdmin(): boolean {
    return this.currentUser ? this.currentUser.admin : false;
  }

  get userIsPlanner(): boolean {
    return true;
  }

  constructor(public permissionManager: PermissionManagerService, private httpClient: HttpClient, private logger: LogService, 
    private localStorage: LocalStorageService, environmentService: EnvironmentService) { 
      this.accountControllerUrl = `${environmentService.getEnvironment().serverUrl}Account`;
      this.authControllerUrl = `${environmentService.getEnvironment().serverUrl}`;
    }

  loginWithForm(userData: LoginModel): Observable<any> {
    return of({
      status: {
        code: 200
      }
    })
  }

  getUser(): Observable<PpUser> {
    return this._currentUser ? of(this._currentUser) : this.getCurrentUserFromServer();
  }

  clearCurrentUser(): void {
    this._currentUser = null;
    this.localStorage.clearStorage();
  }

  private getCurrentUserFromServer(): Observable<PpUser> {
    return of({
      userId: 123,
      userName: 'rmesa',
      email: 'rmesa@gdp.com',
      firstName: 'Rolando',
      lastName: 'Mesa',
      disabledPermissions: [],
      clientDisabledPermissions: '',
      disabledAttributes: [],
      userGroups: [],
      blacklistStatusIds: [],
      admin: true,
      userType: UserType.dataEntry,
      auth: {
        token: 'someverylargetoken',
        uuid: 'someuuid'
      },
      canReadAllGroups: false
    }).pipe(
      concatMap((currentUser: PpUser) => {
        this.onGetCurrentUserSuccess(currentUser);
        return of(this._currentUser);
      }),
      catchError(error => this.handleError(error, "getCurrentUserFromServer()", "Error getting current user")));
  }

  private onGetCurrentUserSuccess(currentUser: PpUser): void {
    this.localStorage.clearStorage();
    this.logger.debug(this.className, "onGetCurrentUserSuccess", "Current user successfully fetched from server.", currentUser);
    this.localStorage.addCurrentUser(currentUser);
    this.permissionManager.setDisabledPermissions();
  }

  private handleError(error: any, functionName: string, message: string): Observable<never> {
    this.logger.debug(this.className, functionName, message, error);
    return throwError(error);
  }
}
