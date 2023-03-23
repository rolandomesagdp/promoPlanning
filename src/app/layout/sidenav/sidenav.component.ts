import { CommonModule, Location } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnvironmentModule } from '@pp-core/environment';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { SidenavTreeMenuModule } from '../sidenav-tree-menu';
import { SidenavMenuService } from './sidenav-menu.service';

@Component({
  selector: 'pp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private location: Location, private menuService: SidenavMenuService) { }

  ngOnInit(): void {
    const currentLocation = this.location.path();
    this.menuService.setCurrentActiveMenuItemOrDefault(currentLocation);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PpAngularMaterialModule,
    SidenavTreeMenuModule,
    EnvironmentModule
   ],
  exports: [ SidenavComponent ],
  declarations: [ SidenavComponent ],
  providers: [ SidenavMenuService ]
})
export class SideNavModule { }
