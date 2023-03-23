import { Component, Input } from '@angular/core';

import { PageHeaderColors } from './page-header-colors.enum';

@Component({
  selector: 'pp-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string = "";
  @Input() hint: string = "";
  @Input() color: PageHeaderColors = PageHeaderColors.primary;

  constructor() { }

  getClasses(): string {
    let classesToReturn = `${this.color}`;
    return classesToReturn;
  }
}
