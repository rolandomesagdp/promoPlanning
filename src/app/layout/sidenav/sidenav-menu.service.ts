import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { PpNavigation } from '../../navigation/navigation.model';
import { leftNavMenuItems } from '../../navigation/navigation-lists/left-navigation-items';
import { EnvironmentService } from '@pp-core/environment';

@Injectable()
export class SidenavMenuService {
  private _sidenavMenuExpanded: boolean = false;

  get sidenavMenuExpanded(): boolean {
    return this._sidenavMenuExpanded;
  }

  private _expandedItems: PpNavigation[] = [];
  get expandedItems(): PpNavigation[] {
    return this._expandedItems;
  }

  private _activeItem: PpNavigation;
  set activeItem(item: PpNavigation) {
    this._activeItem = item;
  }
  get activeItem(): PpNavigation {
    return this._activeItem;
  }

  constructor(private location: Location, private environmentService: EnvironmentService) { } 

  setCurrentActiveMenuItemOrDefault(routerLink: string): void {
    if(routerLink) {
      const activeItemByRouterLink = this.getLeftNavMenuItems().find(x => x.routerLink !== null && routerLink.includes(x.routerLink));
      this.activeItem = activeItemByRouterLink ? activeItemByRouterLink : 
      this.getLeftNavMenuItems().find(x => x.routerLink === "/home");
    }
    else {
      this.activeItem = this.getLeftNavMenuItems().find(x => x.routerLink === "/home");
    }
  }

  itemIsActive(menuItem: PpNavigation): boolean {
    return this.activeItem && this.activeItem.id === menuItem.id ? true : false;
  }

  toggleExpandSideNavMenu(): void {
    this._sidenavMenuExpanded = !this.sidenavMenuExpanded;
  }

  collpaseAllExpandedMenuItems(): void {
    const parentItems: PpNavigation[] = this.getLeftNavMenuItems().filter(x => x.hasSubMenu === true);
    parentItems.forEach(item => {
      let subMenu = document.getElementById('sub-menu-'+ item.id);
      if(subMenu && !subMenu.classList.contains('menu-item-childs-container-hidden')) {
        subMenu.classList.add('menu-item-childs-container-hidden');
      }
    })
  }

  toggleSubMenu(menuItem: PpNavigation): void {
    let subMenu = document.getElementById('sub-menu-'+ menuItem.id);
    if(subMenu){
      if(subMenu.classList.contains('menu-item-childs-container-hidden')){
        subMenu.classList.remove('menu-item-childs-container-hidden');
      }
      else{
        subMenu.classList.add('menu-item-childs-container-hidden');
      }      
    }
  }
    
  getLeftNavMenuItems(): Array<PpNavigation> {
    let menuItemsToReturn = [...leftNavMenuItems];
    if(this.environmentService.getEnvironment().production) {
      menuItemsToReturn = menuItemsToReturn.filter(x => x.id < 50);
    }
    return menuItemsToReturn;
  }

  expandActiveSubMenu(menu: Array<PpNavigation>): void {
      let url = this.location.path();
      let routerLink = url;
      let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
      if(activeMenuItem[0]){
        let menuItem = activeMenuItem[0];
        while (menuItem.parentId != 0){  
          let parentMenuItem = menu.filter(item => item.id == menuItem.parentId)[0];
          menuItem = parentMenuItem;
          this.toggleSubMenu(menuItem);
        }
      }
  }

  closeOtherSubMenus(menu: Array<PpNavigation>, menuId: number){
    let currentMenuItem = menu.filter(item => item.id === menuId)[0]; 
    if(currentMenuItem.parentId == 0){
      menu.forEach(item => {
        if(item.id != menuId){
          let subMenu = document.getElementById('sub-menu-'+item.id);
          let menuItem = document.getElementById('menu-item-'+item.id);
          if(subMenu){
            if(subMenu.classList.contains('show')){
              subMenu.classList.remove('show');
              menuItem.classList.remove('expanded');
            }              
          } 
        }
      });
    }
  }
  
  closeAllSubMenus(){
      let menu = document.getElementById("vertical-menu");
      if(menu){
          for (let i = 0; i < menu.children[0].children.length; i++) {
              let child = menu.children[0].children[i];
              if(child){
                  if(child.children[0].classList.contains('expanded')){
                      child.children[0].classList.remove('expanded');
                      child.children[1].classList.remove('show');
                  }
              }
          }
      }
  }

  updateExpandedItemsList(menuItem: PpNavigation): void {
    const itemInList = this._expandedItems.find(x => x.id ===  menuItem.id);
    if(itemInList) {
      this._expandedItems = [...this._expandedItems.filter(x => x.id !== menuItem.id)]
    }
    else {
      this._expandedItems = [...this._expandedItems, menuItem];
    }
  }
}