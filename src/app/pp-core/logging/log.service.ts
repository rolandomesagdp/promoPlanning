import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogLevel } from '@pp-core/log-level.enum';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { Subscription } from 'rxjs';
import { LogEntry } from './log-entry.class';
import { LogPublisher } from './log-publishers/log-publisher.class';
import { LogPublishersFactory } from './log-publishers/log-publishers.factory';

@Injectable()
export class LogService {

  logWithDate: boolean = true;
  publishers: LogPublisher[];

  constructor(private settingsManagerService: SettingsManager, httpClient: HttpClient) {
    this.publishers = new LogPublishersFactory().create(httpClient);
  }

  debug(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Debug, optionalParams);
  }

  info(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Info, optionalParams);
  }

  warn(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Warn, optionalParams);
  }

  error(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Error, optionalParams);
  }

  fatal(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Fatal, optionalParams);
  }

  private writeToLog(className: string, functionName: string, msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let entry: LogEntry = new LogEntry();
      entry.className = className;
      entry.functionName = functionName;
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      entry.entryDate = new Date();
      this.publishers.forEach((publisher: LogPublisher) => {
        this.publishLog(publisher, entry);
      });
    }
  }

  private publishLog(logPublisher: LogPublisher, logEntry: LogEntry): void {
    let subscription: Subscription;
    subscription = logPublisher.log(logEntry).subscribe(() => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if ((level >= this.logLevel && level !== LogLevel.Off) || this.logLevel === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

  private get logLevel(): LogLevel {
    return this.settingsManagerService.logLevel;
  }
}
