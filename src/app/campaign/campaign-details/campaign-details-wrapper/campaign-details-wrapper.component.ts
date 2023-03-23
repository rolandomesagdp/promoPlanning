import { Component, OnInit, Input } from '@angular/core';
import { ICampaign } from '@app/campaign/campaign.model';

@Component({
  selector: 'pp-campaign-details-wrapper',
  templateUrl: './campaign-details-wrapper.component.html',
  styleUrls: ['./campaign-details-wrapper.component.scss']
})
export class CampaignDetailsWrapperComponent implements OnInit {

  @Input() campaign: ICampaign;

  constructor() { }

  ngOnInit(): void {
  }

}
