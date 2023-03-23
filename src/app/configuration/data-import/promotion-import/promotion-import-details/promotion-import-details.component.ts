import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImportTypeConfig } from '../import-type';
import { TableNames } from '@app/configuration/data-import/import-table';

@Component({
  selector: 'pp-promotion-import-details',
  templateUrl: './promotion-import-details.component.html',
  styleUrls: ['./promotion-import-details.component.scss']
})
export class PromotionImportDetailsComponent implements OnInit {

  longDescription: string = "";
  format: string = "";
  errorMessage: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ImportTypeConfig, 
  public dialogRef: MatDialogRef<PromotionImportDetailsComponent>) { }

  ngOnInit(): void {
    if(this.data) {
      this.buildDescriptionAndFormat();
    } else {
      this.errorMessage = 'Error in loading details';
    }
    
  }

  buildDescriptionAndFormat(): void {
    switch(this.data.importTable) {
      case TableNames.AttributesCampaign:
        this.buildAttributesCampaignDescriptionAndFormat();
        break;
      case TableNames.AttributesParticipant:
        this.buildAttributesParticipantDescriptionAndFormat();
        break;
      // case TableNames.PromoParticipantsWeekly:
      //   this.buildAttributesParticipantWeeklyDescriptionAndFormat();
      //   break;
      case TableNames.AttributesPromo:
        this.buildAttributesPromoDescriptionAndFormat();
        break;
      case TableNames.Campaigns:
        this.buildCampaignsDescriptionAndFormat();
        break;
      case TableNames.PromoParticipants:
        this.buildPromoParticipantsDescriptionAndFormat();
        break;
      case TableNames.Promotions:
        this.buildPromotionsDescriptionAndFormat();
        break;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  buildPromotionsDescriptionAndFormat(): void {
    this.longDescription = "Import of the promotions.";
    this.format = "[promo_id], [promo_name], [description], [promo_type], [start_date_out], [end_date_out] ,[start_date_in], [end_date_in], [status], [campaign_name], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]"
  }

  private buildAttributesParticipantWeeklyDescriptionAndFormat(): void {
    this.longDescription = "Import of the weekly split of the forecast and the demand. It has dependencies with tables: Promotions; participants.";
    this.format = "[promo_name], [promo_id], [product_id], [market_id], [period], [co], [units_base], [units], [base_demand], [total_demand], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]"
  }

  buildPromoParticipantsDescriptionAndFormat(): void {
    this.longDescription = "Import of the promotion participants together with its associated	forecast and/or demand (optional). It has dependencies with table Promotions.";
    this.format = "[promo_name], [promo_id], [product_id], [market_id], [event_cluster], [co], [units_base], [units], [base_demand], [total_demand], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]"
  }

  buildCampaignsDescriptionAndFormat(): void {
    this.longDescription = "Import of campaign records.";
    this.format = "[campaign_name], [description], [start_date], [end_date], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]"
  }

  buildAttributesPromoDescriptionAndFormat(): void {
    this.longDescription = "Import of the promotional attributes. It has dependencies with the Promotions table.";
    this.format = "[promo_name], [promo_id], [attribute_name], [value], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]";
  }

  buildAttributesParticipantDescriptionAndFormat(): void {
    this.longDescription = "Import of the participant attributes. It has dependencies with the following tables: Promotions; Participants.";
    this.format = "[promo_name], [promo_id], [product_id], [market_id], [attribute_name], [value], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]";
  }

  buildAttributesCampaignDescriptionAndFormat(): void {
    this.longDescription = "Import of the attributes for the campaigns. It has dependencies with the Campaigns table.";
    this.format = "[campaign_name], [attribute_name], [value], [ins_login], [upd_login], [created_ts], [updated_ts], [impdate]";
  }

}
