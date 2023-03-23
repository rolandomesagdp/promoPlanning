import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationLinks, PpNavigation } from '@app/navigation';
import { UserAccountService } from '@pp-core/auth/user';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { promotionFormNavigation } from '../../navigation/navigation-lists/promotion-form-navigation-items';
import { PromotionPermissionsManager } from '../promotion-permissions/promotion-permissions-manager';
import { IPromotion } from '../promotion/promotion.model';

@Component({
	selector: 'pp-promotion-form-header',
	templateUrl: './promotion-form-header.component.html',
	styleUrls: ['./promotion-form-header.component.scss']
})
export class PromotionFormHeaderComponent implements OnInit {
	@Input() promotion: IPromotion;
	@Input() title: string;
	@Input() activeNavItem: PpNavigation;

	// Navigation items
	@Input() showPromoDetailsNav: boolean;
	@Input() showPromoEditNav: boolean;
	@Input() showPromoCopyNav: boolean;
	@Input() showEditForecastNav: boolean;
	@Input() showParticipantAttributesNav: boolean;
	@Input() showAddParticipantsNav: boolean;
	@Input() showROINav: boolean;

	// Actions
	@Input() saveButtonDisabled: boolean;
	@Input() showSaveButton: boolean;
	@Input() showMoreActionsMenu: boolean;
	
	// Action notifications
	@Output() closeButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() saveButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() navigate: EventEmitter<PpNavigation> = new EventEmitter<PpNavigation>();
	
	navItems: PpNavigation[];

	constructor(public permissionsManager: PromotionPermissionsManager, public settingsManager: SettingsManager) { }

	ngOnInit(): void {
		this.setNavItems();
	}

	onNavigationItemClick(navigationItem: PpNavigation): void {
		this.navigate.emit(navigationItem);
	}

	closeForm(): void {
		this.closeButtonClicked.emit(true);
	}

	onSaveButtonClicked(): void {
		this.saveButtonClicked.emit(true);
	}

	private setNavItems(): void {
		let itemsToReturn = [...promotionFormNavigation];
		if(!this.showPromoDetailsNav) {
			itemsToReturn = itemsToReturn.filter(x => x.routerLink !== NavigationLinks.promotionDetails);
		}
		if(!this.showPromoEditNav) {
			itemsToReturn = itemsToReturn.filter(x => x.routerLink !== NavigationLinks.promotionEdit);
		}
		if(!this.showPromoCopyNav) {
			itemsToReturn = itemsToReturn.filter(x => x.routerLink !== NavigationLinks.promotionCopy);
		}
		if(!this.showEditForecastNav) {
			itemsToReturn = itemsToReturn.filter(x => x.routerLink !== NavigationLinks.forecastEdit);
		}
		if(!this.showParticipantAttributesNav) {
			itemsToReturn = itemsToReturn.filter(x => x.routerLink !== NavigationLinks.participantAttributes);
		}
		if(!this.showAddParticipantsNav) {
			itemsToReturn = itemsToReturn.filter(x => x.routerLink !== NavigationLinks.promotionParticipants);
		}
		
		itemsToReturn = [...this.removeRoiIfRequired(itemsToReturn)];

		this.navItems = [...itemsToReturn];
	}

	private removeRoiIfRequired(currentItems: PpNavigation[]): PpNavigation[] {
		if(!this.showROINav || !this.settingsManager.roiEnabled || !this.permissionsManager.userCanReadRoi()) {
			return currentItems.filter(x => x.routerLink !== NavigationLinks.promotionRoi);
		}
		else return currentItems;
	}
}
