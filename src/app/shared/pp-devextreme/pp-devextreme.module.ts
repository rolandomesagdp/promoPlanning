import { NgModule } from '@angular/core';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxGanttModule } from 'devextreme-angular';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';
import { DxRangeSliderModule } from 'devextreme-angular/ui/range-slider';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';

const devextremeModules: any[] = [DxFormModule, DxChartModule, DxPieChartModule, DxFunnelModule, DxSelectBoxModule,
  DxGanttModule, DxToolbarModule, DxDrawerModule, DxScrollViewModule, DxTreeViewModule, DxLoadIndicatorModule,
  DxTreeListModule, DxRangeSliderModule, DxDataGridModule, DxPopupModule, DxPopoverModule, DxButtonModule,
  DxDropDownBoxModule, DxListModule, DxContextMenuModule, DxDateBoxModule];

@NgModule({
  declarations: [],
  imports: [...devextremeModules],
  exports: [...devextremeModules]
})
export class PpDevextremeModule { }