import { Observable } from 'rxjs';
import { LogEntry } from '../log-entry.class';

export abstract class LogPublisher {
    location: string;
    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}