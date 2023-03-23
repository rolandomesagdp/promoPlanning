
import { LogPublisher } from './log-publisher.class';
import { LogLevel } from '../../log-level.enum';
import { LogEntry } from '../log-entry.class';
import { Observable, of } from 'rxjs';

export class ConsoleLogPublisher extends LogPublisher {
    
    log(entry: LogEntry): Observable<boolean> {
        switch(entry.level) {
            case (LogLevel.All || LogLevel.Debug || LogLevel.Info): 
            this.logInfo(entry);
            break;
            case LogLevel.Warn: 
            this.logWarn(entry);
            break;
            case (LogLevel.Error || LogLevel.Fatal): 
            this.logError(entry);
            break;
        }

        return of(true);
    }

    clear(): Observable<boolean> {
        console.clear();
        return of(true);
    }

    private logInfo(entry: LogEntry): void {
        console.log(entry.toString());
        entry.extraInfo.forEach(info => {
            console.log(info);
        });
    }

    private logWarn(entry: LogEntry): void {
        console.warn(entry.toString());
        entry.extraInfo.forEach(info => {
            console.warn(info);
        });
    }

    private logError(entry: LogEntry): void {
        console.error(entry.toString());
        entry.extraInfo.forEach(info => {
            console.error(info);
        });
    }
}