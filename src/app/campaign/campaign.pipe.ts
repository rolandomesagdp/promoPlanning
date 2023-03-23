import { Pipe, PipeTransform } from '@angular/core';
import { CampaignService } from '@app/campaign/campaign.service';

@Pipe({
  name: 'campaign'
})
export class CampaignPipe implements PipeTransform {

  constructor(private campaignService: CampaignService) { }

  transform(id: string): string {
    let campaigns = this.campaignService.campaigns;
    let currentCampaign = campaigns.find(cam => cam.campaignId == id);
    return currentCampaign ? currentCampaign.name : '';
  }
}
