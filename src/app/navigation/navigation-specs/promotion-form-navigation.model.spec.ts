import { NavigationLinks, PpNavigation, PromotionFormNavigation } from "..";

describe("PromotionFormNavigation", () => {
    describe("create", () => {
        it("should correctly create a PpNavigation of type PromoitonFormNavigation", () => {
            // arrange
            const promotionEditNav: PpNavigation = PpNavigation
            .create(2, 'Edit Promotion', NavigationLinks.promotionEdit, 'home', false, 0, "Edit Promotion");
            const promotionId: string = "someDummyId";

            // act
            const promoFormNav = PromotionFormNavigation
                .createPromotionFormNavigation(promotionEditNav, promotionId);

            // assert
            expect(promoFormNav).toBeTruthy();
            expect(promoFormNav).toBeInstanceOf(PromotionFormNavigation);
        });

        it("should thorw an error if the provided PpNavigation is not of type PromoitonFormNavigation", () => {
            // arrange
            const campaignsListNav: PpNavigation = PpNavigation
                .create(3, 'Campaigns', NavigationLinks.campaigns, "campaign", false, 0, "Promotion campaigns")
            const promotionId: string = "someDummyId";
            // assert
            expect(() => PromotionFormNavigation
                .createPromotionFormNavigation(campaignsListNav, promotionId))
                .toThrowError();
        });
    });

    describe("navigate", () => {
        it("should navigate to the correct url", () => {
            // arrange
            const routerSpy = jasmine.createSpyObj(["navigate"]);
            const promotionEditNav: PpNavigation = PpNavigation
            .create(2, 'Edit Promotion', NavigationLinks.promotionEdit, 'home', false, 0, "Edit Promotion");
            const promotionId: string = "dummyPromotionId";
            
            // act
            const promotionFormNavigation: PromotionFormNavigation = PromotionFormNavigation
            .createPromotionFormNavigation(promotionEditNav, promotionId);
            promotionFormNavigation.navigate(routerSpy);

            // assert
            expect(routerSpy.navigate)
            .toHaveBeenCalledWith([promotionFormNavigation.navigationUrl]);
        });

        it("should correctly set up the navigation url", () => {
            // arrange
            const promotionEditNav: PpNavigation = PpNavigation
            .create(2, 'Edit Promotion', NavigationLinks.promotionEdit, 'home', false, 0, "Edit Promotion");
            const promotionId: string = "dummyPromotionId";
            
            // act
            const promotionFormNavigation: PromotionFormNavigation = PromotionFormNavigation
            .createPromotionFormNavigation(promotionEditNav, promotionId);

            // assert
            const expectedUrl: string = `${promotionFormNavigation.routerLink}/${promotionFormNavigation.promotionId}`;;
            expect(promotionFormNavigation.navigationUrl).toEqual(expectedUrl);
        });
    });
});