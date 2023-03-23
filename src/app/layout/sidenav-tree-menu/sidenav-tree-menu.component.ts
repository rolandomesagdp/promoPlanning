import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { SidenavMenuService } from '../sidenav';
import { PpNavigation } from '../../navigation/navigation.model';
import { PromoPlanningFiltersModule } from '@app/pp-filters';
import { FiltersManager } from '@app/pp-filters/filters';
import { PromotionNavigation } from '@app/navigation/promotion-navigation/promotion-navigation';

@Component({
  selector: 'pp-sidenav-tree-menu',
  templateUrl: './sidenav-tree-menu.component.html',
  styleUrls: ['./sidenav-tree-menu.component.scss']
})
export class SidenavTreeMenuComponent implements OnInit {
  @Input() parentMenuId = 0;
  @Input() menuLevel: number = 1;
  parentMenu: Array<PpNavigation>;
  childContainerClass: string[] = []
  
  constructor(private router: Router, public sidenavMenuService: SidenavMenuService, private filtersManager: FiltersManager) { }

  ngOnInit(): void {
    const parentItems = [...this.sidenavMenuService.getLeftNavMenuItems().filter(item => item.parentId == this.parentMenuId)];
    this.parentMenu = parentItems;
    this.childContainerClass = [...["menu-item-childs-container", "menu-item-childs-container-hidden"]];
    this.subscribeToNavigationChangeEvent();
  }

  onMenuItemClick(menuItem: PpNavigation): void {
    if(!this.sidenavMenuService.sidenavMenuExpanded) {
      this.sidenavMenuService.toggleExpandSideNavMenu();
      return;
    }
    if(menuItem.hasSubMenu) {
      this.sidenavMenuService.updateExpandedItemsList(menuItem);
      this.sidenavMenuService.toggleSubMenu(menuItem);
      return;
    }
    if(menuItem.routerLink) {
      this.navigate(menuItem); 
    }
  }

  navigate(menuItem: PpNavigation): void {
    if(menuItem.isPromotionNavigation()) {
      this.filtersManager.setDefaultPageFilters();
      const promotionNavigation: PromotionNavigation = PromotionNavigation.createPromoNavigation(menuItem, this.filtersManager);
      promotionNavigation.navigate(this.router);
    }
    else {
      menuItem.navigate(this.router);
    }
  }

  getExpandIcon(menuItem: PpNavigation): string {
    const itemIsInList = this.sidenavMenuService.expandedItems.find(x => x.id ===  menuItem.id);

    return itemIsInList ? "expand_more" : "chevron_right";
  }

  getMenuItemIconClass(menuItem: PpNavigation): string[] {
    if(this.sidenavMenuService.itemIsActive(menuItem)) {
      return ["menu-item-icon-active", "no-heightlight"];
    }
    else {
      return ["menu-item-icon", "no-heightlight"];
    }
  }

  getMenuItemClass(menuItem: PpNavigation): string[] {
    if(this.sidenavMenuService.itemIsActive(menuItem)) {
      return ["menu-item", "menu-item-active"];
    }
    else {
      return ["menu-item"];
    }
  }

  private subscribeToNavigationChangeEvent(): void {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationStart) {
        const relatedNavigationItem: PpNavigation = this.parentMenu.find(x => x.routerLink !== null && event.url.includes(x.routerLink));
        if(relatedNavigationItem) {
          this.sidenavMenuService.activeItem = relatedNavigationItem;
        }
      }
    })
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PromoPlanningFiltersModule,
    PpAngularMaterialModule
  ],
  exports: [ SidenavTreeMenuComponent],
  declarations: [ SidenavTreeMenuComponent ]
})
export class SidenavTreeMenuModule { }
