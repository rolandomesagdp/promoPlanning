import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { AnalyticsService } from "../analytics-services";
import { IPPChart } from "../charts";
import {FiltersManager } from "../../pp-filters/filters";
import { IReportPage } from "../report-page.model";
import { LogService } from "@pp-core/logging";

export class ReportPageViewModel {
    private className: string = "ReportPageViewModel";

    private reportPageChangeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    reportPageChangeEvent$: Observable<number> = this.reportPageChangeSubject$.asObservable();

    private reportPage$: Observable<IReportPage> = this.reportPageChangeEvent$.pipe(
        concatMap(reportPageId => {
            this.loading = true;
            return this.analyticsService.getReportPageById(reportPageId)
        }),
        tap(reportPage => {
            this.reportPageName = reportPage.name;
            this.logger.debug(this.className, "reportPage$ stream", "Printing reports for Report Page:", reportPage)
        })
    );

    private filteredCharts$: Observable<IPPChart[]> = combineLatest([
        this.reportPageChangeEvent$,
        this.filtersManager.applyFiltersEvent$
    ]).pipe(
        concatMap(([reportPageId, filters]) => {
            this.loading = true;
            this.logger.debug(this.className, "filteredCharts$ stream", "Filters to apply", [reportPageId, filters]);
            return reportPageId ? this.analyticsService.getChartsByPage(reportPageId, filters) : null
        }),
        tap(charts => this.logger.debug(this.className, "filteredCharts$ stream", "Filtered charts retreived from server", charts))
    );

    reportPageName: string = "";
    loading: boolean = false;

    vm$ = combineLatest([this.filteredCharts$, this.reportPage$]).pipe(
        map(([charts, reportPage]) => { 
            this.loading = false;
            return { charts, reportPage } 
        }));

    errorMessage: string;

    constructor(private analyticsService: AnalyticsService,
        private filtersManager: FiltersManager,
        private logger: LogService) { }

    reportPageChanged(reportPageId: string): void {

        if(+reportPageId) {
            this.reportPageChangeSubject$.next(+reportPageId);
        }
        else
        this.errorMessage = `The id "${reportPageId}" is not valid for a report page. Please, verify that the id is a valid number.`
    }
}