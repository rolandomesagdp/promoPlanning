import { SidenavMenuService } from "..";
import { PpNavigation } from '../../../navigation/navigation.model';
import { leftNavMenuItems } from '../../../navigation/navigation-lists/left-navigation-items';
import { NavigationLinks } from "@app/navigation";

describe("SidenavMenuService", () => {
    let locationMock;
    let environmentServiceMock;
    let sidenavMenuService: SidenavMenuService;

    beforeEach(() => {
        locationMock = jasmine.createSpyObj(["path"]);
        environmentServiceMock = jasmine.createSpyObj("environmentServiceMock", ["getEnvironment"]);
        environmentServiceMock.getEnvironment.and.returnValue({
            serverUrl: "dummyUrl",
            production: false,
            local_id: 'en-US',
          });
        sidenavMenuService = new SidenavMenuService(locationMock, environmentServiceMock);
    });

    describe("toggleExpandSideNavMenu", () => {
        it("Should expand the menu if it is collapsed", () => {
            // act
            sidenavMenuService.toggleExpandSideNavMenu();
            
            // assert
            expect(sidenavMenuService.sidenavMenuExpanded).toBeTrue();
        });

        it("Should collapse the menu if it is expanded", () => {
            // arrange expand the menu
            sidenavMenuService.toggleExpandSideNavMenu();

            // act
            sidenavMenuService.toggleExpandSideNavMenu();
            
            // assert
            expect(sidenavMenuService.sidenavMenuExpanded).toBeFalse();
        });
    });

    describe("itemIsActive", () => {
        it("Should return true if the item is active", () => {
            // arrange
            const analyticsRouterLink = "/analytics"

            // act
            sidenavMenuService.setCurrentActiveMenuItemOrDefault(analyticsRouterLink);
            
            // assert
            const analyticsNavigatinoItem: PpNavigation = leftNavMenuItems.find(x => x.routerLink === analyticsRouterLink);
            expect(sidenavMenuService.activeItem).toBeTruthy();
            expect(sidenavMenuService.itemIsActive(analyticsNavigatinoItem)).toBeTrue();
        });

        it("Should return false if a different item is active", () => {
            // arrange
            const analyticsRouterLink = "/analytics"

            // act
            sidenavMenuService.setCurrentActiveMenuItemOrDefault(analyticsRouterLink);
            
            // assert
            const analyticsNavigatinoItem: PpNavigation = leftNavMenuItems.find(x => x.routerLink === NavigationLinks.promotionCards);
            expect(sidenavMenuService.activeItem).toBeTruthy();
            expect(sidenavMenuService.itemIsActive(analyticsNavigatinoItem)).toBeFalse();
        });

        it("Should return false if no item is active", () => {
            // assert
            const analyticsNavigatinoItem: PpNavigation = leftNavMenuItems.find(x => x.routerLink === "/analytics");
            expect(sidenavMenuService.activeItem).toBeFalsy();
            expect(sidenavMenuService.itemIsActive(analyticsNavigatinoItem)).toBeFalse();
        });
    });

    describe("setCurrentActiveMenuItemOrDefault", () => {
        it("should set Home as default active item when no route is provided", () => {
            // arrange
            const homeMenuItem: PpNavigation = leftNavMenuItems.find(x => x.title === "Home");
            
            // act
            sidenavMenuService.setCurrentActiveMenuItemOrDefault("");

            // assert
            const activeItem = sidenavMenuService.activeItem;
            expect(activeItem).toEqual(homeMenuItem);
        });

        it("should set Home as default active item when the provided route does not exists", () => {
            // arrange
            const homeMenuItem: PpNavigation = leftNavMenuItems.find(x => x.title === "Home");
            
            // act
            sidenavMenuService.setCurrentActiveMenuItemOrDefault("/some/fake/route");

            // assert
            const activeItem = sidenavMenuService.activeItem;
            expect(activeItem).toEqual(homeMenuItem);
        });

        it("should set the correct active item when the provided route is a child of the item router link", () => {
            // arrange
            const analyticsMenuItem: PpNavigation = leftNavMenuItems.find(x => x.title === "Analytics");
            
            // act
            const analyticsUrlWithQueryString: string = "/analytics/report-page/1";
            sidenavMenuService.setCurrentActiveMenuItemOrDefault(analyticsUrlWithQueryString);

            // assert
            const activeItem = sidenavMenuService.activeItem;
            expect(activeItem).toEqual(analyticsMenuItem);
        });

        it("should set the correct active item when url has query string", () => {
            // arrange
            const analyticsMenuItem: PpNavigation = leftNavMenuItems.find(x => x.title === "Analytics");
            
            // act
            const analyticsUrlWithQueryString: string = "/analytics/report-page/1?startDate=Fri,%2031%20Jan%202020%2023:00:00%20GMT&endDate=Thu,%2024%20Mar%202022%2023:00:00%20GMT";
            sidenavMenuService.setCurrentActiveMenuItemOrDefault(analyticsUrlWithQueryString);

            // assert
            const activeItem = sidenavMenuService.activeItem;
            expect(activeItem).toEqual(analyticsMenuItem);
        });
    });
})