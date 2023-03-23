import { Params, Router } from "@angular/router";
import { FiltersManager, PpFilters } from "@app/pp-filters/filters";
import { PromotionFilterAuthors } from "@pp-core/local-storage";
import { NavigationLinks } from "..";
import { PpNavigation } from "../navigation.model";

export class PromotionNavigation extends PpNavigation {

    get filtersAuthor(): PromotionFilterAuthors {
        switch(this.routerLink) {
            case NavigationLinks.calendar:
                return PromotionFilterAuthors.calendarComponent;
            case NavigationLinks.promotionsList:
                return PromotionFilterAuthors.promotionListComponent;
            case NavigationLinks.promotionCards:
            return PromotionFilterAuthors.promotionListComponent;
            default: {
                throw new Error(`The router link ${this.routerLink} is not a Promotion router link.
                Only ${NavigationLinks.calendar}, ${NavigationLinks.promotionsList} and ${NavigationLinks.promotionCards} are considered as Promotions router links.`);
            }
        }
    }

    private constructor(navigationItem: PpNavigation, private filtersManager: FiltersManager) { 
        super(navigationItem.id, navigationItem.title, navigationItem.routerLink, 
            navigationItem.icon, navigationItem.hasSubMenu, navigationItem.parentId, navigationItem.tooltip);
    }

    static createPromoNavigation(navigationItem: PpNavigation, filtersManager: FiltersManager): PromotionNavigation {
        const promotionNavigationItem = new PromotionNavigation(navigationItem, filtersManager);
        if(!promotionNavigationItem.isPromotionNavigation()) {
            const message = `The current navigation item is not a Promotion navigation item. 
            The router link should be either ${NavigationLinks.calendar}, ${NavigationLinks.promotionsList} or ${NavigationLinks.promotionCards}`;
            throw Error(message)
        }
        return promotionNavigationItem;
    }

    navigate(router: Router): void {
        const params: Params = PpFilters.create(this.filtersManager.filters).toParams();
        router.navigate([this.routerLink], { queryParams: params });
    }
}