import { Authentication } from "../authentication.model";
import { UserType } from "./user-type.enum";

export interface PpUser {
    userId: number;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    disabledPermissions: string[];
    clientDisabledPermissions: string,
    disabledAttributes: string[];
    userGroups: string[];
    blacklistStatusIds: string[];
    admin: boolean;
    userType: UserType;
    auth: Authentication;
    canReadAllGroups: boolean;
}