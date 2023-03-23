import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { leftNavMenuItems } from '@app/navigation/navigation-lists/left-navigation-items';
import { PpNavigation } from '@app/navigation/navigation.model';
import { FiltersManager } from '@app/pp-filters/filters';
import { EnvironmentService } from '@pp-core/environment';
import { LocalStorageService } from '@pp-core/local-storage';
import { LogService } from '@pp-core/logging';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { SidenavMenuService } from '../sidenav';

import { SidenavTreeMenuComponent } from './sidenav-tree-menu.component';
import { RouteMock } from './spec.setup';

describe('SidenavTreeMenuComponent', () => {
  let environmentServiceMock;
  let routerMock, location;
  let component: SidenavTreeMenuComponent;
  let fixture: ComponentFixture<SidenavTreeMenuComponent>;

  beforeEach(() => {
    routerMock = new RouteMock();
    location = jasmine.createSpyObj(["path"]);
    environmentServiceMock = jasmine.createSpyObj("envServiceMock", ["getEnvironment"]);
    environmentServiceMock.getEnvironment.and.returnValue({
      serverUrl: "/PromoPlanning_NewClientApp/",
      production: true,
      local_id: 'en-US',
    })

    TestBed.configureTestingModule({
      declarations: [SidenavTreeMenuComponent],
      imports: [ HttpClientTestingModule ],
      providers: [
        FiltersManager,
        LogService,
        LocalStorageService,
        SettingsManager,
        SidenavMenuService,
        { provide: Location, useValue: location },
        { provide: Router, useValue: routerMock },
        { provide: EnvironmentService, useValue: environmentServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavTreeMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("onMenuItemClick", () => {
    it("should toggle expand side navigation menu if the menu is collapsed", () => {
      // arrange
      const toggleExpandSideNavMenu = spyOn(component.sidenavMenuService, "toggleExpandSideNavMenu");
      const clickedMenuItem: PpNavigation = leftNavMenuItems[0];

      // act
      component.onMenuItemClick(clickedMenuItem);

      // assert
      expect(toggleExpandSideNavMenu).toHaveBeenCalled();
    });

    describe("on expanded side nav", () => {
      beforeEach(() => {
        // this is to expand the sidenav.
        let homeMenuItem = leftNavMenuItems[0];
        component.onMenuItemClick(homeMenuItem);
      })
      it("should open submenu if clicked item has childs", () => {
        // arrange
        const toggleSubmenu = spyOn(component.sidenavMenuService, "toggleSubMenu");
        const configurationMenuItem: PpNavigation = leftNavMenuItems.find(x => x.id === 7);
  
        // act
        component.onMenuItemClick(configurationMenuItem);
  
        // assert
        expect(toggleSubmenu).toHaveBeenCalledWith(configurationMenuItem);
      });

      it("should update the expanded items list", () => {
        // arrange
        const updateExpandedItemsList = spyOn(component.sidenavMenuService, "updateExpandedItemsList");
        const configurationMenuItem: PpNavigation = leftNavMenuItems.find(x => x.id === 7);
  
        // act
        component.onMenuItemClick(configurationMenuItem);
  
        // assert
        expect(updateExpandedItemsList).toHaveBeenCalledWith(configurationMenuItem);
      });

      it("should navigate to the correct path if clicked item has one", () => {
        // arrange
        const navigationSpy = spyOn(component, "navigate");
        const analyticsMenuItem: PpNavigation = leftNavMenuItems.find(x => x.id === 6);
  
        // act
        component.onMenuItemClick(analyticsMenuItem);
  
        // assert
        expect(navigationSpy).toHaveBeenCalledWith(analyticsMenuItem);
      });
    });
  });
});
