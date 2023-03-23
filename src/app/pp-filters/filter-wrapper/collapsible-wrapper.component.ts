import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pp-collapsable-wrapper',
  templateUrl: './collapsible-wrapper.component.html',
  styleUrls: ['./collapsible-wrapper.component.scss']
})
export class CollapsibleWrapperComponent implements OnInit {
  @Input() wrapperTitle: string;
  constructor() { }

  ngOnInit(): void {
  }

}
