import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidenavMenuService } from '@app/layout/sidenav';
import { NavigationLinks } from '@app/navigation';
import { FiltersManager } from '@app/pp-filters/filters';
import { PromotionFormBase } from '@app/promotion-common/promotion-form';

@Component({
  selector: 'pp-edit-forecast',
  templateUrl: './edit-forecast.component.html',
  styleUrls: ['./edit-forecast.component.scss']
})
export class EditForecastComponent extends PromotionFormBase implements OnInit {
  
  constructor(router: Router, route: ActivatedRoute, filtersManager: FiltersManager, sidenavMenuService: SidenavMenuService) { 
    super(router, route, filtersManager, sidenavMenuService);
  }

  ngOnInit(): void {
    this.initialize(NavigationLinks.forecastEdit);
  }
}
