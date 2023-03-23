import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavMenuService } from '..';

import { SidenavComponent } from '../sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let locationMock, menuServiceMock;

  beforeEach(() => {
    locationMock = jasmine.createSpyObj(["path"]);
    menuServiceMock = jasmine.createSpyObj(["setCurrentActiveMenuItemOrDefault"]);
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent ],
      providers: [
        { provide: Location, useValue: locationMock },
        { provide: SidenavMenuService, useValue: menuServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
