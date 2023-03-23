import { NavigationLinks } from "../navigation-links";
import { PpNavigation } from "../navigation.model";

export const promotionNavigationItems: PpNavigation[] = [
    PpNavigation.create(1, 'Calendar', NavigationLinks.calendar, "calendar_today", false, 0, "Calendar"),
    PpNavigation.create(2, 'List', NavigationLinks.promotionsList, "list", false, 0, "List"),
    PpNavigation.create(3, 'Cards', NavigationLinks.promotionCards, "image", false, 0, "Cards")
]