import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PpUser, UserType } from "@pp-core/auth/user";

export class LoginFormComponentSpecSetup {
    createLoginForm(): FormGroup {
        return new FormGroup({
            userID: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
          });
    }

    createPpUser(): PpUser {
        return {
            userId: 1,
            userName: "someUserName",
            email: "some@email.com",
            firstName: "someFirstName",
            lastName: "someLastName",
            disabledPermissions: [],
            clientDisabledPermissions: "",
            disabledAttributes: [],
            userGroups: [],
            blacklistStatusIds: [],
            admin: true,
            userType: UserType.dataEntry,
            auth: {
                token: "",
                uuid: ""
            },
            canReadAllGroups: false
        }
    }

    createLoginError(): any {
        return {
            message: "Dummy message"
        }
    }
}