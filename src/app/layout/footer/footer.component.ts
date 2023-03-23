import { Component, NgModule } from '@angular/core';
import { AppInfoService } from '@pp-core/app-info';

@Component({
  selector: 'pp-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  constructor(public appInfo: AppInfoService) { }
}

@NgModule({
  declarations: [ FooterComponent ],
  exports: [ FooterComponent ]
})
export class FooterModule { }
