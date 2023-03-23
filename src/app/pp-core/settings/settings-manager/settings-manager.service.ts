import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from '@pp-core/local-storage/local-storage.service';
 import { LogLevel } from '@pp-core/log-level.enum';
import { AppSettings } from '../app-settings.model';
import { EnvironmentService } from '@pp-core/environment';
import { PromoSellDate } from '../promo-sell-date.enum';

@Injectable()
export class SettingsManager {
  private settingsControllerUrl: string;
  private configSettings: AppSettings;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, environmentService: EnvironmentService) { 
    this.settingsControllerUrl = `${environmentService.getEnvironment().serverUrl}settings`;
  }

  get roiEnabled(): boolean {
		return  this.configSettings ? this.configSettings.roiIsEnabled : false;
	}

  get logLevel(): LogLevel {
		return  this.configSettings ? this.configSettings.logLevel : LogLevel.All;
	}

  get promoSellDate(): PromoSellDate {
    return this.configSettings ? this.configSettings.promoSellDate : PromoSellDate.sellIn;
  }

  loadAppSettings(): Observable<AppSettings> {
    const settings = this.localStorage.getSettings();
    return settings ? of(settings) : this.loadAppSettingsFromServer();
  }

  private loadAppSettingsFromServer(): Observable<AppSettings> {
    const url = this.settingsControllerUrl;
    return this.getObservableSettings().pipe(
      tap(settings => {
        this.configSettings = settings;
        this.localStorage.addSettings(this.configSettings);
      }),
      catchError(error => this.onError(error)));
  }

  private onError(error: any): Observable<never> {
    return throwError(error);
  }

  private getObservableSettings(): Observable<AppSettings> {
    return of({
      idleTime: 60,
      lockRefreshTime: 5000,
      isWeeklyDetail: true,
      logLevel: 1,
      maxPastMonths: 1,
      maxFutureMonths: 4,
      displaySellDate: 2,
      promoSellDate: 1,
      roiIsEnabled: false,
      urlParameterSeparator: "|",
      promotionFormDefaultValuesEnabled: false,
      defaultCampaign: "",
      defaultPromotype: 1
    })
  }
}
