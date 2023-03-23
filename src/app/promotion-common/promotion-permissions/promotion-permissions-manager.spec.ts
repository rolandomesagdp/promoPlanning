import { TestBed } from '@angular/core/testing';
import { UserAccountService } from '@pp-core/auth/user';
import { PromoSellDate } from '@pp-core/settings';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { PromoPermissionsManagerSpecSetup } from './promotion-permission-manager.specsetup';
import { PromotionPermissionsManager } from './promotion-permissions-manager';


describe('PromotionPermissionsManager', () => {
    const specSetup: PromoPermissionsManagerSpecSetup = new PromoPermissionsManagerSpecSetup();
    let promotionPermissions: PromotionPermissionsManager;
    let userAccountServiceMock;
    let settingsManagerMock;

    beforeEach(async () => {
        userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
            permissionManager: specSetup.permissionsManagerAllowing,
            currentUser: specSetup.adminPlannerUser,
            userIsPlanner: true 
        });

        settingsManagerMock = jasmine.createSpyObj("settigsManagerMock", ["dummyFunction"], {
            promoSellDate: PromoSellDate.sellIn
        });

        await TestBed.configureTestingModule({
            providers: [
                PromotionPermissionsManager,
                { provide: UserAccountService, useValue: userAccountServiceMock },
                { provide: SettingsManager, useValue: settingsManagerMock }
            ]
        });
    });

    beforeEach(() => {
        promotionPermissions = TestBed.inject(PromotionPermissionsManager)
    });

    it('should create', () => {
        expect(promotionPermissions).toBeTruthy();
    });

    describe("admin user permission", () => {
        it("should return true if user is admin", () => {
            // assert
            expect(promotionPermissions.userIsAdmin()).toBeTrue();
        });

        it("should return false if user is not admin", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerAllowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userIsAdmin()).toBeFalsy();
        });
    });


    describe("promotion read", () => {
        it("should return true if user has read permissions", () => {
            // assert
            expect(promotionPermissions.userCanRead()).toBeTrue();
        });

        it("should return false if user does not have read permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userCanRead()).toBeFalsy();
        });
    });

    describe("promotion copy", () => {
        it("should return true if user has copy permissions", () => {
            // assert
            expect(promotionPermissions.userCanCopy()).toBeTrue();
        });

        it("should return false if user does not have read permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userCanCopy()).toBeFalsy();
        });
    });

    describe("promotion write", () => {
        it("should return true if user has write permissions", () => {
            // assert
            expect(promotionPermissions.userCanWrite()).toBeTrue();
        });

        it("should return false if user does not have write permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userCanWrite()).toBeFalsy();
        });
    });

    describe("promotion roi read", () => {
        it("should return true if user has roi read permissions", () => {
            // assert
            expect(promotionPermissions.userCanReadRoi()).toBeTrue();
        });

        it("should return false if user does not have read roi permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userCanReadRoi()).toBeFalsy();
        });
    });

    describe("promotion uplift write", () => {
        it("should return true if user has uplift write permissions", () => {
            // assert
            expect(promotionPermissions.userCanWriteUplift()).toBeTrue();
        });

        it("should return false if user does not have uplift write permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userCanWriteUplift()).toBeFalsy();
        });
    });

    describe("promotion delete", () => {
        it("should return true if user has delete permissions", () => {
            // assert
            expect(promotionPermissions.userCanDelete()).toBeTrue();
        });

        it("should return false if user does not have delete permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userCanDelete()).toBeFalsy();
        });
    });

    describe("promotion unlock", () => {
        it("should return true if user has unlock permissions", () => {
            // assert
            expect(promotionPermissions.userCanUnlock()).toBeTrue();
        });

        it("should return false if user does not have unlock permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userCanUnlock()).toBeFalsy();
        });
    });

    describe("promotion export", () => {
        it("should return true if user has export permissions", () => {
            // assert
            expect(promotionPermissions.userCanExport()).toBeTrue();
        });

        it("should return false if user does not have export permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.nonAdminDataEntryUser,
                userIsPlanner: false 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            // assert
            expect(promotionPermissions.userCanExport()).toBeFalsy();
        });
    });

    describe("simulation", () => {
        it("should return true if user has simulation permissions, user is planner, the promotion has a type and promotion is in the future", () => {
            // arrange
            promotionPermissions.promotion = specSetup.setPromotionToTheFuture().promotion;

            // act
            const simulationIsAllowed = promotionPermissions.simulationIsAllowed();

            // assert
            expect(simulationIsAllowed).toBeTrue();
        });

        it("should return false if user does not have simulation permissions", () => {
            // arrange
            userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
                permissionManager: specSetup.permissionsManagerDisallowing,
                currentUser: specSetup.adminPlannerUser,
                userIsPlanner: true 
            });
            promotionPermissions.userAccountService = userAccountServiceMock;
            promotionPermissions.promotion = specSetup.setPromotionToTheFuture().promotion;

            // act
            const simulationIsAllowed = promotionPermissions.simulationIsAllowed();

            // assert
            expect(simulationIsAllowed).toBeFalse();
        });

        it("should return false if the promotion is in the past", () => {
             // arrange
             promotionPermissions.promotion = specSetup.setPromotionToThePast().promotion;

             // act
             const simulationIsAllowed = promotionPermissions.simulationIsAllowed();

             // assert
             expect(simulationIsAllowed).toBeFalse();
        });

        it("should return false if the promotion has no type", () => {
            // arrange
            let promotion = {...specSetup.setPromotionToTheFuture().promotion };
            promotion.promoTypeId = null;
            promotionPermissions.promotion = promotion;

            // act
            const simulationIsAllowed = promotionPermissions.simulationIsAllowed();

            // assert
            expect(simulationIsAllowed).toBeFalse();
       });

       it("should return false if user is not planner", () => {
        // arrange
        userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["dummyFunction"], {
            permissionManager: specSetup.permissionsManagerAllowing,
            currentUser: specSetup.adminDataEntryUser,
            userIsPlanner: false 
        });
        promotionPermissions.userAccountService = userAccountServiceMock;
        promotionPermissions.promotion = specSetup.setPromotionToTheFuture().promotion;

        // act
        const simulationIsAllowed = promotionPermissions.simulationIsAllowed();

        // assert
        expect(simulationIsAllowed).toBeFalse();
    });
    });
});