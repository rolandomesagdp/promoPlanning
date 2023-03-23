import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataImportEditComponent } from './master-data-import-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterDataService } from '@app/configuration/data-import/master-data-import/master-data.service';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MasterDataImportEditComponent', () => {
  let component: MasterDataImportEditComponent;
  let fixture: ComponentFixture<MasterDataImportEditComponent>;

  let matDialogDataMock = jasmine.createSpy();
  let matDialogRefMock = jasmine.createSpyObj(['close']);
  let masterDataServiceMock = {
    saveMasterDataConfig: () => {
    return {
        subscribe: () => of({})
      }}
  }
  let logServiceMock = jasmine.createSpyObj(["error"]);
  let snackBarMock = jasmine.createSpyObj(["openSuccess", "openError"]);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDataImportEditComponent ],
      providers: [
          {provide : MAT_DIALOG_DATA, useValue: matDialogDataMock},
          {provide :MatDialogRef, useValue: matDialogRefMock},
          {provide: MasterDataService, useValue: masterDataServiceMock},
          {provide: LogService, useValue: logServiceMock},
          {provide: SnackbarService, useValue: SnackbarService},
          FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataImportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
      it('should populate form', () => {
          //arrange
          let buildSpy = spyOn(component.masterDataImportForm, 'build');
          //act
          component.ngOnInit();
          //assert
          expect(buildSpy).toHaveBeenCalled();
      })
  });

  describe('saveSQLDefinition()', () => {
      it('should save sql defination', () => {
          let saveSpy = spyOn(masterDataServiceMock, 'saveMasterDataConfig').and.callThrough();
          component.saveSQLDefinition();
         expect(saveSpy).toHaveBeenCalled();
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
});
