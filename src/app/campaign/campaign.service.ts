import { Injectable } from '@angular/core';
import { ICampaign } from '@app/campaign/campaign.model';
import { LocalStorageService } from '@pp-core/local-storage';
import { EnvironmentService } from '@pp-core/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PpFilters, IPpFilters } from '@app/pp-filters/filters';

@Injectable()
export class CampaignService {

  private campaignController: string;

  campaigns: ICampaign[] = [];

  constructor(environmentService: EnvironmentService,
            private localStorage: LocalStorageService,
            private httpClient: HttpClient) {
    this.campaignController = `${environmentService.getEnvironment().serverUrl}campaigns`;
  }

  loadCampaigns(filters: IPpFilters): Observable<ICampaign[]> {
    let campaignFilters: PpFilters = filters ? PpFilters.create(filters) : undefined;
    let params = campaignFilters ? campaignFilters.toHttpParams() : undefined;
     return this.getObservableCampaigns().pipe(
      tap(campaigns => 
        {
          this.campaigns = campaigns;
          this.localStorage.setCampaigns(campaigns)
        })
    )
  }

  getCampaignsCount(filters: IPpFilters): Observable<number> {
    let campaignFilters: PpFilters = filters ? PpFilters.create(filters) : undefined;
		let params = campaignFilters ? campaignFilters.toHttpParams() : undefined;
		const url = `${this.campaignController}/count`;
		return this.httpClient.get<number>(url, { params: params });
  }
  
  delete(campaignId: string): Observable<number> {
		const url = `${this.campaignController}`;
		let parms = new HttpParams().set('campaignId', campaignId);
		return this.httpClient.delete<number>(url, { params: parms });
	}

  private getObservableCampaigns(): Observable<ICampaign[]> {
    return of([
      {
        campaignId: "1",
        name: "Leaflet Q1",
        description: "Leaflet Q12021",
        startDate: "2021-01-01T00:00:00",
        endDate: "2021-04-30T00:00:00",
        baseline: 555515.5626128381,
        value: 0,
        units: 556738.1085112756,
        upliftCalculated: 1222.5458984375,
        upliftPercent: 0.2200741042586314
      },
      {
        campaignId: "13",
        name: "Leaflet Q1 - test1",
        description: "",
        startDate: "2021-02-01T00:00:00",
        endDate: "2021-02-12T00:00:00",
        baseline: 409678.4552292824,
        value: 0,
        units: 409678.4552292824,
        upliftCalculated: 0,
        upliftPercent: 0
      },
      {
        campaignId: "15",
        name: "Fall flier",
        description: "",
        startDate: "2021-09-01T00:00:00",
        endDate: "2021-11-30T00:00:00",
        baseline: 55349.32687282562,
        value: 0,
        units: 55366.32687282562,
        upliftCalculated: 17,
        upliftPercent: 0.030714013991643214
      },
      {
        campaignId: "3",
        name: "Leaflet Q2",
        description: "Leaflet Q22021",
        startDate: "2021-05-01T00:00:00",
        endDate: "2021-08-31T00:00:00",
        baseline: 0,
        value: 0,
        units: 0,
        upliftCalculated: 0,
        upliftPercent: 0
      },
      {
        campaignId: "5",
        name: "Leaflet Q3",
        description: "",
        startDate: "2021-09-01T00:00:00",
        endDate: "2021-12-31T00:00:00",
        baseline: 106160.458984375,
        value: 0,
        units: 106160.458984375,
        upliftCalculated: 0,
        upliftPercent: 0
      },
      {
        campaignId: "CAMPAIGN2022052702190242",
        name: "NicoChampaign",
        description: "All my tests go here.",
        startDate: "2022-05-01T00:00:00",
        endDate: "2024-01-01T00:00:00",
        baseline: 0,
        value: 0,
        units: 0,
        upliftCalculated: 0,
        upliftPercent: 0
      },
      {
        campaignId: "CAMPAIGN2022112505235031",
        name: "trst",
        description: "",
        startDate: "2022-11-26T00:00:00",
        endDate: "2022-12-21T00:00:00",
        baseline: 0,
        value: 0,
        units: 0,
        upliftCalculated: 0,
        upliftPercent: 0
      },
      {
        campaignId: "CAMPAIGN2022112505241113",
        name: "testagain",
        description: "",
        startDate: "2022-11-20T00:00:00",
        endDate: "2022-12-17T00:00:00",
        baseline: 0,
        value: 0,
        units: 0,
        upliftCalculated: 0,
        upliftPercent: 0
      },
      {
        campaignId: "CAMPAIGN2022112505242335",
        name: "test 2",
        description: "",
        startDate: "2022-11-27T00:00:00",
        endDate: "2022-12-22T00:00:00",
        baseline: 0,
        value: 0,
        units: 0,
        upliftCalculated: 0,
        upliftPercent: 0
      }
    ])
  }
}