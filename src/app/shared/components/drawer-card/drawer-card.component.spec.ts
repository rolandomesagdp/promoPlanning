import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PpAngularMaterialModule } from "@shared/pp-angular-material";
import { DrawerCardComponent } from "./drawer-card.component";
import { ToggleDrawerService } from "./toggle-drawer-service";

describe("DrawerCardComponent", () => {
    let fixture: ComponentFixture<DrawerCardComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DrawerCardComponent],
            imports: [BrowserAnimationsModule, PpAngularMaterialModule],
            providers: [ ToggleDrawerService ]
        });
        fixture = TestBed.createComponent(DrawerCardComponent);
    });

    it("should create", () => {
        // arrange : arranged in the beforeEach();
        // act
        fixture.detectChanges();

        // assert
        expect(fixture.componentInstance).toBeTruthy();
    });

    it("should subscribe to ToggleDrawerService.toggleDrawerEvent$ onInit()", () => {
        // arrange
        const subscriptionSpy = spyOn(fixture.componentInstance.toggleDrawerService.toggleDrawerEvent$, "subscribe");

        // act
        fixture.detectChanges();

        // assert
        expect(subscriptionSpy).toHaveBeenCalled();
    });

    describe("toggleFilterPane()", () => {

        it("should call toggle() function from Angular Material's MatDrawer", () => {
            // arrange
            fixture.detectChanges();
            const toggleSpy = spyOn(fixture.componentInstance.filterPane, "toggle");

            // act
            fixture.componentInstance.toggleFilterPane();

            // assert
            expect(toggleSpy).toHaveBeenCalled();
        });
    });
});
