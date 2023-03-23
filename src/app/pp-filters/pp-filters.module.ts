import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PpAngularMaterialModule } from "@shared/pp-angular-material";
import { CollapsibleWrapperComponent } from "./filter-wrapper/collapsible-wrapper.component";
import { MultiSelectFilterComponent } from "./multi-select-filter-list";
import { NumberRangeFilterComponent } from "./number-range-filter";
import { DateRageFilterComponent } from './date-rage-filter/date-rage-filter.component';
import { PpDatePickerModule } from "@shared/components/date-picker";
import { PpDevextremeModule } from "@shared/pp-devextreme";
import { DropDownTreeSelectComponent } from './drop-down-tree-select/drop-down-tree-select.component';
import { TreeNodesService } from "./drop-down-tree-select/tree-filters";
import { PromotionFitersComponent } from "./promotion-fiters";
import { AnalyticsFiltersComponent } from "./analytics-filters";
import { FiltersService } from "./filters";
import { SearchValueFilterComponent } from './search-value-filter/search-value-filter.component';

const filterComponents: any[] = [ 
  MultiSelectFilterComponent,
  NumberRangeFilterComponent,
  CollapsibleWrapperComponent,
  DateRageFilterComponent,
  DropDownTreeSelectComponent,
  PromotionFitersComponent,
  AnalyticsFiltersComponent
];

@NgModule({
    imports: [ 
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      PpAngularMaterialModule,
      PpDevextremeModule,
      PpDatePickerModule
     ],
    declarations: [ ...filterComponents, SearchValueFilterComponent ],
    exports: [ ...filterComponents ],
    providers: [ TreeNodesService, FiltersService ]
  })
  export class PromoPlanningFiltersModule { }