import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataImportListComponent } from './master-data-import-list.component';
import { MasterDataService } from '@app/configuration/data-import/master-data-import/master-data.service';
import { SnackbarService } from '@pp-core/snackbar';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ImportTable, TableNames } from '@app/configuration/data-import/import-table';
import { DialogMock } from '@app/configuration/data-import/master-data-import/master-data-import-list/dialog-mock.class';
import { LogService } from '@pp-core/logging';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MasterDataImportListComponent', () => {
  let component: MasterDataImportListComponent;
  let fixture: ComponentFixture<MasterDataImportListComponent>;
  let masterDataImportServiceMock = {
    getMasterDataConfig: () =>  {},
    importMasterData: () => {}
  }
  masterDataImportServiceMock.getMasterDataConfig =  jasmine.createSpy().and.returnValue(of(["test"]))
  masterDataImportServiceMock.importMasterData = jasmine.createSpy().and.returnValue(of(true))

  let snackBarMock = jasmine.createSpyObj(["openSuccess", "openError"]);
  let logServiceMock = jasmine.createSpyObj(["error"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDataImportListComponent ],
      providers: [
        { provide: MasterDataService, useValue: masterDataImportServiceMock},
        { provide: SnackbarService, useValue: snackBarMock },
        { provide: MatDialog, useClass: DialogMock},
        { provide : LogService, useValue: logServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataImportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getMasterDataConfig', () => {
      //arrange
      const getMasterDataConfigSpy = spyOn(component, "getMasterDataConfig");
      //act
      component.ngOnInit();
      //assert
      expect(getMasterDataConfigSpy).toHaveBeenCalled();
    })
  })

  describe('edit()', () => {
    it('should open dialog box for edit', () => {
      //arrange
      
      let sampleRow: ImportTable = {
        id: 1,
        tableName: TableNames.All,
        description: 'test',
        importSql: 'test'
      };
      
      //act
      // callThrough is using for afterClosed function 
      const spy = spyOn(component.dialog, 'open').and.callThrough();
      component.edit(sampleRow);

      //assert
      expect(spy).toHaveBeenCalledTimes(1);
    })
  })

describe('import()', () =>{
  it('should import table', () => {
    //act
    component.import(TableNames.All);

    //assert
    expect(component.importService.importMasterData).toHaveBeenCalledWith(TableNames.All);
  })
});

describe('ngOnDestroy()', () => {
  it('should unsubscribe subscription manager', () => {
    //act
    const subscriptionManagerUnsubscribeSpy = spyOn(component.subscriptionManager, "unsubscribe");
    component.ngOnDestroy();

    //assert
    expect(subscriptionManagerUnsubscribeSpy).toHaveBeenCalled();
  })
});

describe("component elements", () => {
  it("should print expected columns for table", () => {
    //arrange
    const tableCol = ["tableName", "importSql", "actions"];
    //act
    
    //assert
    expect(component.columnsToDisplay).toEqual(tableCol);
  });
  it("should have title 'Master Data'", () => {
    //arrange
    const title = 'Master Data';
    //act

    //assert
    expect(component.title).toEqual(title);
  })
  it("should have values in masterDataImportConfig", () => {
    //act
    component.getMasterDataConfig();

    //assert
    expect(component.masterDataImportConfig.length).toBeGreaterThan(0);
  })
})

});
