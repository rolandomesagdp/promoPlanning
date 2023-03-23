import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LogPublisher } from "./log-publisher.class";
import { catchError, map } from "rxjs/operators";
import { LogEntry } from "../log-entry.class";
import { environment } from "@environments/environment";

export class HttpLogPublisher extends LogPublisher {
    private logController: string = `${environment.serverUrl}logs`
    
    constructor(private httpClient: HttpClient) { 
        super();
    }

    log(record: LogEntry): Observable<boolean> {
        const url: string = `${this.logController}/create`;
        return this.httpClient.post<void>(url, record).pipe(
            map(() => true),
            catchError(error => this.handleError(error, "Error when trying to log messages in the backend."))
        );
    }
    
    clear(): Observable<boolean> {
        throw new Error("Method not implemented.");
    }

    private handleError(error: any, errorHeader: string): Observable<never> {
        let detailedError: string = errorHeader;

        if (error.error && error.error instanceof ErrorEvent) {
            detailedError = `${errorHeader}. Details: ${error.error}`;
        }
        return throwError(detailedError);
    }
}