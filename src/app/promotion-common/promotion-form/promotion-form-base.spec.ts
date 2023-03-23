import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NavigationLinks, PpNavigation, PromotionFormNavigation } from "@app/navigation";
import { ParticipantsFormComponent } from "@app/participants/participants-form/participants-form.component";
import { IPpFilters, PpFilters } from "@app/pp-filters/filters";
import { of } from "rxjs";
import { PromotionFormBase } from ".";

describe("PromotionFormBase", () => {
    let promotionId: string = "dummyPromotionId";
    let filtersManagerMock;
    let sideNavMenuServiceMock;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let promotionFormBase: PromotionFormBase;

    beforeEach(async () => {
        let filters: IPpFilters = PpFilters.createEmptyModel();
        filters.pageIndex = 5,
        filters.pageSize = 10;
        filtersManagerMock = jasmine.createSpyObj(["setDefaultFilters"], {
            filters: filters
        });

        sideNavMenuServiceMock = jasmine.createSpyObj(["toggleExpandSideNavMenu"], {
            sidenavMenuExpanded: true
        });

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'promotion/participants/:id', component: ParticipantsFormComponent }
                ])
            ]
        }).compileComponents();

        router = TestBed.get(Router);
        activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.params = of({ id: promotionId })
    });

    beforeEach(() => {
        promotionFormBase = new PromotionFormBase(router, activatedRoute, filtersManagerMock, sideNavMenuServiceMock);
    });

    it("should create", () => {
        promotionFormBase = new PromotionFormBase(router, activatedRoute, filtersManagerMock, sideNavMenuServiceMock);
        expect(promotionFormBase).toBeTruthy();
    });

    describe("initialize", () => {
        it("should set up the correct promotion id from url", () => {
            // act
            promotionFormBase.initialize(NavigationLinks.promotionEdit);

            // assert
            expect(promotionFormBase.promotionId).toEqual(promotionId);
        });

        it("should set up the correct active item", () => {
            // act
            promotionFormBase.initialize(NavigationLinks.promotionEdit);

            // assert
            expect(promotionFormBase.activeItem.routerLink)
                .toEqual(NavigationLinks.promotionEdit);
        });

        it("should close the left navigation bar", () => {
            // act
            promotionFormBase.initialize(NavigationLinks.promotionEdit);

            // assert
            expect(sideNavMenuServiceMock.toggleExpandSideNavMenu)
                .toHaveBeenCalled();
        });
    });

    describe("navigation", () => {
        it("should navigate to the correct promotion form page", () => {
            // arrange
            const routerNavigateSpy = spyOn(router, "navigate");
            promotionFormBase.initialize(NavigationLinks.promotionEdit);

            // act
            const navigationPage: PpNavigation = PpNavigation.create(5, 'Add Participants', NavigationLinks.promotionParticipants, 'add_circle', false, 0, "Add Participants");
            promotionFormBase.onNavigate(navigationPage);

            // assert
            const expectedNavigation: PromotionFormNavigation = PromotionFormNavigation
            .createPromotionFormNavigation(navigationPage, promotionId);
            expect(routerNavigateSpy)
            .toHaveBeenCalledWith([expectedNavigation.navigationUrl]);
        });
    });

    describe("on form close", () => {
        it("should navigate to the promotion list with current filters", () => {
            // arrange
            const routerNavigateSpy = spyOn(router, "navigate");
            promotionFormBase.initialize(NavigationLinks.promotionEdit);

            // act
            promotionFormBase.onFormClosed();

            // assert
            const expectedParams: Params =  { queryParams: PpFilters.create(filtersManagerMock.filters).toParams() };
            expect(routerNavigateSpy).toHaveBeenCalledWith([NavigationLinks.promotionsList], expectedParams);
        });
    });
});