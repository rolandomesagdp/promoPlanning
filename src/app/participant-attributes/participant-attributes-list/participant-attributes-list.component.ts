import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidenavMenuService } from '@app/layout/sidenav';
import { NavigationLinks } from '@app/navigation';
import { FiltersManager } from '@app/pp-filters/filters';
import { PromotionFormBase } from '@app/promotion-common/promotion-form';

@Component({
  selector: 'pp-participant-attributes-list',
  templateUrl: './participant-attributes-list.component.html',
  styleUrls: ['./participant-attributes-list.component.scss']
})
export class ParticipantAttributesListComponent extends PromotionFormBase implements OnInit {
  
  constructor(router: Router, route: ActivatedRoute, filtersManager: FiltersManager, sidenavMenuService: SidenavMenuService) { 
    super(router, route, filtersManager, sidenavMenuService);
  }

  ngOnInit(): void {
    this.initialize(NavigationLinks.participantAttributes);
  }
}
