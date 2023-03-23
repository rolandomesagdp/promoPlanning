import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PpNavigation } from '@app/navigation';

@Component({
  selector: 'pp-page-header-navigation',
  templateUrl: './page-header-navigation.component.html',
  styleUrls: ['./page-header-navigation.component.scss']
})
export class PageHeaderNavigationComponent {
  @Input() activeNavigationItem: PpNavigation;
  @Input() navigationItems: PpNavigation[];
  @Output() navigationItemClicked: EventEmitter<PpNavigation> = new EventEmitter<PpNavigation>();

  constructor() { }

  isActiveNavItem(navigation: PpNavigation): boolean {
    return this.activeNavigationItem && this.activeNavigationItem.routerLink === navigation.routerLink;
  }
  
  getNavigationClasses(navigation: PpNavigation, navigationIndex: number): string {
    let classesToReturn = "pp-navigation-item";
    classesToReturn += this.isActiveNavItem(navigation) ? " pp-navigation-item-active" : " pp-navigation-item-inactive";
    classesToReturn += navigationIndex < this.navigationItems.length -1 ? " navigation-item-border" : "";
    return classesToReturn;
  }

  getIconClass(navigation: PpNavigation): string {
    let baseClass = "pp-navigation-item-content-icon";
    baseClass += !this.isActiveNavItem(navigation) ? " pp-navigation-item-inactive-icon" : "";
    return baseClass;
  }

  getTooltip(navigation: PpNavigation): string {
    return this.isActiveNavItem(navigation) ? navigation.tooltip : `Navigate to ${navigation.tooltip}`;
  }

  onNavigationItemClicked(navigationItem: PpNavigation): void {
    if(!this.isActiveNavItem(navigationItem)) {
      this.navigationItemClicked.emit(navigationItem);
    }
  }
}
