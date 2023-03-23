import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPpFilters, PpFilters } from '@app/pp-filters/filters';
import { EnvironmentService } from '@pp-core/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogFile } from './log-file.model';

@Injectable()
export class LogFilesService { 
    private logsControllerUrl: string;

	constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) {
		this.logsControllerUrl = `${this.environmentService.getEnvironment().serverUrl}logs`;
	}

    getLogFiles(filters: IPpFilters): Observable<LogFile[]> {
		const url: string = `${this.logsControllerUrl}/files`;
		const httpParams: HttpParams = PpFilters.create(filters).toHttpParams();
		return this.httpClient.get<LogFile[]>(url, { params: httpParams }).pipe(
			map((logFiles: LogFile[]) => {
				return logFiles.map((logFile: LogFile) => {
					logFile.href = `${this.logsControllerUrl}/downloadfile/${logFile.fileName}`;
					return logFile;
				})
			}));
	}

	getLogFilesCount(): Observable<number> {
		const url: string = `${this.logsControllerUrl}/files/count`;
		return this.httpClient.get<number>(url);
	}

	downloadFile(file: LogFile): Observable<void> {
		const url: string = `${this.logsControllerUrl}/downloadfile/${file.fileName}`;
		return this.httpClient.get<void>(url);
	}
}