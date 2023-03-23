import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsListComponent } from './campaigns-list/campaigns-list.component';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { CampaignRoutingModule } from './campaign-routing.module';
import { ErrorMessageModule } from '@shared/components/error-message';
import { PromoPlanningSpinnerModule } from '@shared/components/spinner';
import { PpPageModule } from '@shared/components/page';
import { CampaignService } from '@app/campaign/campaign.service';
import { CampaignPipe } from './campaign.pipe';
import { CampaignNavigationComponent } from './campaign-navigation/campaign-navigation.component';
import { UnitsOfMeasurementModule } from '@pp-core/units-of-measurement/units-of-measurement.module';
import { DynamicGridConfigurationModule } from '@app/dynamic-grid-configuration';
import { UpliftChipModule } from '@shared/components/uplift-chip';
import { ConfirmationDialogModule } from '@shared/components/confirmation-dialog';
import { CampaignDetailsWrapperComponent } from './campaign-details/campaign-details-wrapper/campaign-details-wrapper.component';
import { DrawerCardModule } from '@shared/components/drawer-card';
import { CampaignDetailsPannelComponent } from './campaign-details/campaign-details-pannel/campaign-details-pannel.component';
import { CampaignDetailsReadComponent } from './campaign-details/campaign-details-read/campaign-details-read.component';

@NgModule({
  declarations: [
    CampaignsListComponent,
    CampaignPipe,
    CampaignNavigationComponent,
    CampaignDetailsWrapperComponent,
    CampaignDetailsPannelComponent,
    CampaignDetailsReadComponent
  ],
  imports: [
    CommonModule,
    PpAngularMaterialModule,
    CampaignRoutingModule,
    ErrorMessageModule,
    PromoPlanningSpinnerModule,
    PpPageModule,
    UnitsOfMeasurementModule,
    DynamicGridConfigurationModule,
    UpliftChipModule,
    ConfirmationDialogModule,
    DrawerCardModule
  ],
  exports: [ CampaignPipe ],
  providers: [ CampaignService ]
})
export class CampaignModule { }
