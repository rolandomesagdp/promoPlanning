import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Params, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { PromoPlanningFiltersModule } from "@app/pp-filters";
import { FiltersManager, IPpFilters, PpFilters } from "@app/pp-filters/filters";
import { EnvironmentService } from "@pp-core/environment";
import { LocalStorageService, PromotionFilterAuthors } from "@pp-core/local-storage";
import { LoggingModule } from "@pp-core/logging";
import { SettingsModule } from "@pp-core/settings";
import { NavigationLinks, PpNavigation } from "..";
import { PromotionNavigation } from "../promotion-navigation/promotion-navigation";

describe("PromotionNavigation", () => {
    let router: Router;
    let filtersManager: FiltersManager;
    let environmentServiceMock;
    beforeEach(() => {
        environmentServiceMock = jasmine.createSpyObj("envServiceMock", ["getEnvironment"]);
        environmentServiceMock.getEnvironment.and.returnValue({
            serverUrl: "/dummyUrl/",
            production: false,
            local_id: 'en-US',
        })
        TestBed.configureTestingModule({
          imports: [ 
              RouterTestingModule.withRoutes([]),
              PromoPlanningFiltersModule,
              LoggingModule,
              SettingsModule,
              HttpClientTestingModule,
         ],
         providers: [ 
             LocalStorageService,
             { provide: EnvironmentService, useValue: environmentServiceMock }
         ],
         schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        router = TestBed.get(Router);
        filtersManager = TestBed.get(FiltersManager);
      });
      
    describe("createPromoNavigation", () => {
        it("should build the correct Promotion Navigation", () => {
            // arrange
            const navigation: PpNavigation = PpNavigation.create(
                1, "Some Title", NavigationLinks.calendar,
                "someIcon", false, 0, "tooltip");

            // act
            const promoNavigation: PromotionNavigation = PromotionNavigation
            .createPromoNavigation(navigation, filtersManager);

            // assert
            expect(promoNavigation.id).toEqual(navigation.id);
            expect(promoNavigation.title).toEqual(navigation.title);
            expect(promoNavigation.routerLink).toEqual(navigation.routerLink);
            expect(promoNavigation.icon).toEqual(navigation.icon);
            expect(promoNavigation.hasSubMenu).toEqual(navigation.hasSubMenu);
            expect(promoNavigation.parentId).toEqual(navigation.parentId);
        });

        it("should throw an error if it is not a Promotion Navigation", () => {
            // arrange
            const navigation: PpNavigation = PpNavigation.create(
                1, "Some Title", NavigationLinks.analytics,
                "someIcon", false, 0, "tooltip");

            // assert
            expect(() => PromotionNavigation.createPromoNavigation(navigation, filtersManager)).toThrowError();
        });
    });

    describe("filtersAuthor", () => {
        it("should return correct Promotion navigation's filter author", () => {
            // arrange
            const baseCalendarNavigation: PpNavigation = PpNavigation.create(
                1, "Some Title", NavigationLinks.calendar, "someIcon", false, 0, "tooltip");
            const basePromotionNavigation: PpNavigation = PpNavigation.create(
                1, "Some Title", NavigationLinks.promotionsList, "someIcon", false, 0, "tooltip");

            // act
            const calendarNavigation = PromotionNavigation
            .createPromoNavigation(baseCalendarNavigation, filtersManager);
            const promotionNavigation = PromotionNavigation
            .createPromoNavigation(basePromotionNavigation, filtersManager);

            // assert
            expect(calendarNavigation.filtersAuthor).toEqual(PromotionFilterAuthors.calendarComponent);
            expect(promotionNavigation.filtersAuthor).toEqual(PromotionFilterAuthors.promotionListComponent);
        });
    });

    describe("navigate", () => {
        it("should call the router.navigate function with the correct params", () => {
            // arrange
            const routerNavigateSpy = spyOn(router, "navigate")
            const basePromotionNavigation: PpNavigation = PpNavigation.create(
                1, "Some Title", NavigationLinks.promotionsList, "someIcon", false, 0, "tooltip");
            const promotionNavigation = PromotionNavigation
            .createPromoNavigation(basePromotionNavigation, filtersManager);
            
            // act
            promotionNavigation.navigate(router);

            // assert
            const filters: IPpFilters = filtersManager.filters;
            const expectedParams: Params = PpFilters.create(filters).toParams();
            expect(routerNavigateSpy)
            .toHaveBeenCalledWith([promotionNavigation.routerLink], {queryParams: expectedParams});
        })
    });
});