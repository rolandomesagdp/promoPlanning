import { Component, OnInit, Input } from '@angular/core';
import { ICampaign } from '@app/campaign/campaign.model';

@Component({
  selector: 'pp-campaign-details-read',
  templateUrl: './campaign-details-read.component.html',
  styleUrls: ['./campaign-details-read.component.scss']
})
export class CampaignDetailsReadComponent implements OnInit {

  @Input() campaign: ICampaign;

  constructor() { }

  ngOnInit(): void {
  }

}
