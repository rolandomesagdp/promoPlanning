export interface LogFile {
    fileName: string;
    folder: string;
    extension: string;
    sizeKb: number;
    dateCreation: Date;
    dateModified: Date;
    contentType: string;
    href: string;
}