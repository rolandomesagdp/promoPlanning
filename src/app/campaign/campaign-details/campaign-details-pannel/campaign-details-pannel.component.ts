import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign } from '@app/campaign/campaign.model';
import { concatMap, tap } from 'rxjs/operators';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';

@Component({
  selector: 'pp-campaign-details-pannel',
  templateUrl: './campaign-details-pannel.component.html',
  styleUrls: ['./campaign-details-pannel.component.scss']
})
export class CampaignDetailsPannelComponent implements OnInit {

  @Input() campaign: ICampaign;

  editModeEnabled: boolean;


  constructor(private toggleDrawerService: ToggleDrawerService) { }

  ngOnInit(): void {
  }

  test(){
    console.log("campaign---", this.campaign);
  }

  closeDrawer() {
    this.toggleDrawerService.toggleDrawer();
  }

}
