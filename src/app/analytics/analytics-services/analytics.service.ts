import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPpFilters, PpFilters } from "@app/pp-filters/filters";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { IPPChart } from '../charts';
import { IReportPage } from "../report-page.model";

@Injectable()
export class AnalyticsService {
    private analyticsControllerUrl: string = `${environment.serverUrl}analytics`;;

    constructor(private httpClient: HttpClient) { }

    getAllPages(): Observable<IReportPage[]> {
		const url: string = `${this.analyticsControllerUrl}/reportPages`;
		return this.httpClient.get<IReportPage[]>(url);
	}

	getReportPageById(id: number): Observable<IReportPage> {
		const url: string = `${this.analyticsControllerUrl}/reportPages/${id}`;
		return this.httpClient.get<IReportPage>(url);
	}

	getChartsByPage(pageNumber: number, filters: IPpFilters): Observable<IPPChart[]> {
		let params = filters ? PpFilters.create(filters).toHttpParams() : undefined;
		const url: string = `${this.analyticsControllerUrl}/charts/page/${pageNumber}`;
		return this.httpClient.get<IPPChart[]>(url, { params });
	}
}