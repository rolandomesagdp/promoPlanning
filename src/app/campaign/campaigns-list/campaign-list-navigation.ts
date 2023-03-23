import { PpNavigation, NavigationLinks } from '@app/navigation';
import { FiltersManager, PpFilters } from '@app/pp-filters/filters';
import { Router, Params } from '@angular/router';

export class CampaignListNavigation extends PpNavigation {

    private constructor(navigationItem: PpNavigation, private filtersManager: FiltersManager) { 
        super(navigationItem.id, navigationItem.title, navigationItem.routerLink, 
            navigationItem.icon, navigationItem.hasSubMenu, navigationItem.parentId, navigationItem.tooltip);
    }

    static createNavigation(navigationItem: PpNavigation, filtersManager: FiltersManager): CampaignListNavigation {
        const campaignNavigationItem = new CampaignListNavigation(navigationItem, filtersManager);
        if(!campaignNavigationItem.isCampaignNavigation()) {
            const message = `The current navigation item is not a Campaign navigation item. 
            The router link should be ${NavigationLinks.campaigns}`;
            throw Error(message)
        }
        return campaignNavigationItem;
    }

    navigate(router: Router): void {
        const params: Params = PpFilters.create(this.filtersManager.filters).toParams();
        router.navigate([this.routerLink], { queryParams: params });
    }
}