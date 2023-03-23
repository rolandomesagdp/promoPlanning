import { PpUser } from "@pp-core/auth/user"
import { UserType } from "@pp-core/auth/user/user-type.enum"
import { AppSettings } from "@pp-core/settings/app-settings.model"

export class LocalStorageSpecSetup {
    createCurrentPrincipal(): PpUser {
        return {
            userId: 20,
            userName: "jasmineTestName",
            email: "jasmine@test.com",
            firstName: "",
            lastName: "",
            disabledPermissions: [],
            clientDisabledPermissions: "",
            disabledAttributes: [],
            userGroups: ["DSP1", "DSP13", "DSP16", "DSP17", "DSP22", "DSP27"],
            blacklistStatusIds: [],
            admin: true,
            userType: UserType.planner,
            auth: {token: "no token when using cookies", uuid: "no uui when using cookies"},
            canReadAllGroups: false
        }
    }

    createConfigSettings(): AppSettings {
        return {
            displaySellDate: 1,
            idleTime: 60000,
            isWeeklyDetail: false,
            lockRefreshTime: 5000,
            logLevel: 1,
            maxFutureMonths: 1,
            maxPastMonths: 1,
            promoSellDate: 1,
            roiIsEnabled: true
        }
    }
}