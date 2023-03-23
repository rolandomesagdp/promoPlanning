import { NavigationLinks } from '../navigation-links';
import { PpNavigation } from '../navigation.model';

export const leftNavMenuItems = [ 
    PpNavigation.create(1, 'Home', NavigationLinks.home, 'home', false, 0, "Home"),
    PpNavigation.create(2, 'Promotions', null, "emoji_symbols", true, 0, "Promotions"),
    PpNavigation.create(3, 'Calendar', NavigationLinks.calendar, "calendar_today", false, 2, "Calendar"),
    PpNavigation.create(4, 'List', NavigationLinks.promotionsList, "list", false, 2, "List"),
    PpNavigation.create(5, 'Cards', NavigationLinks.promotionCards, "image", false, 2, "Cards"),
    PpNavigation.create(15, 'Campaigns', NavigationLinks.campaigns, "assignment", false, 0, "Campaigns"),
    PpNavigation.create(6, 'Analytics', NavigationLinks.analytics, "leaderboard", false, 0, "Analytics"),
    PpNavigation.create(7, 'Settings', null, "settings", true, 0, "Settings"),
    PpNavigation.create(8, 'Data import', null, "import_export", true, 7, "Data import settings"),
    PpNavigation.create(9, 'Master Data', NavigationLinks.masterDataImportConfig, "folder_open", false, 8, "Master data import settings"),
    PpNavigation.create(10, 'Promotions', NavigationLinks.promotionImportConfig, "local_offer", false, 8, "Promotion import settings"),
    PpNavigation.create(11, 'Forecast & Demand', NavigationLinks.forecastDemandImportConfig, "trending_up", false, 8, "Forecast and demand import settings"),
    PpNavigation.create(12, 'Promotion', NavigationLinks.promotionConfig, "handyman", false, 7, "Promotion settings"),
    PpNavigation.create(13, 'User & Permissions', NavigationLinks.userPermissionsConfig, "manage_accounts", false, 7, "User and permissions settings"),
    PpNavigation.create(14, 'Log Files', NavigationLinks.logFilesList, "note_alt", false, 7, "Log files"),
    PpNavigation.create(50, 'PoC', null, "build", true, 0, "Proof of Concepts"),
    PpNavigation.create(51, 'Inputs design', NavigationLinks.pocInputsDesign, "brush", false, 50, "Inputs design")
]