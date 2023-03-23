import { ActivatedRoute, Params, Router } from "@angular/router";
import { SidenavMenuService } from "@app/layout/sidenav";
import { NavigationLinks, PpNavigation, PromotionNavigation } from "@app/navigation";
import { PromotionFormNavigation } from "@app/navigation/promotion-navigation/promotion-form-navigation.model";
import { FiltersManager } from "@app/pp-filters/filters";
import { SubscriptionsManager } from "@shared/rxjs-subscriptions";
import { promotionFormNavigation } from "../../navigation/navigation-lists/promotion-form-navigation-items";

export class PromotionFormBase {
    private promotionListNavigation: PpNavigation = PpNavigation.create(1, 'Promotions', NavigationLinks.promotionsList, "list", false, 0, "Promotions");
    subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
    promotionId: string;
    activeItem: PpNavigation;

    constructor(private router: Router, private route: ActivatedRoute, 
        private filtersManager: FiltersManager, private sidenavMenuService: SidenavMenuService) { }

    initialize(navigationLink: NavigationLinks): void {
        this.setPromotionIdFromParams();
        this.setActiveItem(navigationLink);
        this.closeLeftNavBar()
    }

    onNavigate(navigationItem: PpNavigation): void {
        PromotionFormNavigation
            .createPromotionFormNavigation(navigationItem, this.promotionId)
            .navigate(this.router);
    }

    onFormClosed(): void {
        PromotionNavigation
        .createPromoNavigation(this.promotionListNavigation, this.filtersManager)
        .navigate(this.router);
    }

    private setActiveItem(navigationLink: NavigationLinks): void {
        this.activeItem = promotionFormNavigation.find(x => x.routerLink === navigationLink);
    }

    private setPromotionIdFromParams(): void {
        this.route.params.subscribe((params: Params) => {
            this.promotionId = params["id"];
        });
    }

    private closeLeftNavBar(): void {
        if(this.sidenavMenuService.sidenavMenuExpanded) {
            this.sidenavMenuService.toggleExpandSideNavMenu();
        }
    }
}