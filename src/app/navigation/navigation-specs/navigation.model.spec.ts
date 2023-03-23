import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing" 
import { NavigationLinks, PpNavigation } from "..";

describe("PpNavigation Model", () => {
    describe("create", () => {
        it("should create a valid instance of PpNavigation model if valid values are provided", () => {
            // arrange
            const id: number = 1;
            const title: string = "Some title";
            const routerLink: NavigationLinks = NavigationLinks.analytics;
            const icon: string = "someIcon";
            const hasSubMenu: boolean = false;
            const parentId: number = 0;
            const tooltip: string = "Some tooltip";

            // act
            const navigationItem: PpNavigation = PpNavigation
            .create(id, title, routerLink, icon, hasSubMenu, parentId, tooltip)

            // assert
            expect(navigationItem.id).toEqual(id);
            expect(navigationItem.title).toEqual(title);
            expect(navigationItem.routerLink).toEqual(routerLink);
            expect(navigationItem.icon).toEqual(icon);
            expect(navigationItem.hasSubMenu).toEqual(hasSubMenu);
            expect(navigationItem.parentId).toEqual(parentId);
        });

        it("should throw an error if invalid values are provided.", () => {
            // arrange
            const id: number = null;
            const title: string = null;
            const routerLink: NavigationLinks = NavigationLinks.analytics;
            const icon: string = null;
            const hasSubMenu: boolean = false;
            const parentId: number = null;
            const tooltip: string = "Some tooltip";

            // assert
            expect(() =>PpNavigation.create(
                id, title, routerLink, icon, hasSubMenu, parentId, tooltip))
                .toThrowError();
        });
    });

    describe("isPromotionNavigation", () => {
        it("should return true if it is a Promotion navigation", () => {
            // arrange
            const calendarNavigation: PpNavigation = PpNavigation
            .create(1, "title", NavigationLinks.calendar, "icon", false, 0, "tooltip");
            const promotionsNavigation: PpNavigation = PpNavigation
            .create(1, "title", NavigationLinks.calendar, "icon", false, 0, "tooltip");
            
            // act
            const calendarIsPromotionNavigation = calendarNavigation.isPromotionNavigation();
            const promoIsPromoitonNavigation = promotionsNavigation.isPromotionNavigation();
            
            // assert
            expect(calendarIsPromotionNavigation).toBeTrue();
            expect(promoIsPromoitonNavigation).toBeTrue();
        });

        it("should return false if it is not a Promotion navigation", () => {
            // arrange
            const analyticsNavigation: PpNavigation = PpNavigation
            .create(1, "title", NavigationLinks.analytics, "icon", false, 0, "tooltip");
            
            // act
            const analyticsIsPromotionNavigation = analyticsNavigation.isPromotionNavigation();
            
            // assert
            expect(analyticsIsPromotionNavigation).toBeFalse();
        });
    });

    describe("navigate", () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
              imports: [ RouterTestingModule.withRoutes([]) ]
            });
          });
        it("should do nothing if the Navigation model is a Promotion Navigation", () => {
            // arrange
            const router = TestBed.get(Router)
            const routerSpy = spyOn(router, "navigate");
            const navigation: PpNavigation = PpNavigation
            .create(1, "Promotions", NavigationLinks.promotionsList, "chart", false, 0, "tooltip");
            
            // act
            navigation.navigate(router);

            // assert
            expect(routerSpy).not.toHaveBeenCalled();
        });

        it("should do nothing if the Navigation model does not have a routerLink", () => {
            // arrange
            const router = TestBed.get(Router)
            const routerSpy = spyOn(router, "navigate");
            const navigation: PpNavigation = PpNavigation
            .create(1, "Promotions", null, "chart", false, 0, "tooltip");
            
            // act
            navigation.navigate(router);

            // assert
            expect(routerSpy).not.toHaveBeenCalled();
        });

        it("should navigate if the Navigation model is not a Promotion Navigation", () => {
            // arrange
            const router = TestBed.get(Router)
            const routerSpy = spyOn(router, "navigate");
            const navigation: PpNavigation = PpNavigation
            .create(1, "Analytics", NavigationLinks.analytics, "chart", false, 0, "tooltip");
            
            // act
            navigation.navigate(router);

            // assert
            expect(routerSpy).toHaveBeenCalledWith([navigation.routerLink]);
        });
    });
});