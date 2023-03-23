import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PpNavigation, PromotionNavigation } from '@app/navigation';
import { campaignNavigationItems } from '@app/navigation/navigation-lists/campaign-navigation-items';
import { Router } from '@angular/router';
import { FiltersManager } from '@app/pp-filters/filters';

@Component({
  selector: 'pp-campaign-navigation',
  templateUrl: './campaign-navigation.component.html',
  styleUrls: ['./campaign-navigation.component.scss']
})
export class CampaignNavigationComponent {

  @Input() activeNavigation: PpNavigation;
  @Input() actionButtonTitle: string;
  @Input() subtitle: string;
  @Input() itensTracking: string;
  @Output() actionButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  campaignNavigationItems: PpNavigation[] = campaignNavigationItems;
  nextNavigation: PpNavigation;

  constructor(public router: Router, private filtersManager: FiltersManager, ) { }

  onActionButtonClicked(): void {
    this.actionButtonClicked.emit();
  }

  onNavigationItemClicked(navigation: PpNavigation): void {
    //this.nextNavigation = navigation.isPromotionNavigation() ? 
    //this.buildPromotionNavigation(navigation) : navigation;
    this.navigateToNext();
  }

  navigateToNext(): void {
    this.nextNavigation.navigate(this.router);
  }

  private buildPromotionNavigation(navigationItem: PpNavigation): PpNavigation {
    this.filtersManager.setDefaultPageFilters();
    const promotionNavigation: PromotionNavigation = PromotionNavigation
    .createPromoNavigation(navigationItem, this.filtersManager);
    return promotionNavigation;
  }

}
