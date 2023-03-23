import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationLinks, PpNavigation } from '@app/navigation';
import { PageHeaderNavigationComponent } from './page-header-navigation.component';

describe('PageHeaderNavigationComponent', () => {
  let component: PageHeaderNavigationComponent;
  let fixture: ComponentFixture<PageHeaderNavigationComponent>;
  let navigationItems: PpNavigation[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageHeaderNavigationComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    navigationItems = [
      PpNavigation.create(1, 'Promotions', NavigationLinks.promotionsList, "local_offer", false, 0, "Promotions"),
      PpNavigation.create(2, 'Calendar', NavigationLinks.calendar, "event_note", false, 0, "Promotions calendar"),
      PpNavigation.create(3, 'Campaigns', NavigationLinks.campaigns, "campaign", false, 0, "Promotion campaigns")
    ]
    fixture = TestBed.createComponent(PageHeaderNavigationComponent);
    component = fixture.componentInstance;
    component.navigationItems = navigationItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("isActiveItem", () => {
    it("should return true if the provided navigation item is active", () => {
      // arrange
      const activeItem: PpNavigation = navigationItems[0];
      component.activeNavigationItem = activeItem;

      // act
      const isActiveItem = component.isActiveNavItem(navigationItems[0]);

      // assert
      expect(isActiveItem).toBeTrue();
    });

    it("should return false if the provided navigation item is not the active one", () => {
      // arrange
      const activeItem: PpNavigation = navigationItems[0];
      component.navigationItems = navigationItems;
      component.activeNavigationItem = activeItem;

      // act
      const isActiveItem = component.isActiveNavItem(navigationItems[1]);

      // assert
      expect(isActiveItem).toBeFalse();
    });
  });

  describe("navigation items styles", () => {
    const activeNavigationItemClass = "pp-navigation-item pp-navigation-item-active";
    const inactiveNavigationItemClass = "pp-navigation-item pp-navigation-item-inactive";

    it("should print active item with the correct colors", () => {
      // arrange
      const activeItem: PpNavigation = navigationItems[0];
      component.activeNavigationItem = activeItem;

      // act
      const activeItemClasses = component.getNavigationClasses(navigationItems[0], 0);

      // assert
      expect(activeItemClasses).toContain(activeNavigationItemClass);
    });

    it("should print inactive item with the correct colors", () => {
      // arrange
      const activeItem: PpNavigation = navigationItems[0];
      component.activeNavigationItem = activeItem;

      // act
      const inactiveItemClasses = component.getNavigationClasses(navigationItems[1], 0);

      // assert
      expect(inactiveItemClasses).toContain(inactiveNavigationItemClass);
    });
  });

  describe("navigation", () => {
    it("should notify when inactive items are clicked", () => {
      // arrange
      const navigationItemClickedSpy = spyOn(component.navigationItemClicked, "emit");
      const activeItem: PpNavigation = navigationItems[0];
      component.activeNavigationItem = activeItem;

      // act
      const inactiveItem: PpNavigation = navigationItems[1];
      component.onNavigationItemClicked(inactiveItem);

      // assert
      expect(navigationItemClickedSpy).toHaveBeenCalledOnceWith(inactiveItem);
    });

    it("should do nothing if the active item is clicked", () => {
      // arrange
      const navigationItemClickedSpy = spyOn(component.navigationItemClicked, "emit");
      const activeItem: PpNavigation = navigationItems[0];
      component.activeNavigationItem = activeItem;

      // act
      component.onNavigationItemClicked(activeItem);

      // assert
      expect(navigationItemClickedSpy).not.toHaveBeenCalled();
    });
  });
});
