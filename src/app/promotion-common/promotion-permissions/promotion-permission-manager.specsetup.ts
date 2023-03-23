import { PpUser, UserType } from "@pp-core/auth/user";
import { IPromotion } from "../promotion/promotion.model";

export class PromoPermissionsManagerSpecSetup {
    private promo: IPromotion = {
        promoId: "dummyPromoId",
        name: "Dummy Promo Name",
        description: "Some description",
        imageUrl: "some/url",
        status: 1,
        campaignId: "dummyCampaignId",
        sellInStartDate: new Date().toDateString(),
        sellInEndDate: new Date().toDateString(),
        sellOutStartDate: new Date().toDateString(),
        sellOutEndDate: new Date().toDateString(),
        promoTypeId: 1,
        isPastPromotion: false,
        forecast: 12,
        uplift: 12,
        upliftPercent: 12,
        isLocked: false,
        lockedUser: "",
        lockStartTime: null,
        promoAttributes: [],
        flags: []
    }

    get adminPlannerUser(): PpUser {
        return {
            userId: 1,
            userName: "someName",
            email: "someemail@email.com",
            firstName: "someName",
            lastName: "someLastName",
            disabledPermissions: [],
            clientDisabledPermissions: "",
            disabledAttributes: [],
            userGroups: [],
            blacklistStatusIds: [],
            admin: true,
            userType: UserType.planner,
            auth: { token: "", uuid: "" },
            canReadAllGroups: true
        }
    }

    get adminDataEntryUser(): PpUser {
        return {
            userId: 1,
            userName: "someName",
            email: "someemail@email.com",
            firstName: "someName",
            lastName: "someLastName",
            disabledPermissions: [],
            clientDisabledPermissions: "",
            disabledAttributes: [],
            userGroups: [],
            blacklistStatusIds: [],
            admin: true,
            userType: UserType.dataEntry,
            auth: { token: "", uuid: "" },
            canReadAllGroups: true
        }
    }

    get nonAdminDataEntryUser(): PpUser {
        return {
            userId: 1,
            userName: "someName",
            email: "someemail@email.com",
            firstName: "someName",
            lastName: "someLastName",
            disabledPermissions: [],
            clientDisabledPermissions: "",
            disabledAttributes: [],
            userGroups: [],
            blacklistStatusIds: [],
            admin: false,
            userType: UserType.planner,
            auth: { token: "", uuid: "" },
            canReadAllGroups: true
        }
    }

    get permissionsManagerAllowing(): any {
        let permissionsManager = jasmine
            .createSpyObj("permissionsManagerMock", ["isAllowedPermission"])
        permissionsManager.isAllowedPermission.and.returnValue(true);
        return permissionsManager;
    }

    get permissionsManagerDisallowing(): any {
        let permissionsManager = jasmine
            .createSpyObj("permissionsManagerMock", ["isAllowedPermission"])
            
        permissionsManager.isAllowedPermission.and.returnValue(false);
        return permissionsManager;
    }

    get promotion(): IPromotion {
        return this.promo;
    }

    constructor() { }

    setPromotionToTheFuture(): PromoPermissionsManagerSpecSetup {
        const today: Date = new Date();
        const nextYear: number = today.getFullYear() + 1;
        let futureDate: Date = new Date();
        futureDate.setFullYear(nextYear);
        this.promo.sellInEndDate = futureDate.toDateString(); 
        this.promo.sellOutEndDate = futureDate.toDateString();
        return this;
    }

    setPromotionToThePast(): PromoPermissionsManagerSpecSetup {
        const today: Date = new Date();
        const lastYear: number = today.getFullYear() -1;
        let pastDate: Date = new Date();
        pastDate.setFullYear(lastYear);
        this.promo.sellInEndDate = pastDate.toDateString(); 
        this.promo.sellOutEndDate = pastDate.toDateString();
        return this;
    }
}