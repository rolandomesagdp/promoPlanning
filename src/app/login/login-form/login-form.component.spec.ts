import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatError } from "@angular/material/form-field";
import { MatSpinner } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { LoginModel } from "@pp-core/auth";
import { AuthenticationService } from "@pp-core/auth/authentication-service/authentication.service";
import { SnackbarService } from "@pp-core/snackbar";
import { PromoPlanningSpinnerModule, SpinnerComponent } from "@shared/components/spinner";
import { PpAngularMaterialModule } from "@shared/pp-angular-material";
import { of, throwError } from "rxjs";
import { LoginFormComponent } from "./login-form.component";
import { LoginFormComponentSpecSetup } from "./login-form.component.specsetup";

describe("LoginFormComponent", () => {
    const setup: LoginFormComponentSpecSetup = new LoginFormComponentSpecSetup();
    let authMockService, routerMock, snackbarMockService;
    let fixture: ComponentFixture<LoginFormComponent>;

    beforeEach(() => {
        authMockService = jasmine.createSpyObj(["logIn"], { requestedPath: "/dummyPath" });
        routerMock = jasmine.createSpyObj(["navigate"]);
        snackbarMockService = jasmine.createSpyObj(["openError"]);

        TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            imports: [BrowserAnimationsModule, PpAngularMaterialModule, ReactiveFormsModule, FormsModule, PromoPlanningSpinnerModule],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: AuthenticationService, useValue: authMockService },
                { provide: SnackbarService, useValue: snackbarMockService },
                { provide: FormBuilder },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(LoginFormComponent);
        fixture.detectChanges()
    });

    describe("inputHasError()", () => {
        describe("userID input", () => {
            it("should be true if userID is not populated", () => {
                // arrange:
                fixture.componentInstance.loginForm = setup.createLoginForm();
                fixture.componentInstance.loginForm.controls["userID"].setValue("dummyValue");

                // act:
                fixture.componentInstance.loginForm.controls["userID"].setValue("");

                // assert:
                let inputHasError = fixture.componentInstance.inputHasError("userID", "required");
                expect(inputHasError).toBeTrue();
            });

            it("should be false if userID is populated", () => {
                // arrange:
                fixture.componentInstance.loginForm = setup.createLoginForm();

                // act:
                fixture.componentInstance.loginForm.controls["userID"].setValue("dummyValue");

                // assert:
                let inputHasError = fixture.componentInstance.inputHasError("userID", "required");
                expect(inputHasError).toBeFalse();
            });
        });
        describe("password input", () => {
            it("should be true if password is not populated", () => {
                // arrange:
                fixture.componentInstance.loginForm = setup.createLoginForm();
                fixture.componentInstance.loginForm.controls["password"].setValue("dummyValue");

                // act:
                fixture.componentInstance.loginForm.controls["password"].setValue("");

                // assert:
                let inputHasError = fixture.componentInstance.inputHasError("password", "required");
                expect(inputHasError).toBeTrue();
            });

            it("should be false if password is populated", () => {
                // arrange:
                fixture.componentInstance.loginForm = setup.createLoginForm();

                // act:
                fixture.componentInstance.loginForm.controls["password"].setValue("dummyValue");

                // assert:
                let inputHasError = fixture.componentInstance.inputHasError("password", "required");
                expect(inputHasError).toBeFalse();
            });
        });
    });

    describe("onSubmit", () => {
        it("should call Authentication Service login() with user input values.", () => {
            // arrange:
            authMockService.logIn.and.returnValue(of(setup.createPpUser()));
            fixture.componentInstance.loginForm = setup.createLoginForm();
            fixture.componentInstance.loginForm.controls["userID"].setValue("someUserId");
            fixture.componentInstance.loginForm.controls["password"].setValue("somePassword");
            const loginFormValue: LoginModel = fixture.componentInstance.loginForm.value;

            // act:
            fixture.componentInstance.onSubmit();

            // assert
            expect(authMockService.logIn).toHaveBeenCalledWith(loginFormValue);
        });

        it("should navigate to correct path if login succeed", () => {
            // arrange:
            authMockService.logIn.and.returnValue(of(setup.createPpUser()));

            fixture.componentInstance.loginForm = setup.createLoginForm();
            fixture.componentInstance.loginForm.controls["userID"].setValue("someUserId");
            fixture.componentInstance.loginForm.controls["password"].setValue("somePassword");

            // act:
            fixture.componentInstance.onSubmit();

            // assert:
            const requestedPath = authMockService.requestedPath;
            expect(routerMock.navigate).toHaveBeenCalledWith([requestedPath]);
        });

        it("should stop the loading spinner if login succeed", () => {
            authMockService.logIn.and.returnValue(of(setup.createPpUser()));

            fixture.componentInstance.loginForm = setup.createLoginForm();
            fixture.componentInstance.loginForm.controls["userID"].setValue("someUserId");
            fixture.componentInstance.loginForm.controls["password"].setValue("somePassword");

            // act:
            fixture.componentInstance.onSubmit();

            // assert:
            expect(fixture.componentInstance.loading).toBeFalse();
        });

        it("should call snackbar.openError() with corresponding error message if login fails", () => {
            // arrange:
            const error = setup.createLoginError();
            authMockService.logIn.and.returnValue(throwError(error));
            fixture.componentInstance.loginForm = setup.createLoginForm();
            fixture.componentInstance.loginForm.controls["userID"].setValue("someUserId");
            fixture.componentInstance.loginForm.controls["password"].setValue("somePassword");

            // act:
            fixture.componentInstance.onSubmit();

            // assert:
            expect(snackbarMockService.openError).toHaveBeenCalledWith(error.message);
        });

        it("should stop the loading spinner if login fails", () => {
            // arrange:
            const error = setup.createLoginError();
            authMockService.logIn.and.returnValue(throwError(error));
            fixture.componentInstance.loginForm = setup.createLoginForm();
            fixture.componentInstance.loginForm.controls["userID"].setValue("someUserId");
            fixture.componentInstance.loginForm.controls["password"].setValue("somePassword");

            // act:
            fixture.componentInstance.onSubmit();

            // assert:
            expect(fixture.componentInstance.loading).toBeFalse();
        });
    });

    // Integration tests
    describe("Submit button", () => {
        it("should be enabled if form is valid.", () => {
            // arrange:
            fixture.componentInstance.loginForm = setup.createLoginForm();

            // act:
            fixture.componentInstance.loginForm.controls["userID"].setValue("dummyValue");
            fixture.componentInstance.loginForm.controls["password"].setValue("dummyPassword");
            fixture.detectChanges();

            // assert:
            const submitButton = fixture.nativeElement.querySelector(".submit-button");
            const formIsValid = fixture.componentInstance.loginForm.valid;
            const buttonIsDisabled = submitButton.disabled;
            expect(buttonIsDisabled).toEqual(!formIsValid);
        });

        it("should be disabled if userID is not provided.", () => {
            // arrange:
            fixture.componentInstance.loginForm = setup.createLoginForm();

            // // act:
            fixture.componentInstance.loginForm.controls["password"].setValue("dummyPassword");
            fixture.detectChanges();

            // assert:
            const submitButtonDisabledAttr = fixture.debugElement.query(By.css(".submit-button")).attributes["disabled"];
            expect(submitButtonDisabledAttr).toEqual("true");
        });

        it("should be disabled if password is not provided in login form", () => {
            // arrange:
            fixture.componentInstance.loginForm = setup.createLoginForm();

            // // act:
            fixture.componentInstance.loginForm.controls["userID"].setValue("dummyID");
            fixture.detectChanges();

            // assert:
            const submitButton = fixture.nativeElement.querySelector(".submit-button");
            const buttonIsDisabled = submitButton.disabled;
            expect(buttonIsDisabled).toBeTrue();
        });

        it("should call onSubmit() function on click if values are provided in login form", () => {
            // arrange:
            const onClickMock = spyOn(fixture.componentInstance, "onSubmit");
            fixture.componentInstance.loginForm.controls["userID"].setValue("someUserId");
            fixture.componentInstance.loginForm.controls["password"].setValue("somePassword");
            fixture.detectChanges();

            // act:
            const submitButton = fixture.debugElement.query(By.css("button"));
            submitButton.nativeElement.click();

            // assert:
            expect(onClickMock).toHaveBeenCalled();
        });

        it("should not call onSubmit() function on click if form values are not provided", () => {
            // arrange:
            const onClickMock = spyOn(fixture.componentInstance, "onSubmit");
            fixture.componentInstance.loginForm.controls["userID"].setValue("someUserId");
            fixture.componentInstance.loginForm.controls["password"].setValue("somePassword");
            fixture.detectChanges();

            // act:
            fixture.componentInstance.loginForm.controls["userID"].setValue("");
            fixture.componentInstance.loginForm.controls["password"].setValue("");
            fixture.detectChanges();
            const submitButton = fixture.debugElement.query(By.css("button"));
            submitButton.nativeElement.click();

            // assert:
            expect(onClickMock).not.toHaveBeenCalled();
        });
    });

    describe("Login Form", () => {
        // This event should be created in order to fire it right after the inputs values have changed
        // in order for the FormControl to get updated: it should be called like: input.dispatchEvent(customEvent)
        let customEvent: Event;

        beforeEach(() => {
            customEvent = document.createEvent('Event')
            customEvent.initEvent('input', false, false);
        });

        it("should contain values provided by user in FormGroup", () => {
            // arrange:
            const userID = "dummyUserID";
            const password = "dummyPassword";

            // act:
            let userIDInput = fixture.debugElement.query(By.css(".userID-input")).nativeElement;
            userIDInput.value = userID;
            userIDInput.dispatchEvent(customEvent);

            let passwordInput = fixture.debugElement.query(By.css(".password-input")).nativeElement;
            passwordInput.value = password;
            passwordInput.dispatchEvent(customEvent);

            fixture.detectChanges();

            // assert
            const loginFormUserID = fixture.componentInstance.loginForm.get("userID").value;
            const loginFormPassword = fixture.componentInstance.loginForm.get("password").value;

            expect(loginFormUserID).toEqual(userID);
            expect(loginFormPassword).toEqual(password);
        });

        it("should display user id and password input errors if values are not provided", () => {
            // arrange:
            fixture.componentInstance.loginForm.get("userID").setValue("dummyValue");
            fixture.componentInstance.loginForm.get("password").setValue("dummyPassword");
            fixture.componentInstance.loginForm.markAllAsTouched();
            fixture.detectChanges();

            // act:
            let userIDInput = fixture.debugElement.query(By.css(".userID-input")).nativeElement;
            userIDInput.value = "";
            userIDInput.dispatchEvent(customEvent);
            let passwordInput = fixture.debugElement.query(By.css(".password-input")).nativeElement;
            passwordInput.value = "";
            passwordInput.dispatchEvent(customEvent);
            fixture.detectChanges();

            // assert:
            let errorsLengh = fixture.debugElement.queryAll(By.directive(MatError)).length;
            expect(errorsLengh).toBe(2);
        });
    });

    describe("Spinner", () => {
        it("should be hidden by default", () => {
            // no arrange or act to do

            // assert:
            const spinnerDiv = fixture.debugElement.query(By.directive(MatSpinner));
            expect(spinnerDiv).toBeFalsy();
        });

        it("should be displayed if information is loading", () => {
            // arrange: no arrange to do

            // act:
            fixture.componentInstance.loading = true;
            fixture.detectChanges();

            // assert:
            const spinnerDiv = fixture.debugElement.query(By.directive(SpinnerComponent));
            expect(spinnerDiv).toBeTruthy();
        });

        it("should hide after loading process ends", () => {
            // arrange: no arrange to do
            fixture.componentInstance.loading = true;
            fixture.detectChanges();
            // act:
            fixture.componentInstance.loading = false;
            fixture.detectChanges();

            // assert:
            const spinnerDiv = fixture.debugElement.query(By.directive(MatSpinner));
            expect(spinnerDiv).toBeFalsy();
        });
    });
});