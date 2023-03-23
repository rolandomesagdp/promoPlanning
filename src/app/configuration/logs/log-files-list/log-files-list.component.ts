import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, FiltersManager, IPpFilters } from '@app/pp-filters/filters';
import { LogService } from '@pp-core/logging';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { LogFile } from './log-file.model';
import { LogFilesService } from './log-file.service';

@Component({
  selector: 'pp-log-files-list',
  templateUrl: './log-files-list.component.html',
  styleUrls: ['./log-files-list.component.scss']
})
export class LogFilesListComponent implements OnInit {
  private pageChangedSubject$: BehaviorSubject<IPpFilters>;
  private pageChangedEvent$: Observable<IPpFilters>
  private className: string = "LogFilesListComponent";
  private logFiles$: Observable<LogFile[]>;
  private logFilesCount$: Observable<number> = this.logFilesService.getLogFilesCount();

  pageSize: number = DEFAULT_PAGE_SIZE;
	pageIndex: number = DEFAULT_PAGE_INDEX;
	pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
  loading: boolean = true;
  errorMessage: string;
  displayedColumns: string[] = ["fileName", "extension", "size", "creationDate", "lastModified", "action"];
  viewModel$: Observable<any>;
  title: string = 'Log files';
  
  constructor(private logFilesService: LogFilesService, 
    private logService: LogService, public filtersManager: FiltersManager) { }

  ngOnInit(): void {
    this.filtersManager.cleanFiltersManager();
    this.filtersManager.setDefaultPageFilters();
    this.pageChangedSubject$ = new BehaviorSubject(this.filtersManager.filters);
    this.pageChangedEvent$ = this.pageChangedSubject$.asObservable();
    this.setViewModel();
  }

  onPageChanged(pageChangeEvent: PageEvent): void {
    this.filtersManager.filters.pageSize = pageChangeEvent.pageSize;
    this.filtersManager.filters.pageIndex = pageChangeEvent.pageIndex;
    this.pageChangedSubject$.next(this.filtersManager.filters);
  }

  downloadFile(file: LogFile): void {
    this.logFilesService.downloadFile(file).subscribe();
  }

  private setViewModel(): void {
    this.logFiles$ = this.pageChangedEvent$.pipe(
      concatMap((filters: IPpFilters) => {
        this.loading = true;
        return this.logFilesService.getLogFiles(filters);
      }),
      tap((logFiles: LogFile[]) => {
        this.logService.debug(this.className, "logFiles Stream", "Retreived log files", [logFiles]);
      }),
      catchError(error => this.handleError(error))
    );
    this.viewModel$ = combineLatest([this.logFiles$, this.logFilesCount$]).pipe(
      map(([logFiles, logFilesCount]) => {
        this.loading = false;
        return { logFiles, logFilesCount }
      })
    )
  }

  private handleError(error: any): Observable<never> {
    this.errorMessage = "There was an error when fetching the log files.";
    if (error.error && error.error instanceof ErrorEvent) {
      this.errorMessage = `${this.errorMessage} Details: ${error.error}`;
    }
    this.logService.error(this.className, "logFiles Stream", this.errorMessage, [error]);
    return throwError(this.errorMessage);
  }
}
