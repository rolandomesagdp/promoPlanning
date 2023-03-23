import { Component, Input, NgModule, OnInit } from '@angular/core';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { BoxColors } from './box-colors.enum';
import { BoxModel } from './box.model';

@Component({
  selector: 'pp-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss', './accent-style.scss', './purple-style.scss', './pp-blue-style.scss']
})
export class BoxComponent implements OnInit {
  @Input() boxModel: BoxModel;
  boxContainerClasses: string = "box-container";
  boxIconContainerClasses: string = "box-icon-container";
  boxIconClasses: string = "box-icon";

  constructor() { }

  ngOnInit(): void {
    this.setBoxStyle();
  }

  private setBoxStyle(): void {
    switch(this.boxModel.boxColor) {
      case BoxColors.accentDarker: default:
        this.setAccentDarketStyle();
        break;
      case BoxColors.purple:
        this.setPurpleStyle();
        break;
      case BoxColors.ppBlue:
        this.setPpBlueStyle();
        break;
    }
  }

  private setAccentDarketStyle(): void {
    this.boxContainerClasses += " accent-box-container";
    this.boxIconContainerClasses += " accent-box-icon-container";
    this.boxIconClasses += " accent-box-icon";
  }

  private setPurpleStyle(): void {
    this.boxContainerClasses += " purple-box-container";
    this.boxIconContainerClasses += " purple-box-icon-container";
    this.boxIconClasses += " purple-box-icon";
  }

  private setPpBlueStyle(): void {
    this.boxContainerClasses += " pp-blue-box-container";
    this.boxIconContainerClasses += " pp-blue-box-icon-container";
    this.boxIconClasses += " pp-blue-box-icon";
  }
}

@NgModule({
  imports: [ 
    PpAngularMaterialModule
   ],
  exports: [ BoxComponent ],
  declarations: [ BoxComponent ]
})
export class BoxModule { }
