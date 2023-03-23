import { Subscription } from "rxjs";
import { ToggleDrawerService } from "./toggle-drawer.service"

describe("ToggleDrawerService", () => {
    let toggleDrawerService: ToggleDrawerService;
    let toggleDrawerEventSubscription: Subscription;

    beforeEach(() => {
        toggleDrawerService = new ToggleDrawerService();
    });

    afterEach(() => {
        toggleDrawerEventSubscription.unsubscribe();
    });

    describe("toggleDrawerEvent$", () => {
        it("should emit a value if toggleDrawer() function is called", done => {
            // arrange
            toggleDrawerEventSubscription = toggleDrawerService
            .toggleDrawerEvent$
            .subscribe(() => {
                let toggleSrawerEvent$WasCalled = true;
                
                // assert
                expect(toggleSrawerEvent$WasCalled).toBeTrue();
            });

            // act
            toggleDrawerService.toggleDrawer();
            done();
        })
    });
});
