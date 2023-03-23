import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { PageBodyComponent } from './page-body';
import { PageHeaderComponent } from './page-header';
import { PageHeaderNavigationComponent } from './page-header-navigation';
import { PageContainerComponent } from './page-container/page-container.component';

@NgModule({
  declarations: [
    PageBodyComponent,
    PageHeaderComponent,
    PageHeaderNavigationComponent,
    PageContainerComponent
  ],
  imports: [
    CommonModule,
    PpAngularMaterialModule
  ],
  exports: [
    PageBodyComponent,
    PageHeaderComponent,
    PageHeaderNavigationComponent,
    PageContainerComponent
  ]
})
export class PpPageModule { }
