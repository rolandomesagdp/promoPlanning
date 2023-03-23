import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { HeaderModule } from '@app/layout/header';
import { PromotionStatusModule, PromotionStatusService } from '@app/promotion-status';
import { PromotionTypeModule, PromotionTypeService } from '@app/promotion-type';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { SidenavMenuService, SideNavModule } from '../sidenav';
import { CampaignService } from '@app/campaign/campaign.service';
import { CampaignModule } from '@app/campaign/campaign.module';

@Component({
  selector: 'pp-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();

  constructor(private sidenavMenuService: SidenavMenuService, 
    private promotionTypeService: PromotionTypeService, 
    private promotionStatusService: PromotionStatusService,
    private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.loadCacheableData();
  }

  getSideNavClasses(): string[] {
    if (this.sidenavMenuService.sidenavMenuExpanded) {
      return ["sidenav", "sidenav-expanded"];
    }
    else {
      return ["sidenav", "sidenav-collapsed"];
    }
  }

  toggleMenuOpen(): void {
    this.sidenavMenuService.toggleExpandSideNavMenu();
  }

  getDrawerContentClasses(): any {
    if (this.sidenavMenuService.sidenavMenuExpanded) {
      return ["content", "layout-content", "layout-content-collapsed"];
    }
    else {
      return ["content", "layout-content", "layout-content-expanded"];
    }
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

  private loadCacheableData(): void {
    if (!this.promotionTypeService.promotionTypes) {
      this.subscriptionManager.add(this.promotionTypeService.loadPromotionTypes().subscribe());
    }
    if (!this.promotionStatusService.promotionStatus) {
      this.subscriptionManager.add(this.promotionStatusService.loadPromotionStatus().subscribe());
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    SideNavModule,
    PpAngularMaterialModule,
    PromotionTypeModule,
    PromotionStatusModule,
    CampaignModule
  ],
  exports: [MainLayoutComponent],
  declarations: [MainLayoutComponent]
})
export class MainLayoutModule { }
