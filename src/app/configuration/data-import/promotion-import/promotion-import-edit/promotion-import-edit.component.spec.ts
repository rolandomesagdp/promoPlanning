import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { of } from 'rxjs';
import { ImportType, ImportTypeConfig } from '../import-type';
import { PromotionImportService } from '../promotion-import.service';

import { PromotionImportEditComponent } from './promotion-import-edit.component';
import { PromotionImportEditComponentSpecSetup } from './promotion-import-edit.component.specSetup';

describe('PromotionImportEditComponent', () => {
  const specSetup: PromotionImportEditComponentSpecSetup = new PromotionImportEditComponentSpecSetup();
  let importTypeConfig: ImportTypeConfig = specSetup.getImportTypeConfig();
  let component: PromotionImportEditComponent;
  let fixture: ComponentFixture<PromotionImportEditComponent>;
  let promotionImportServiceMock = jasmine.createSpyObj(["importExternalPromos", "getTableImportTypeConfiguration", "saveImportTypeConfiguration"]);
  let snackBarMock = jasmine.createSpyObj(["openSuccess"]);
  let MatDialogRefMock = jasmine.createSpyObj(["close"]);
  promotionImportServiceMock.importExternalPromos.and.returnValue(of({}));
  promotionImportServiceMock.getTableImportTypeConfiguration.and.returnValue(of(importTypeConfig));
  promotionImportServiceMock.saveImportTypeConfiguration.and.returnValue(of({}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionImportEditComponent],
      imports: [PpAngularMaterialModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: importTypeConfig },
        { provide: PromotionImportService, useValue: promotionImportServiceMock },
        { provide: SnackbarService, useValue: snackBarMock },
        { provide: LogService, useValue: {}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionImportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("onInit", () => {

    it("should initialize checkboxOptions", () => {
      //act
      component.ngOnInit();

      // assert
      expect(component.checkboxOptions).toBeTruthy();
    });

    it("should build the promotion import form", () => {
      // arrange
      const promotionImportFormSpy = spyOn(component.promotionImportForm, "build");

      // act
      component.ngOnInit();

      // assert
      expect(promotionImportFormSpy).toHaveBeenCalled();
    });

    it("should call getTableImportTypeConfiguration function to get the import type config data", () => {
      // arrange
      const getTableImportTypeConfigurationSpy = spyOn(component, "getTableImportTypeConfiguration");

      // act
      component.ngOnInit();

      // assert
      expect(getTableImportTypeConfigurationSpy).toHaveBeenCalled();
    });
  });

  describe("createCheckboxOptions", () => {

    it("should assign default values to checkboxOptions to show in checkboxes", () => {
      // act
      component.createCheckboxOptions();

      // assert
      expect(component.checkboxOptions).toEqual([
        { title: 'Insert new records only', value: ImportType.IMPORT_ONLY_NEW },
        { title: 'Insert new records and override existing ones', value: ImportType.IMPORT_AND_OVERRIDE }
      ]);
    });
  });

  describe("getTableImportTypeConfiguration", () => {

    it("should define importTableTypeConfig for selected importTable", () => {
      // act
      component.getTableImportTypeConfiguration();

      // assert
      expect(component.importTableTypeConfig).toBeTruthy();
    });
  });

  describe("importTable", () => {

    it("should call importExternalPromos and import the selected table", () => {
      // act
      component.importTable();

      // assert
      expect(component.importService.importExternalPromos).toHaveBeenCalledWith(importTypeConfig.importTable);
      expect(component.snackbarService.openSuccess).toHaveBeenCalledWith(`Imported ${importTypeConfig.importTable} table successfully`)
    });
  });

  describe("saveImportData", () => {

    it("should call saveImportTypeConfiguration and save the import data", () => {
      // act
      component.saveImportData();

      // assert
      expect(component.importService.saveImportTypeConfiguration).toHaveBeenCalledWith(importTypeConfig);
      expect(component.snackbarService.openSuccess).toHaveBeenCalledWith(`Successfully Updated`);
    });

    it("should close dialog after updating the import data", () => {
      // act
      component.saveImportData();

      // assert
      expect(component.dialogRef.close).toHaveBeenCalledWith(importTypeConfig);
    })
  });

  describe("closeDialog", () => {

    it("should close the dialog", () => {
      // act
      component.closeDialog();

      // assert
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });

  describe("onDestroy", () => {
    
    it("should unsubscribe subscription manager", () => {
      //act
      const subscriptionManagerSpy = spyOn(component.subscriptionManager, "unsubscribe");
      component.ngOnDestroy();
      //assert
      expect(subscriptionManagerSpy).toHaveBeenCalled();
    })
  });

});
