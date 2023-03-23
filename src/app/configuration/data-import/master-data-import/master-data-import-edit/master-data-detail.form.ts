import { AbstractControl, FormControl } from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ImportTable } from '@app/configuration/data-import/import-table';

export class MasterDataDetailForm {
    importMasterDataForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public importMasterDataConfig: ImportTable) { }

    build(): void {
        this.importMasterDataForm = this.formBuilder.group({
            importSql: new FormControl(this.importMasterDataConfig.importSql)
        })
    }

    get importMasterData(): AbstractControl {
        return this.importMasterDataForm.get('importSql');
    }

}