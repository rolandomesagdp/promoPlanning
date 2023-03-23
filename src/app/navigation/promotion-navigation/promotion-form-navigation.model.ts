import { Router } from "@angular/router";
import { NavigationLinks } from "../navigation-links";
import { PpNavigation } from "../navigation.model";

export class PromotionFormNavigation extends PpNavigation {
    
    get navigationUrl(): string {
        return `${this.routerLink}/${this.promotionId}`;
    }

    private constructor(navigationItem: PpNavigation, public promotionId) { 
        super(navigationItem.id, navigationItem.title, navigationItem.routerLink, 
            navigationItem.icon, navigationItem.hasSubMenu, navigationItem.parentId, navigationItem.tooltip);
    }

    static createPromotionFormNavigation(navigationItem: PpNavigation, promotionId: string): PromotionFormNavigation {
        if(!navigationItem.isPromotionFormNavigation()) {
            const message = `The current navigation item is not a Promotion form navigation item. 
            The router link should be either of the following ${NavigationLinks.promotionDetails},
            ${NavigationLinks.promotionEdit}, ${NavigationLinks.forecastEdit}, ${NavigationLinks.promotionParticipants},
            ${NavigationLinks.participantAttributes} or ${NavigationLinks.promotionRoi}`;
            throw Error(message)
        }
        const promotionNavigationItem = new PromotionFormNavigation(navigationItem, promotionId);
        return promotionNavigationItem;
    }

    navigate(router: Router): void {
        router.navigate([this.navigationUrl]);
    }
}
