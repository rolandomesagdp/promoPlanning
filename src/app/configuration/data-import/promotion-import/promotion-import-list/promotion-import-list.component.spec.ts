import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { of } from 'rxjs';
import { TableNames } from '../../import-table';
import { ImportTypeConfig } from '../import-type';
import { PromotionImportDetailsComponent } from '../promotion-import-details/promotion-import-details.component';
import { PromotionImportEditComponent } from '../promotion-import-edit';
import { PromotionImportService } from '../promotion-import.service';
import { PromotionImportListComponent } from './promotion-import-list.component';
import { PromotionImportListComponentSpecSetup } from './promotion-import-list.component.specsetup';


describe('PromotionImportListComponent', () => {
  const specSetup: PromotionImportListComponentSpecSetup = new PromotionImportListComponentSpecSetup();
  let promotionImportServiceMock = jasmine.createSpyObj(["importExternalPromos", "getImportTypeConfiguration"]);
  let snackBarMock = jasmine.createSpyObj(["openSuccess"]);
  promotionImportServiceMock.importExternalPromos.and.returnValue(of({}));
  promotionImportServiceMock.getImportTypeConfiguration.and.returnValue(of([]));
  let importTypeConfig: ImportTypeConfig = specSetup.getImportTypeConfig();
  let component: PromotionImportListComponent;
  let fixture: ComponentFixture<PromotionImportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionImportListComponent],
      imports: [PpAngularMaterialModule],
      providers: [
        { provide: PromotionImportService, useValue: promotionImportServiceMock },
        { provide: MatDialog, useValue: { open: () => of({ id: 1 }) } },
        { provide: SnackbarService, useValue: snackBarMock },
        { provide: LogService, useValue: {}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionImportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("importAllExternalPromos", () => {
    it("should import all the external promos to DB", () => {

      //act
      component.importAllExternalPromos();

      //assert
      expect(component.importService.importExternalPromos).toHaveBeenCalledWith(TableNames.All);
      expect(component.snackbarService.openSuccess).toHaveBeenCalledWith('Imported all table successfully');
    })
  });

  describe("edit", () => {
    it("should open a dialog to edit import table data", () => {
      
      // arrange
      const dialogSpy = spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of({ id: 1 }) } as MatDialogRef<typeof component>);

      // act
      component.edit(importTypeConfig);

      // assert
      expect(dialogSpy).toHaveBeenCalledWith(PromotionImportEditComponent, specSetup.getDialogConfig());
    });
  });

  describe("import", () => {
    it("should import external promos for selected table", () => {

      //act
      component.import(importTypeConfig);

      //assert
      expect(component.importService.importExternalPromos).toHaveBeenCalledWith(importTypeConfig.importTable);
      expect(component.snackbarService.openSuccess).toHaveBeenCalledWith(`Imported ${importTypeConfig.importTable} table successfully`);
    });
  });


  describe("showDetails", () => {
    it("should open a dialog to show import table data", () => {

      // arrange
      const dialogSpy = spyOn(component.dialog, "open");
      const dialogConfig = { height: '380px', width: '750px', autoFocus: false, data: specSetup.getImportTypeConfig() };

      //act
      component.showDetails(importTypeConfig);

      //assert
      expect(dialogSpy).toHaveBeenCalledWith(PromotionImportDetailsComponent, dialogConfig)
    });
  });

  describe("onDestroy", () => {
    it("should unsubscribe subscription manager", () => {
      // arrange
      const subscriptionManagerSpy = spyOn(component.subscriptionManager, "unsubscribe");

      // act
      component.ngOnDestroy();

      //assert
      expect(subscriptionManagerSpy).toHaveBeenCalled();
    })
  });

  describe("component elements", () => {
    it("should print expected columns for table", () => {

      //arrange
      const tableCol = ['description', 'insert_new_record_only', 'insert_and_overwrite', 'action'];

      //assert
      expect(component.displayedColumns).toEqual(tableCol);
    });
    it("should have title 'Promotions Import'", () => {

      //arrange
      const title = 'Promotions Import';

      //assert
      expect(component.title).toEqual(title);
    });
  })

});
