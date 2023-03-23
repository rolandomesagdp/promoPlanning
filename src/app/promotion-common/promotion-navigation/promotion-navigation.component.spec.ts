import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationLinks } from '@app/navigation';
import { FiltersManager } from '@app/pp-filters/filters';
import { PromotionNavigationComponent } from './promotion-navigation.component';

describe('PromotionNavigationComponent', () => {
  let filtersManagerMock;
  let component: PromotionNavigationComponent;
  let fixture: ComponentFixture<PromotionNavigationComponent>;

  beforeEach(() => {
    filtersManagerMock = jasmine.createSpyObj(["setDefaultPageFilters", "setDefaultFilters"], {
      filters: {
        pageSize: 0,
        pageIndex: 1
      }
    });
    TestBed.configureTestingModule({
      declarations: [PromotionNavigationComponent],
      imports: [ RouterTestingModule ],
      providers: [ { provide: FiltersManager, useValue: filtersManagerMock } ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("navigation", () => {
    it("should display the correct navigation items", () => {
      expect(component.promotionNavigationItems.length).toEqual(3);
      expect(component.promotionNavigationItems[0].routerLink).toEqual(NavigationLinks.calendar);
      expect(component.promotionNavigationItems[1].routerLink).toEqual(NavigationLinks.promotionsList);
      expect(component.promotionNavigationItems[2].routerLink).toEqual(NavigationLinks.promotionCards);
    });

    it("should navigate when a navigation item is clicked", () => {
      // arrange
      const navigationItemSpy = jasmine.createSpyObj(["navigate", "isPromotionNavigation"]);
      navigationItemSpy

      // act
      component.onNavigationItemClicked(navigationItemSpy);

      // assert
      expect(navigationItemSpy.navigate).toHaveBeenCalledWith(component.router);
    });
  });

  it("should notify when the action button is clicked", () => {
    // arrange
    const actionButtonClickEmitterSpy = jasmine.createSpyObj(["emit"]);
    component.actionButtonClicked = actionButtonClickEmitterSpy;

    // act
    component.onActionButtonClicked();

    // assert
    expect(actionButtonClickEmitterSpy.emit).toHaveBeenCalled();
  });
});
