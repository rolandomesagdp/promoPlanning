import { PpUser } from "@pp-core/auth/user/pp-user.model";
import { LocalStorageService } from "./local-storage.service";
import { LocalStorageSpecSetup } from "./local-storages.service.specsetup";

describe("LocalStorageService", () => {
    const setup = new LocalStorageSpecSetup();
    let ppLocalStorage: LocalStorageService;

    beforeEach(() => {
        ppLocalStorage = new LocalStorageService();
        ppLocalStorage.clearStorage();
    });

    describe("addUserPrincipal()", () => {
        it("should add CurrentPrincipal to localStorage when called", () => {
            // arrange: 
            const currentPrincipal = setup.createCurrentPrincipal();            

            // act:
            ppLocalStorage.addCurrentUser(currentPrincipal);
    
            // assert:
            let currentPrincipalFromLS = JSON.parse(localStorage.getItem("user"));
            expect(currentPrincipalFromLS).toEqual(currentPrincipal);
        });
    });

    describe("getUser()", () => {
        it("should return a correct PpUser instance if CurrentPrincipal exists in localStorage", () => {
            // arrange: 
            const currentUser = setup.createCurrentPrincipal();

            // act:
            ppLocalStorage.addCurrentUser(currentUser);
            let ppUserFromStorage: PpUser = ppLocalStorage.getUser();

            // assert:
            expect(ppUserFromStorage).toBeTruthy();
            expect(ppUserFromStorage).toEqual(currentUser);
        })

        it("should return null if no CurrentPrincipal exists in localStorage", () => {
            // arrange:
            ppLocalStorage.addCurrentUser(setup.createCurrentPrincipal());

            // act:
            ppLocalStorage.clearStorage();
            let ppUserFromStorage: PpUser = ppLocalStorage.getUser();

            // assert:
            expect(ppUserFromStorage).toBeNull();
        });

        it("should return null if CurrentPrincipal has incorrect format in localStorage", () => {
            // arrange
            localStorage.setItem("user", "system");

            // act
            const currentUser = ppLocalStorage.getUser();

            // assert
            expect(currentUser).toBeNull();
        });

        it("should clear CurrentPrincipal from localStorage has incorrect format.", () => {
            // arrange
            localStorage.setItem("user", "system");

            // act
            const currentUser = ppLocalStorage.getUser();

            // assert
            const userAfterRequeste = localStorage.getItem("user");
            expect(userAfterRequeste).toBeNull();
        });
    });

    describe("addSettings()", () => {
        it("Should add ConfigSettings to localStorage if addSettings() is called", () => {
            // arrange:
            const configSettings = setup.createConfigSettings();
            // act:
            ppLocalStorage.addSettings(configSettings);

            // assert:
            const settingsFromLocalStorage = JSON.parse(localStorage.getItem("configSettings"));
            expect(settingsFromLocalStorage).toBeTruthy();
            expect(settingsFromLocalStorage).toEqual(configSettings);
        });
    });

    describe("getSettings()", () => {
        it("Should return the correct ConfigSettings instance when called", () => {
            // arrange:
            const configSettings = setup.createConfigSettings();
            ppLocalStorage.addSettings(configSettings);
            
            // act:
            const configSettingsFromStorage = ppLocalStorage.getSettings();

            // assert:
            expect(configSettingsFromStorage).toBeTruthy();
            expect(configSettingsFromStorage).toEqual(configSettings);
        });

        it("should return null if settings has incorrect format in localStorage", () => {
            // arrange
            localStorage.setItem("configSettings", "incorrectSettingsFormat");

            // act
            const configSettings = ppLocalStorage.getSettings();

            // assert
            expect(configSettings).toBeNull();
        });

        it("should delete incorrect formatted settings if exists", () => {
            // arrange
            localStorage.setItem("configSettings", "incorrectSettingsFormat");

            // act
            const configSettings = ppLocalStorage.getSettings();

            // assert
            const settingsAfterRequested = localStorage.getItem("configSettings");
            expect(settingsAfterRequested).toBeNull();
        });

        it("should return null if no settings are stored in localStorage", () => {
            // act
            const configSettings = ppLocalStorage.getSettings();

            // assert
            expect(configSettings).toBeNull();
        });
    });

    describe("clearStorage()", () => {
        it("should clear all local storage", () => {
            // arrange 
            ppLocalStorage.addCurrentUser(setup.createCurrentPrincipal());
            ppLocalStorage.addSettings(setup.createConfigSettings());
            
            // act
            ppLocalStorage.clearStorage();

            // assert
            const storageLength = localStorage.length;
            expect(storageLength).toBe(0);
        });
    });

    describe("clear()", () => {
        it("should delete correct item", () => {
            // arrange
            localStorage.setItem("someItem", "someValue");

            // act
            ppLocalStorage.clear("someItem");

            // assert
            const theItem = localStorage.getItem("someItem");
            expect(theItem).toBeNull();
        })
    });
});
