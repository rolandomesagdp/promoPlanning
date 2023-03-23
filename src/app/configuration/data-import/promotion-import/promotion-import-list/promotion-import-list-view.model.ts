import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { concatMap, map, scan, tap, catchError } from "rxjs/operators";
import { PromotionImportService } from "../promotion-import.service";
import { ImportTypeConfig } from '@app/configuration/data-import/promotion-import/import-type';

export class PromotionImportViewModel {

    loading = true;
    errorMessage: string;
    importTypeConfig$: Observable<ImportTypeConfig[]> = this.importService.getImportTypeConfiguration().pipe(
        catchError(err => {
            this.loading = false;
            this.errorMessage = `Error in loading page --> Details --> ${err.message}`;
            return [];
        })
    )
    importConfigEdited$: BehaviorSubject<ImportTypeConfig> = new BehaviorSubject<ImportTypeConfig>(null);

    constructor(private importService: PromotionImportService) { }

    private importConfigUpdateHistory$ = this.importConfigEdited$.pipe(
        concatMap((configData: ImportTypeConfig) => configData ? of([configData]) : of([])),
        scan((updateHistory: ImportTypeConfig[], currentUpdate: ImportTypeConfig[]) => {
            const latestConfigData: ImportTypeConfig[] = [...currentUpdate];
            updateHistory.map(uh => {
                if (!currentUpdate.find(cu => cu.importTable === uh.importTable)) latestConfigData.push(uh);
            });
            return latestConfigData;
        }
    ));

    vm$ = combineLatest([
        this.importTypeConfig$,
        this.importConfigUpdateHistory$
    ]).pipe(
        map(([importTypeConfig, importConfigEdited]) => {
            const importConfigUpdated = [];
            this.loading = false;
            importTypeConfig.map(itc => {
                const filtered = importConfigEdited.find(ice => ice.importTable === itc.importTable);
                filtered ? importConfigUpdated.push(filtered) : importConfigUpdated.push(itc);
            });
            return importConfigUpdated;
        })
    );
}