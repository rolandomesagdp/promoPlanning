import { NavigationLinks, PpNavigation } from "@app/navigation";

export const promotionFormNavigation = [ 
    PpNavigation.create(1, 'Promotion Details', NavigationLinks.promotionDetails, 'home', false, 0, "Promotion Details"),
    PpNavigation.create(2, 'Edit Promotion', NavigationLinks.promotionEdit, 'home', false, 0, "Promotion Details"),
    PpNavigation.create(3, 'Copy Promotion', NavigationLinks.promotionCopy, 'home', false, 0, "Promotion Details"),
    PpNavigation.create(4, 'Edit Forecast', NavigationLinks.forecastEdit, 'query_stats', false, 0, "Participants Forecast"),
    PpNavigation.create(5, 'Forecast Details', NavigationLinks.forecastDetails, 'query_stats', false, 0, "Participants Forecast"),
    PpNavigation.create(6, 'Edit Participant Attributes', NavigationLinks.participantAttributes, 'view_list', false, 0, "Participants Attributes"),
    PpNavigation.create(7, 'Add Participants', NavigationLinks.promotionParticipants, 'add_circle', false, 0, "Participants"),
    PpNavigation.create(8, 'Return on Investment', NavigationLinks.promotionRoi, 'monetization_on', false, 0, "Return on Investment")
];