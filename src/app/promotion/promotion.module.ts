import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromoPlanningFiltersModule } from '@app/pp-filters';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { PromoPlanningSpinnerModule } from '@shared/components/spinner';
import { PromotionLockModule } from '@app/promotion-lock';
import { AuthenticationModule } from '@pp-core/auth';
import { ErrorMessageModule } from '@shared/components/error-message';
import { PromotionCommonModule } from '@app/promotion-common';
import { PromotionRoiComponent } from './promotion-roi/promotion-roi.component';
import { PromotionCopyComponent } from './promotion-copy/promotion-copy.component';
import { PpPageModule } from '@shared/components/page';
import { PromotionCardsComponent } from './promotion-cards/promotion-cards.component';
import { PromotionTypeModule } from '@app/promotion-type';
import { PromotionStatusModule } from '@app/promotion-status';
import { DrawerCardModule } from '@shared/components/drawer-card';
import { PromotionDetailsFormComponent } from './promotion-details/promotion-details-form/promotion-details-form.component';
import { PromotionDetailsWrapperComponent } from './promotion-details/promotion-details-wrapper/promotion-details-wrapper.component';
import { PromotionDetailsLeftPannelComponent } from './promotion-details/promotion-details-left-pannel/promotion-details-left-pannel.component';
import { PromotionDetailsRightPannelComponent } from './promotion-details/promotion-details-right-pannel/promotion-details-right-pannel.component';
import { UpliftChipModule } from '@shared/components/uplift-chip';
import { CampaignModule } from '@app/campaign/campaign.module';
import { PromotionDetailsReadComponent } from './promotion-details/promotion-details-read/promotion-details-read.component';
import { PromotionDetailsActionsComponent } from './promotion-details/promotion-details-actions/promotion-details-actions.component';
import { PromotionDetailsTabsGroupComponent } from './promotion-details/promotion-details-tabs-group/promotion-details-tabs-group.component';
import { DurationChipModule } from '@shared/components/duration-chip';
import { AttributesModule } from '@app/attributes';
import { ReactiveFormsModule } from '@angular/forms';
import { PpDatePickerModule } from '@shared/components/date-picker';

@NgModule({
  declarations: [
    PromotionListComponent,
    PromotionDetailsFormComponent,
    PromotionRoiComponent,
    PromotionCopyComponent,
    PromotionCardsComponent,
    PromotionDetailsWrapperComponent,
    PromotionDetailsLeftPannelComponent,
    PromotionDetailsRightPannelComponent,
    PromotionDetailsReadComponent,
    PromotionDetailsActionsComponent,
    PromotionDetailsTabsGroupComponent
  ],
  imports: [
    CommonModule,
    PromotionCommonModule,
    PromotionRoutingModule,
    PromoPlanningFiltersModule,
    PpAngularMaterialModule,
    PromoPlanningSpinnerModule,
    PromotionLockModule,
    AuthenticationModule,
    ErrorMessageModule,
    PpPageModule,
    PromotionTypeModule,
    PromotionStatusModule,
    DrawerCardModule,
    UpliftChipModule,
    CampaignModule,
    DurationChipModule,
    AttributesModule,
    ReactiveFormsModule,
    PpDatePickerModule
  ]
})
export class PromotionModule { }
