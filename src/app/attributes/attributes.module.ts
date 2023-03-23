import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributesService } from './attributes.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ AttributesService ]
})
export class AttributesModule { }
