import { HarnessLoader } from '@angular/cdk/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { PromotionLockService } from '@app/promotion-lock';
import { UserAccountService } from '@pp-core/auth/user';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { ConfirmationDialogService } from '@shared/components/confirmation-dialog';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { of } from 'rxjs';
import { PromotionActionsComponent } from '../promotion-actions.component';
import { PromotionCopyComponent } from '@app/promotion/promotion-copy/promotion-copy.component';
import { AuthenticationGuard } from '@pp-core/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentService } from '@pp-core/environment';
import { PromotionActionsManager } from '../promotion-actions.manager';
import { PromotionActionsComponentSpecSetup } from './promotion-actions.specsetup';
import { IPromotion } from '@app/promotion-common/promotion/promotion.model';
import { PromotionService } from '@app/promotion-common/promotion-service/promotion.service';
import { NavigationLinks } from '@app/navigation';
import { ConfirmationResponse } from '@shared/components/confirmation-dialog/data';
import { PromotionPermissionsManager } from '@app/promotion-common/promotion-permissions/promotion-permissions-manager';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { PromotionSimulationService } from '@app/promotion-common/promotion-simulation';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';
import { PromotionFormService } from '@app/promotion-common/promotion-form/promotion-form.service';

describe('PromotionActionsComponent', () => {
  const specSetup: PromotionActionsComponentSpecSetup = new PromotionActionsComponentSpecSetup();
  let loader: HarnessLoader;
  let component: PromotionActionsComponent;
  let fixture: ComponentFixture<PromotionActionsComponent>;

  let userAccountServiceMock;
  let promotionLockServiceMock;
  let confirmationDialogMock;
  let snackBarServiceMock;
  let environmentServiceMock;
  let logServiceMock;
  let promotionServiceMock;
  let promotionPermissionsManagerMock;
  let simulationServiceMock;
  let toggleDrawerServiceMock;
  let promotionFormServiceMock;

  beforeEach(async () => {
    promotionLockServiceMock = jasmine.createSpyObj("promotionLockServiceMock",
      ["unlockPromotion", "requestPromotionUnlock", "forcePromotionUnlock"]);
    promotionLockServiceMock.unlockPromotion.and.returnValue(of());
    promotionLockServiceMock.requestPromotionUnlock.and.returnValue(of())
    promotionLockServiceMock.forcePromotionUnlock.and.returnValue(of())

    userAccountServiceMock = jasmine.createSpyObj("userAccountServiceMock", ["userCanReadRoi"], {
      currentUser: { isAdmin: true },
      permissionManager: {
        isAllowedPermission: (permission: string) => {
          return true;
        }
      }
    });

    confirmationDialogMock = jasmine.createSpyObj("confirmationDialogMock", ["confirm"]);
    confirmationDialogMock.confirm.and.returnValue(of(ConfirmationResponse.Accept))
    snackBarServiceMock = jasmine.createSpyObj("snackbarServiceMock", ["openError", "openSuccess"]);
    environmentServiceMock = jasmine.createSpyObj("environmentServiceMock", ["getEnvironment"]);
    environmentServiceMock.getEnvironment.and.returnValue({ serverUrl: "someServer", promotion: false, local_id: "EN-en" })
    logServiceMock = jasmine.createSpyObj("logServiceMock", ["error", "debug"]);
    promotionServiceMock = jasmine.createSpyObj("promotionServiceMock", ["deletePromo"]);
    promotionPermissionsManagerMock = jasmine.createSpyObj("promotionPermissionsManagerMock",
      ["userCanWriteUplift", "userCanWrite", "userCanReadRoi", "userCanUnlock", "userIsAdmin",
        "userCanCopy", "userCanExport", "userCanDelete"]);
    
    simulationServiceMock = jasmine.createSpyObj("simulationServiceMock", ["dummyFunction"], {
      simulationIsActive: false
    });

    promotionFormServiceMock = jasmine.createSpyObj("promotionFormServiceMock", ["clearForm", "initializeForm"], {
      promotionForm: specSetup.promotionForm,
    });

    toggleDrawerServiceMock = jasmine.createSpyObj("toggleDrawerServiceMock", ["toggleDrawer"]);

    await TestBed.configureTestingModule({
      declarations: [PromotionActionsComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'copy/:id', component: PromotionCopyComponent, canActivate: [AuthenticationGuard] }]),
        HttpClientTestingModule,
        PpAngularMaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: PromotionLockService, useValue: promotionLockServiceMock },
        { provide: UserAccountService, useValue: userAccountServiceMock },
        { provide: ConfirmationDialogService, useValue: confirmationDialogMock },
        { provide: SnackbarService, useValue: snackBarServiceMock },
        { provide: LogService, useValue: logServiceMock },
        { provide: EnvironmentService, useValue: environmentServiceMock },
        { provide: PromotionService, useValue: promotionServiceMock },
        { provide: PromotionPermissionsManager, useValue: promotionPermissionsManagerMock },
        { provide: PromotionSimulationService, useValue: simulationServiceMock },
        { provide: ToggleDrawerService, useValue: toggleDrawerServiceMock },
        { provide: PromotionFormService, useValue: promotionFormServiceMock },
        PromotionActionsManager
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionActionsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.promotion = specSetup.promotion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("actions menu", async () => {
    it('should open on click', async () => {
      // arrange
      component.showDeleteAction = true;

      // act
      fixture.detectChanges();
      const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
      await actionsMenuHarness.open();

      // assert
      const actionsMenuIsOpen = await actionsMenuHarness.isOpen();
      expect(actionsMenuIsOpen).toBeTrue();
    });
  });

  describe("actions menu items", async () => {

    describe("forecast item", async () => {
      it("should display if promotion is locked", async () => {
        // arrange
        let lockedPromotion: IPromotion = { ...specSetup.promotion };
        lockedPromotion.isLocked = true;
        lockedPromotion.lockedUser = "system";
        lockedPromotion.lockStartTime = new Date();

        component.promotion = lockedPromotion;
        fixture.detectChanges();

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const forecastItem = await actionsMenuHarness.getItems({ selector: '#forecast-menu-item' });

        // assert
        expect(forecastItem.length).toEqual(1);
      });

      it("should display if promotion is unlock", async () => {
        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const forecastItem = await actionsMenuHarness.getItems({ selector: '#forecast-menu-item' });

        // assert
        expect(forecastItem.length).toEqual(1);
      });

      describe("on click", async () => {
        it("should navigate to readonly forecast if user does not have permission to write forecast", async () => {
          // arrange
          component.actions.promotionPermissions.userCanWriteUplift = () => { return false };
          const navigateSpy = spyOn(component.actions.router, "navigate");
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const forecastItem = await actionsMenuHarness.getItems({ selector: '#forecast-menu-item' });

          // act
          await forecastItem[0].click();

          // assert
          const navigationLink: string[] = [`${NavigationLinks.forecastDetails}/${component.promotion.promoId}`];
          expect(navigateSpy).toHaveBeenCalledOnceWith(navigationLink);
        });

        it("should navigate to readonly forecast if promotion is locked", async () => {
          // arrange
          const navigateSpy = spyOn(component.actions.router, "navigate");
          component.promotion.isLocked = true;
          fixture.detectChanges();
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const forecastItem = await actionsMenuHarness.getItems({ selector: '#forecast-menu-item' });

          // act
          await forecastItem[0].click();

          // assert
          const navigationLink: string[] = [`${NavigationLinks.forecastDetails}/${component.promotion.promoId}`];
          expect(navigateSpy).toHaveBeenCalledOnceWith(navigationLink);
        });

        it("should navigate to readonly forecast if promotion is in the past", async () => {
          // arrange
          const navigateSpy = spyOn(component.actions.router, "navigate");
          component.promotion.isPastPromotion = true;
          fixture.detectChanges();
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const forecastItem = await actionsMenuHarness.getItems({ selector: '#forecast-menu-item' });

          // act
          await forecastItem[0].click();

          // assert
          const navigationLink: string[] = [`${NavigationLinks.forecastDetails}/${component.promotion.promoId}`];
          expect(navigateSpy).toHaveBeenCalledOnceWith(navigationLink);
        });

        it("should navigate to forecast edit if promotion is not locked, is not in the past and user has permissions to write uplift", async () => {
          // arrange
          // arrange
          component.actions.promotionPermissions.userCanWriteUplift = () => { return true };
          const navigateSpy = spyOn(component.actions.router, "navigate");
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const forecastItem = await actionsMenuHarness.getItems({ selector: '#forecast-menu-item' });

          // act
          await forecastItem[0].click();

          // assert
          const navigationLink: string[] = [`${NavigationLinks.forecastEdit}/${component.promotion.promoId}`];
          expect(navigateSpy).toHaveBeenCalledOnceWith(navigationLink);
        });
      });
    });

    describe("add participants", async () => {
      it("should hide if promotion is locked", async () => {
        // arrange
        let lockedPromotion: IPromotion = { ...specSetup.promotion };
        lockedPromotion.isLocked = true;

        component.promotion = lockedPromotion;
        fixture.detectChanges();

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const participantItem = await actionsMenuHarness.getItems({ selector: '#participants-menu-item' });

        // assert
        expect(participantItem.length).toEqual(0);
      });

      it("should hide if user does not have write permissions over promotions", async () => {
        // arrange
        component.actions.promotionPermissions.userCanWrite = () => { return false; };

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const participantItem = await actionsMenuHarness.getItems({ selector: '#participants-menu-item' });

        // assert
        expect(participantItem.length).toEqual(0);
      });

      it("should display if user has write permissions over promotions and promotion is not locked", async () => {
        // act
        component.actions.promotionPermissions.userCanWrite = () => { return true };
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const participantItem = await actionsMenuHarness.getItems({ selector: '#participants-menu-item' });

        // assert
        expect(participantItem.length).toEqual(1);
      });

      describe("on click", async () => {
        it("should navigate to add participants form", async () => {
          // arrange
          component.actions.promotionPermissions.userCanWrite = () => { return true };
          const navigateSpy = spyOn(component.actions.router, "navigate");
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const participantItem = await actionsMenuHarness.getItems({ selector: '#participants-menu-item' });

          // act
          await participantItem[0].click();

          // assert
          const participantsUrlParam: string[] = [`${NavigationLinks.promotionParticipants}/${component.promotion.promoId}`]
          expect(navigateSpy).toHaveBeenCalledOnceWith(participantsUrlParam);
        });
      });
    });

    describe("participants attributes", async () => {
      it("should hide if promotion is locked", async () => {
        // arrange
        let lockedPromotion: IPromotion = { ...specSetup.promotion };
        lockedPromotion.isLocked = true;

        component.promotion = lockedPromotion;
        fixture.detectChanges();

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const participantAttributesItem = await actionsMenuHarness.getItems({ selector: '#participant-attributes-item' });

        // assert
        expect(participantAttributesItem.length).toEqual(0);
      });

      it("should hide if user does not have write permissions over promotions", async () => {
        // arrange
        component.actions.promotionPermissions.userCanWrite = () => { return false; };

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const participantAttributesItem = await actionsMenuHarness.getItems({ selector: '#participant-attributes-item' });

        // assert
        expect(participantAttributesItem.length).toEqual(0);
      });

      it("should display if user has write permissions over promotions and promotion is not locked", async () => {
        // act
        component.actions.promotionPermissions.userCanWrite = () => { return true; };
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const participantAttributesItem = await actionsMenuHarness.getItems({ selector: '#participant-attributes-item' });

        // assert
        expect(participantAttributesItem.length).toEqual(1);
      });

      describe("on click", async () => {
        it("should navigate to add participants form", async () => {
          // arrange
          component.actions.promotionPermissions.userCanWrite = () => { return true; };
          const navigateSpy = spyOn(component.actions.router, "navigate");
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const participantAttributesItem = await actionsMenuHarness.getItems({ selector: '#participant-attributes-item' });

          // act
          await participantAttributesItem[0].click();

          // assert
          const participantAttributesParam: string[] = [`${NavigationLinks.participantAttributes}/${component.promotion.promoId}`]
          expect(navigateSpy).toHaveBeenCalledOnceWith(participantAttributesParam);
        });
      });
    });

    describe("roi", async () => {
      it("should hide if user does not have roi read permissions", async () => {
        // arrange
        component.actions.promotionPermissions.userCanReadRoi = () => { return false; };

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const roiItem = await actionsMenuHarness.getItems({ selector: '#roi-item' });

        // assert
        expect(roiItem.length).toEqual(0);
      });

      it("should display if user has roi read permissions", async () => {
        // act
        component.actions.promotionPermissions.userCanReadRoi = () => { return true };
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const roiItem = await actionsMenuHarness.getItems({ selector: '#roi-item' });

        // assert
        expect(roiItem.length).toEqual(1);
      });

      describe("on click", async () => {
        it("should navigate to roi page", async () => {
          // arrange
          component.actions.promotionPermissions.userCanReadRoi = () => { return true };
          const navigateSpy = spyOn(component.actions.router, "navigate");
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const roiItem = await actionsMenuHarness.getItems({ selector: '#roi-item' });

          // act
          await roiItem[0].click();

          // assert
          const roiParam: string[] = [`${NavigationLinks.promotionRoi}/${component.promotion.promoId}`]
          expect(navigateSpy).toHaveBeenCalledOnceWith(roiParam);
        });
      });
    });

    describe("unlock request", async () => {
      it("should hide if user does not have unlock permissions", async () => {
        // arrange
        component.actions.promotionPermissions.userCanUnlock = () => { return false; };
        component.promotion.isLocked = true;
        fixture.detectChanges();

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const unlockRequestItem = await actionsMenuHarness.getItems({ selector: '#unlock-request-item' });

        // assert
        expect(unlockRequestItem.length).toEqual(0);
      });

      it("should hide if promotion is unlock", async () => {
        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const unlockRequestItem = await actionsMenuHarness.getItems({ selector: '#unlock-request-item' });

        // assert
        expect(unlockRequestItem.length).toEqual(0);
      });

      it("should show if promotion is locked and user has unlock permissions", async () => {
        // arrange
        component.actions.promotionPermissions.userCanUnlock = () => { return true };
        component.promotion.isLocked = true;

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const unlockRequestItem = await actionsMenuHarness.getItems({ selector: '#unlock-request-item' });

        // assert
        expect(unlockRequestItem.length).toEqual(1);
      });

      describe("on click", async () => {
        it("should open the promotion unlock request confirmation dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userCanUnlock = () => { return true };
          component.promotion.isLocked = true;
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const unlockRequestItem = await actionsMenuHarness.getItems({ selector: '#unlock-request-item' });

          // act
          await unlockRequestItem[0].click();

          // assert
          expect(confirmationDialogMock.confirm).toHaveBeenCalled();
        });

        it("should request an unlock if user confirms in the dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userCanUnlock = () => { return true };
          component.actions.confirmationService.confirm = () => { return of(ConfirmationResponse.Accept) }
          component.promotion.isLocked = true;
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const unlockRequestItem = await actionsMenuHarness.getItems({ selector: '#unlock-request-item' });

          // act
          await unlockRequestItem[0].click();

          // assert
          expect(component.actions.promotionLockService.requestPromotionUnlock)
            .toHaveBeenCalledWith(component.promotion.promoId);
        });

        it("should do nothing if the user rejects in the dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userCanUnlock = () => { return true };
          component.actions.confirmationService.confirm = () => { return of(ConfirmationResponse.Reject) }
          component.promotion.isLocked = true;
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const unlockRequestItem = await actionsMenuHarness.getItems({ selector: '#unlock-request-item' });

          // act
          await unlockRequestItem[0].click();

          // assert
          expect(component.actions.promotionLockService.requestPromotionUnlock).not.toHaveBeenCalled();
        });
      });
    });

    describe("force unlock", async () => {
      it("should hide if user is not admin", async () => {
        // arrange
        component.actions.promotionPermissions.userIsAdmin = () => { return false; };
        component.promotion.isLocked = true;
        fixture.detectChanges();

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const forceUnlocktItem = await actionsMenuHarness.getItems({ selector: '#force-unlock-item' });

        // assert
        expect(forceUnlocktItem.length).toEqual(0);
      });

      it("should hide if promotion is unlock", async () => {
        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const forceUnlocktItem = await actionsMenuHarness.getItems({ selector: '#force-unlock-item' });

        // assert
        expect(forceUnlocktItem.length).toEqual(0);
      });

      it("should show if promotion is locked and user is admin", async () => {
        // arrange
        component.actions.promotionPermissions.userIsAdmin = () => { return true };
        component.promotion.isLocked = true;

        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const forceUnlocktItem = await actionsMenuHarness.getItems({ selector: '#force-unlock-item' });

        // assert
        expect(forceUnlocktItem.length).toEqual(1);
      });

      describe("on click", async () => {
        it("should open the promotion force unlock confirmation dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userIsAdmin = () => { return true };
          component.promotion.isLocked = true;
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const forceUnlocktItem = await actionsMenuHarness.getItems({ selector: '#force-unlock-item' });

          // act
          await forceUnlocktItem[0].click();

          // assert
          expect(confirmationDialogMock.confirm).toHaveBeenCalled();
        });

        it("should request an unlock if user confirms in the dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userIsAdmin = () => { return true };
          component.promotion.isLocked = true;
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const forceUnlocktItem = await actionsMenuHarness.getItems({ selector: '#force-unlock-item' });

          // act
          await forceUnlocktItem[0].click();

          // assert
          expect(component.actions.promotionLockService.forcePromotionUnlock)
            .toHaveBeenCalledWith(component.promotion.promoId);
        });

        it("should do nothing if the user rejects in the dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userIsAdmin = () => { return true };
          component.actions.confirmationService.confirm = () => { return of(ConfirmationResponse.Reject) }
          component.promotion.isLocked = true;
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const forceUnlocktItem = await actionsMenuHarness.getItems({ selector: '#force-unlock-item' });

          // act
          await forceUnlocktItem[0].click();

          // assert
          expect(component.actions.promotionLockService.forcePromotionUnlock).not.toHaveBeenCalled();
        });
      });
    });

    describe("copy promotion", async () => {
      it("should display", async () => {
        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const copyPromoItem = await actionsMenuHarness.getItems({ selector: '#copy-promotion-item' });

        // assert
        expect(copyPromoItem.length).toEqual(1);
      });

      describe("on click", async () => {
        it("should navigate to copy promotion form", async () => {
          // arrange
          component.actions.promotionPermissions.userCanCopy = () => { return true };
          const navigateSpy = spyOn(component.actions.router, "navigate");
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const copyPromoItem = await actionsMenuHarness.getItems({ selector: '#copy-promotion-item' });

          // act
          await copyPromoItem[0].click();

          // assert
          const copyPromoUrlParam: string[] = [`${NavigationLinks.promotionCopy}/${component.promotion.promoId}`]
          expect(navigateSpy).toHaveBeenCalledOnceWith(copyPromoUrlParam);
        });
      });
    });

    describe("export promotion", async () => {
      it("should display", async () => {
        // act
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();
        const promoExportItem = await actionsMenuHarness.getItems({ selector: '#export-promo-item' });

        // assert
        expect(promoExportItem.length).toEqual(1);
      });

      describe("on click", async () => {
        it("should trigger a promotion export process.", async () => {
          // arrange
          component.actions.promotionPermissions.userCanExport = () => { return true };
          const exportProccessSpy = spyOn(component.actions.promotionExport, "executeExport").and.returnValue(of());
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();
          const promoExporyItem = await actionsMenuHarness.getItems({ selector: '#export-promo-item' });

          // act
          await promoExporyItem[0].click();

          // assert
          expect(exportProccessSpy).toHaveBeenCalledOnceWith(component.promotion);
        });
      });
    });

    describe("delete promotion", async () => {
      it("should not display if user don't have delete permission", async () => {
        // arrang
        component.actions.promotionPermissions.userCanDelete = () => { return false };
        component.showDeleteAction = true;
        fixture.detectChanges();
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();

        // act
        const deleteItem = await actionsMenuHarness.getItems({ selector: '#delete-item' });

        // assert
        expect(deleteItem.length).toEqual(0);
      });

      it("should not display if promotion is locked", async () => {
        // arrang
        component.showDeleteAction = true;
        component.promotion.isLocked = true;
        fixture.detectChanges();
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();

        // act
        const deleteItem = await actionsMenuHarness.getItems({ selector: '#delete-item' });

        // assert
        expect(deleteItem.length).toEqual(0);
      });

      it("should not display if delete item is disabled", async () => {
        // arrang
        component.showDeleteAction = false;
        fixture.detectChanges();
        const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
        await actionsMenuHarness.open();

        // act
        const deleteItem = await actionsMenuHarness.getItems({ selector: '#delete-item' });

        // assert
        expect(deleteItem.length).toEqual(0);
      });

      describe("on click", async () => {
        it("should open a promotion delete confirmation dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userCanDelete = () => { return true };
          component.showDeleteAction = true;
          fixture.detectChanges();
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();

          // act
          const deleteItem = await actionsMenuHarness.getItems({ selector: '#delete-item' });
          await deleteItem[0].click();

          // assert
          expect(component.actions.confirmationService.confirm).toHaveBeenCalled();
        });

        it("should delete the promotion if the user confirms in the confirmation dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userCanDelete = () => { return true };
          component.actions.confirmationService.confirm = () => { return of(ConfirmationResponse.Accept) }
          component.showDeleteAction = true;
          fixture.detectChanges();
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();

          // act
          const deleteItem = await actionsMenuHarness.getItems({ selector: '#delete-item' });
          await deleteItem[0].click();

          // assert
          expect(component.actions.promotionService.deletePromo)
            .toHaveBeenCalledWith(component.promotion.promoId);
        });

        it("should do nothing if the user rejects in the confirmation dialog", async () => {
          // arrange
          component.actions.promotionPermissions.userCanDelete = () => { return true };
          component.actions.confirmationService.confirm = () => { return of(ConfirmationResponse.Reject) }
          component.showDeleteAction = true;
          fixture.detectChanges();
          const actionsMenuHarness = await loader.getHarness(MatMenuHarness);
          await actionsMenuHarness.open();

          // act
          const deleteItem = await actionsMenuHarness.getItems({ selector: '#delete-item' });
          await deleteItem[0].click();

          // assert
          expect(component.actions.promotionService.deletePromo).not.toHaveBeenCalled();
        });
      });
    });
  });
})