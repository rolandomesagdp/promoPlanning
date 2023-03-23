import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationLinks, pocNavigationItems, PpNavigation } from '@app/navigation';

@Component({
  selector: 'pp-inputs-design',
  templateUrl: './inputs-design.component.html',
  styleUrls: ['./inputs-design.component.scss']
})
export class InputsDesignComponent {
  @Input() activeNavItem: PpNavigation = PpNavigation.create(51, 'Inputs design', NavigationLinks.pocInputsDesign, "brush", false, 50, "Inputs design")
  navItems: PpNavigation[] = pocNavigationItems;

  constructor(private router: Router) { }

  onNavigationItemClick(navigationItem: PpNavigation): void {
    navigationItem.navigate(this.router);
  }
}
