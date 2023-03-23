import { Router } from "@angular/router";
import { NavigationLinks } from ".";

export class PpNavigation {
    constructor(public id: number, public title: string, public routerLink: NavigationLinks,
                public icon: string, public hasSubMenu: boolean, public parentId: number, public tooltip: string) { }

    static create(id: number, title: string, routerLink: NavigationLinks, 
        icon: string, hasSubMenu: boolean, parentId: number, tooltip: string): PpNavigation {
            const navigation = new PpNavigation(id, title, routerLink, icon, hasSubMenu, parentId, tooltip);
            if(navigation.isValid()) {
                return navigation;
            }
            else {
                throw new Error("The provided values are not valid to build a Navigation instance. Make sure to provide a valid id, title, icon and parentid");
            }
        }

    isPromotionNavigation(): boolean {
        if(this.routerLink === NavigationLinks.promotionsList || 
            this.routerLink === NavigationLinks.calendar || this.routerLink === NavigationLinks.promotionCards) {
            return true;
        }
        return false;
    }

    isPromotionFormNavigation(): boolean {
        if(this.routerLink === NavigationLinks.promotionDetails || 
            this.routerLink === NavigationLinks.promotionEdit ||
            this.routerLink === NavigationLinks.promotionCopy ||
            this.routerLink === NavigationLinks.forecastEdit ||
            this.routerLink === NavigationLinks.forecastDetails ||
            this.routerLink === NavigationLinks.promotionParticipants ||
            this.routerLink === NavigationLinks.participantAttributes ||
            this.routerLink === NavigationLinks.promotionRoi) {
            return true;
        }
        return false;
    }

    isCampaignNavigation(): boolean {
        if(this.routerLink === NavigationLinks.campaigns) {
            return true;
        }
        return false;
    }

    navigate(router: Router): void {
        if(!this.isPromotionNavigation() && this.routerLink) {
            router.navigate([this.routerLink]);
        }
    }

    private isValid(): boolean {
        if(this.id && this.title && this.icon && (this.parentId !== null && this.parentId !== undefined)) {
            return true;
        }
        return false;
    }
}