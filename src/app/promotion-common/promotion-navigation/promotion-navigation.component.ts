import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionNavigation } from '@app/navigation/promotion-navigation/promotion-navigation';
import { FiltersManager } from '@app/pp-filters/filters';
import { promotionNavigationItems, PpNavigation } from '@app/navigation';

@Component({
  selector: 'pp-promotion-navigation',
  templateUrl: './promotion-navigation.component.html',
  styleUrls: ['./promotion-navigation.component.scss']
})
export class PromotionNavigationComponent {
  @Input() activeNavigation: PpNavigation;
  @Input() actionButtonTitle: string;
  @Input() subtitle: string;
  @Input() itensTracking: string;
  @Output() actionButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  promotionNavigationItems: PpNavigation[] = promotionNavigationItems;
  nextNavigation: PpNavigation;

  constructor(public router: Router, private filtersManager: FiltersManager, ) { }

  onActionButtonClicked(): void {
    this.actionButtonClicked.emit();
  }

  onNavigationItemClicked(navigation: PpNavigation): void {
    this.nextNavigation = navigation.isPromotionNavigation() ? 
    this.buildPromotionNavigation(navigation) : navigation;
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
