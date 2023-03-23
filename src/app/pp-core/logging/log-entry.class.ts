import { LogLevel } from "../log-level.enum";

export class LogEntry {
    entryDate: Date = new Date();
    className: string;
    functionName: string;
    message: string;
    level: LogLevel;
    extraInfo: any[] = [];
    logWithDate: boolean;

    toString(): string {
        let logAsString: string = "";

        if (this.logWithDate) {
            logAsString = new Date() + " - ";
        }
        
        logAsString += 'Class: ' + this.className;
        logAsString += ' - Function: ' + this.functionName;
        logAsString += ' - Message: ' + this.message;

        return logAsString;
    }
}