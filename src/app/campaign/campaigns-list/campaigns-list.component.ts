import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationLinks, PpNavigation } from '@app/navigation';
import { leftNavMenuItems } from '@app/navigation/navigation-lists/left-navigation-items';
import { CampaignService } from '@app/campaign/campaign.service';
import { ICampaign } from '@app/campaign/campaign.model';
import { DynamicGridConfigurationService } from '@app/dynamic-grid-configuration';
import { LogService } from '@pp-core/logging';
import { SnackbarService } from '@pp-core/snackbar';
import { NumberFormat } from '@shared/format';
import { EnvironmentService } from '@pp-core/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersManager } from '@app/pp-filters/filters';
import { Observable, NEVER } from 'rxjs';
import { ConfirmDialogData, ConfirmationResponse } from '@shared/components/confirmation-dialog/data';
import { ConfirmationDialogService } from '@shared/components/confirmation-dialog';
import { concatMap, map } from 'rxjs/operators';
import { CampaignListManager } from '@app/campaign/campaigns-list/campaign-list.manager';
import { CampaignTableColumnManager } from '@app/campaign/campaigns-list/campaign-table-column.manager';
import { PageEvent } from '@angular/material/paginator';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';

@Component({
  selector: 'pp-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss',  '../../../../src/themes/elements-styles/pp-mat-table.scss']
})
export class CampaignsListComponent implements OnInit, OnDestroy {
  campaignListManager: CampaignListManager<ICampaign>;
  campaignTableColumnManager: CampaignTableColumnManager;
  selectedCampaign: ICampaign;

  constructor(public campaignService: CampaignService,
              private dynamicGridConfigService: DynamicGridConfigurationService,
              private logger: LogService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: SnackbarService,
              private filtersManager: FiltersManager,
              private confirmationDialogService: ConfirmationDialogService,
              private drawerToggler: ToggleDrawerService,
              private environmentService: EnvironmentService) {
    this.campaignListManager = new CampaignListManager<ICampaign>(campaignService, logger, route, router, filtersManager, snackBar, NavigationLinks.campaigns);
    this.campaignTableColumnManager = new CampaignTableColumnManager(dynamicGridConfigService, logger, snackBar);
  }

  ngOnInit(): void {
    this.campaignTableColumnManager.getTableColumns();
    this.campaignListManager.loadingCampaigns = true;
    this.campaignListManager.subscribeToQueryParamChanges();
  }

  createNewCampaign(): void {
    console.log("Create new Campaign");
  }

  getFormattedNumber(numberToFormat: number): string {
    return new NumberFormat(this.environmentService, numberToFormat).formattedNumber;
  }

  onPageChange(pageChangeEvent: PageEvent): void {
    this.campaignListManager.pageChanged = true;
    this.campaignListManager.filtersManager.filters.pageSize = pageChangeEvent.pageSize;
    this.campaignListManager.filtersManager.filters.pageIndex = pageChangeEvent.pageIndex;
    this.campaignListManager.applyFilters();
  }

  deleteCampaign(campaign: ICampaign) {
    const dialogData: ConfirmDialogData = ConfirmDialogData
        .build(`Delete Campaign '${campaign.name}'`,
            `Please, confirm that you want to permanently delete the campaign '${campaign.name}'.`,
            true, "Confirm", true, "Cancel", "75")

    this.confirmationDialogService.confirm(dialogData).subscribe((confirmationResponse: ConfirmationResponse) => {
      if (confirmationResponse === ConfirmationResponse.Accept) {
        this.campaignService.delete(campaign.campaignId).subscribe(success =>{
          if(this.campaignListManager.campaigns.length === 1) {
            const currentPageIndex = this.campaignListManager.filtersManager.filters.pageIndex;
            this.campaignListManager.filtersManager.filters.pageIndex = currentPageIndex - 1;
            this.campaignListManager.applyFilters();
          }
          else {
            this.campaignListManager.deleteCampaignFromList(campaign);
          }
          this.snackBar.openSuccess(`Campaign '${campaign.name}' was correctly deleted.`);
        })
      } 
    })
}

  viewCampaign(campaign: ICampaign): void {
    this.selectedCampaign = campaign;
    this.drawerToggler.toggleDrawer();
  }

  ngOnDestroy() {
    this.campaignListManager.destroy();
  }

}
