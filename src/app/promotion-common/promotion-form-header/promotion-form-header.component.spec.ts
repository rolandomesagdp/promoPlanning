import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationLinks, PpNavigation } from '@app/navigation';
import { UserAccountService } from '@pp-core/auth/user';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { PromotionPermissionsManager } from '../promotion-permissions/promotion-permissions-manager';

import { PromotionFormHeaderComponent } from './promotion-form-header.component';

describe('PromotionFormHeaderComponent', () => {
    let component: PromotionFormHeaderComponent;
    let fixture: ComponentFixture<PromotionFormHeaderComponent>;
    let userAccountServiceMock;
    let settingsManagerMock;
    let promotionPermissionsMock;

    beforeEach(async () => {
        userAccountServiceMock = jasmine.createSpyObj("UserAccountServiceMock", ["userCanReadRoi"], {
            permissionManager: {
                isAllowedPermission: (permission: string) => {
                    return true;
                }
            }
        });

        settingsManagerMock = jasmine.createSpyObj("SettingsManagerMock", [], {
            roiEnabled: true
        });

        promotionPermissionsMock = jasmine.createSpyObj("promotionPermissionsManagerMock", ["userCanWriteUplift", "userCanWrite", 
        "userCanReadRoi", "userCanUnlock", "userIsAdmin", "userCanCopy", "userCanExport", "userCanDelete"]);

        await TestBed.configureTestingModule({
            declarations: [PromotionFormHeaderComponent],
            providers: [
                { provide: UserAccountService, useValue: userAccountServiceMock },
                { provide: SettingsManager, useValue: settingsManagerMock },
                { provide: PromotionPermissionsManager, useValue: promotionPermissionsMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionFormHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    describe("navigation items", () => {
        it("should be set up on init", () => {
            // arrange
            component.showPromoDetailsNav = true;
            component.showPromoEditNav = true;
            component.showEditForecastNav = true;
            component.showParticipantAttributesNav = true;

            // act
            component.ngOnInit();

            // assert
            expect(component.navItems.length).toEqual(5);
        });

        describe("promotion details nav item", () => {
            it("should be printed if is enabled", () => {
                // arrange
                component.showPromoDetailsNav = true;

                // act
                component.ngOnInit();

                // assert
                const promoDetailsNav = component.navItems.find(x => x.routerLink === NavigationLinks.promotionDetails);
                expect(promoDetailsNav).toBeTruthy();
            });

            it("should not be printed if is disabled", () => {
                // arrange
                component.showPromoDetailsNav = false;

                // act
                component.ngOnInit();

                // assert
                const promoDetailsNav = component.navItems.find(x => x.routerLink === NavigationLinks.promotionDetails);
                expect(promoDetailsNav).toBeFalsy();
            });
        });

        describe("promotion edit nav item", () => {
            it("should be printed if is enabled", () => {
                // arrange
                component.showPromoEditNav = true;

                // act
                component.ngOnInit();

                // assert
                const promoEditNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.promotionEdit);
                expect(promoEditNav).toBeTruthy();
            });

            it("should not be printed if is disabled", () => {
                // arrange
                // arrange
                component.showPromoEditNav = false;

                // act
                component.ngOnInit();

                // assert
                const promoEditNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.promotionEdit);
                expect(promoEditNav).toBeFalsy();
            });
        });

        describe("forecast edit nav item", () => {
            it("should be printed if is enabled", () => {
                // arrange
                component.showEditForecastNav = true;

                // act
                component.ngOnInit();

                // assert
                const forecastEditNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.forecastEdit);
                expect(forecastEditNav).toBeTruthy();
            });

            it("should not be printed if is disabled", () => {
                // arrange
                component.showEditForecastNav = false;

                // act
                component.ngOnInit();

                // assert
                const forecastEditNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.forecastEdit);
                expect(forecastEditNav).toBeFalsy();
            });
        });

        describe("participant attributes nav item", () => {
            it("should be printed if is enabled", () => {
                // arrange
                component.showParticipantAttributesNav = true;

                // act
                component.ngOnInit();

                // assert
                const participantsAttributesNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.participantAttributes);
                expect(participantsAttributesNav).toBeTruthy();
            });

            it("should not be printed if is disabled", () => {
                // arrange
                component.showParticipantAttributesNav = false;

                // act
                component.ngOnInit();

                // assert
                const participantsAttributesNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.participantAttributes);
                expect(participantsAttributesNav).toBeFalsy();
            });
        });

        describe("participant nav item", () => {
            it("should be printed if is enabled", () => {
                // arrange
                component.showAddParticipantsNav = true;

                // act
                component.ngOnInit();

                // assert
                const participantsNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.promotionParticipants);
                expect(participantsNav).toBeTruthy();
            });

            it("should not be printed if is disabled", () => {
                // arrange
                component.showAddParticipantsNav = false;

                // act
                component.ngOnInit();

                // assert
                const participantsNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.promotionParticipants);
                expect(participantsNav).toBeFalsy();
            });
        });

        describe("roi nav item", () => {
            it("should be printed if is required, if roi setting is enabled and user has roi permissions", () => {
                // arrange
                component.showROINav = true;
                component.permissionsManager.userCanReadRoi = () => { return true };

                // act
                component.ngOnInit();

                // assert
                const roiNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.promotionRoi);
                expect(roiNav).toBeTruthy();
            });

            it("should not be printed if is disabled", () => {
                // arrange
                component.showROINav = false;

                // act
                component.ngOnInit();

                // assert
                const roiNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.promotionRoi);
                expect(roiNav).toBeFalsy();
            });

            it("should not be printed if the user doesn't have ROI read permissions", () => {
                // arrange
                component.permissionsManager.userCanReadRoi = () => {
                    return false;
                }
                component.showROINav = true;

                // act
                component.ngOnInit();

                // assert
                const roiNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.promotionRoi);
                expect(roiNav).toBeFalsy();
            });

            it("should not be printed if ROI setting is disabled", () => {
                // arrange
                component.settingsManager = jasmine.createSpyObj("SettingsManagerMock", [], {
                    roiEnabled: false
                });

                component.showROINav = true;

                // act
                component.ngOnInit();

                // assert
                const roiNav = component.navItems
                    .find(x => x.routerLink === NavigationLinks.promotionRoi);
                expect(roiNav).toBeFalsy();
            });
        });
    });

    describe("actions", () => {
        it("should notify when nav item is clicked", () => {
            // arrange
            const navigateNotificationSpy = spyOn(component.navigate, "emit");
            const navItem = PpNavigation.create(
                1, 'Promotion Details', NavigationLinks.promotionDetails,
                'home', false, 0, "Promotion Details");

            // act
            component.onNavigationItemClick(navItem);

            // assert
            expect(navigateNotificationSpy).toHaveBeenCalledOnceWith(navItem);
        });

        it("should notify when close button is clicked", () => {
            // arrange
            const closeButtonClickedSpy = spyOn(component.closeButtonClicked, "emit");
            const navItem = PpNavigation.create(
                1, 'Promotion Details', NavigationLinks.promotionDetails,
                'home', false, 0, "Promotion Details");

            // act
            component.closeForm();

            // assert
            expect(closeButtonClickedSpy).toHaveBeenCalled();
        });

        it("should notify when save button is clicked", () => {
            // arrange
            const saveButtonClickedSpy = spyOn(component.saveButtonClicked, "emit");
            const navItem = PpNavigation.create(
                1, 'Promotion Details', NavigationLinks.promotionDetails,
                'home', false, 0, "Promotion Details");

            // act
            component.onSaveButtonClicked();

            // assert
            expect(saveButtonClickedSpy).toHaveBeenCalled();
        });
    });

    describe("ui elements", () => {
        it("should display the save button if input value is true", () => {
            // arrange
            component.showSaveButton = true;

            // act
            fixture.detectChanges();

            // assert
            const saveButton = fixture.debugElement.query(By.css(".save-button"));
            expect(saveButton).toBeTruthy();
        });

        it("should not display the save button if input value is false", () => {
            // arrange
            component.showSaveButton = false;

            // act
            fixture.detectChanges();

            // assert
            const saveButton = fixture.debugElement.query(By.css(".save-button"));
            expect(saveButton).toBeFalsy();
        });

        it("should display the save button as disabled if input value is true", () => {
            // arrange
            component.showSaveButton = true;
            component.saveButtonDisabled = true;

            // act
            fixture.detectChanges();

            // assert
            const saveButtonDebugElement = fixture.debugElement.query(By.css(".save-button"));
            const disabledAttribute = saveButtonDebugElement.nativeElement.attributes["disabled"];
            expect(disabledAttribute.name).toEqual("disabled");
        });

        it("should display the save button as enabled if input value is false", () => {
            // arrange
            component.showSaveButton = true;
            component.saveButtonDisabled = false;

            // act
            fixture.detectChanges();

            // assert
            const saveButtonDebugElement = fixture.debugElement.query(By.css(".save-button"));
            const disabledAttribute = saveButtonDebugElement.nativeElement.attributes["disabled"];
            expect(disabledAttribute).toBeFalsy();
        });

        it("should display the 'more actions' button if is enabled and a promotion is provided", () => {
            // arrange
            component.showMoreActionsMenu = true;
            component.promotion = {
                promoId: "dummyPromoId",
                name: "dummyPromoName",
                description: "dummyPromoDescription",
                imageUrl: "",
                status: 1,
                campaignId: "dummyCampaignId",
                sellInStartDate: "OneDate",
                sellInEndDate: "AnotherDate",
                sellOutStartDate: "JustAnotherDate",
                sellOutEndDate: "LastDummyDate",
                promoTypeId: 1,
                isPastPromotion: false,
                forecast: 12,
                uplift: 12,
                upliftPercent: 0,
                isLocked: false,
                lockedUser: "",
                lockStartTime: null,
                promoAttributes: [],
                flags: []
            }

            // act
            fixture.detectChanges();

            // assert
            const moreActionsMenuDirective = fixture.debugElement.query(By.css(".more-actions-test"));
            expect(moreActionsMenuDirective).toBeTruthy();
        });

        it("should not display the 'more actions' button if is disabled", () => {
            // arrange
            component.showMoreActionsMenu = false;
            component.promotion = {
                promoId: "dummyPromoId",
                name: "dummyPromoName",
                description: "dummyPromoDescription",
                imageUrl: "",
                status: 1,
                campaignId: "dummyCampaignId",
                sellInStartDate: "OneDate",
                sellInEndDate: "AnotherDate",
                sellOutStartDate: "JustAnotherDate",
                sellOutEndDate: "LastDummyDate",
                promoTypeId: 1,
                isPastPromotion: false,
                forecast: 12,
                uplift: 12,
                upliftPercent: 0,
                isLocked: false,
                lockedUser: "",
                lockStartTime: null,
                promoAttributes: [],
                flags: []
            }

            // act
            fixture.detectChanges();

            // assert
            const moreActionsMenuDirective = fixture.debugElement.query(By.css(".more-actions-test"));
            expect(moreActionsMenuDirective).toBeFalsy();
        });

        it("should not display the 'more actions' button if no promotion is provided", () => {
            // arrange
            component.showMoreActionsMenu = true;
            component.promotion = null

            // act
            fixture.detectChanges();

            // assert
            const moreActionsMenuDirective = fixture.debugElement.query(By.css(".more-actions-test"));
            expect(moreActionsMenuDirective).toBeFalsy();
        });
    });

});
