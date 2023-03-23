import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { SidenavMenuService } from '../sidenav';

import { MainLayoutComponent } from './main-layout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EnvironmentService } from '@pp-core/environment';
import { PromotionTypeService } from '@app/promotion-type';
import { PromotionStatusService } from '@app/promotion-status';
import { CampaignService } from '@app/campaign/campaign.service';
import { of } from 'rxjs';

describe('MainLayoutComponent', () => {
  let locationMock;
  let environmentServiceMock;
  let promotionTypeServiceMock;
  let promotionStatusServiceMock;
  let campaignServiceMock;
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(() => {
    environmentServiceMock = jasmine.createSpyObj("environmentServiceMock", ["getEnvironment"]);
        environmentServiceMock.getEnvironment.and.returnValue({
            serverUrl: "dummyUrl",
            production: false,
            local_id: 'en-US',
          });
    locationMock = jasmine.createSpyObj(["path"]);

    promotionTypeServiceMock = jasmine.createSpyObj("promotionTypeServiceMock", ["loadPromotionTypes"], {
        promotionTypes: [
            { promoTypeId: 1, name: "One", isPromoClustering: false },
            { promoTypeId: 2, name: "Two", isPromoClustering: false },
            { promoTypeId: 3, name: "Three", isPromoClustering: false }
        ]
    });
    
    promotionStatusServiceMock = jasmine.createSpyObj("promotionStatusServiceMock", ["loadPromotionStatus"], {
      promotionStatus: [
        { statusId: 1, statusValue: "One", sequence: 1, isScoring: false, color: "blue" },
        { statusId: 2, statusValue: "Two", sequence: 2, isScoring: false, color: "red" },
        { statusId: 1, statusValue: "Three", sequence: 3, isScoring: false, color: "green" }
      ]
    });

    campaignServiceMock = jasmine.createSpyObj("campaignServiceMock", ["loadCampaigns"])
    campaignServiceMock.loadCampaigns.and.returnValue(of([]))

    TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      providers: [
        SidenavMenuService,
        { provide: Location, useValue: locationMock },
        { provide: EnvironmentService, useValue: environmentServiceMock },
        { provide: PromotionTypeService, useValue: promotionTypeServiceMock },
        { provide: PromotionStatusService, useValue: promotionStatusServiceMock },
        { provide: CampaignService, useValue: campaignServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("getSideNavClasses", () => {
    it("Should return collapsed sidenav menu classes if the menu is collapsed", () => {
      // arrange
      const collapsedSinavClasses: string[] = ["sidenav", "sidenav-collapsed"];
      // act
      const actualSideNavClasses = component.getSideNavClasses();

      // assert
      expect(actualSideNavClasses).toEqual(collapsedSinavClasses);
    });

    it("Should return expanded sidenav menu classes if the menu is expanded", () => {
      // arrange
      const collapsedSinavClasses: string[] = ["sidenav", "sidenav-expanded"];
      // act
      component.toggleMenuOpen();
      const actualSideNavClasses = component.getSideNavClasses();

      // assert
      expect(actualSideNavClasses).toEqual(collapsedSinavClasses);
    })
  })

  describe("getDrawerContentClasses", () => {
    it("Should return collapsed content classes if the menu is expanded", () => {
      // arrange
      const collapsedContentClasses: string[] = ["content", "layout-content", "layout-content-collapsed"];

      // act
      component.toggleMenuOpen();
      const actualContentClasses = component.getDrawerContentClasses();

      // assert
      expect(actualContentClasses).toEqual(collapsedContentClasses);
    });

    it("Should return expanded content menu classes if the menu is collapsed", () => {
      // arrange
      const collapsedContentClasses: string[] = ["content", "layout-content", "layout-content-expanded"];

      // act
      const actualContentClasses = component.getDrawerContentClasses();

      // assert
      expect(actualContentClasses).toEqual(collapsedContentClasses);
    })
  })
});
