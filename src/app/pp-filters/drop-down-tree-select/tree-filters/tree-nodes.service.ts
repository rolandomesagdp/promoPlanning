import { Injectable } from '@angular/core';
import { DropDownTreeSelectModel } from './drop-down-tree-select.model';

@Injectable()
export class TreeNodesService {
  private originalNodes: DropDownTreeSelectModel[] = [];
  nodesToDisplay: DropDownTreeSelectModel[];

  constructor() { }

  buildTreeNodes(nodes: DropDownTreeSelectModel[]): void {
    this.originalNodes = [...nodes ];
    this.nodesToDisplay = [...nodes ];
    this.originalNodes.forEach(option => {
      if(option.hasItems) {
        this.displayCollapseIcon(option);
      }
    });
  }

  private displayCollapseIcon(node: DropDownTreeSelectModel): void {
    const nodeChildren: DropDownTreeSelectModel[]  = this.originalNodes.filter(x => x.parentId === node.id);
    if(nodeChildren.length <= 0) {
      this.nodesToDisplay = [...this.nodesToDisplay, this.buildDefaultChildElementForNode(node) ]
    }
  }

  private buildDefaultChildElementForNode(node: DropDownTreeSelectModel): DropDownTreeSelectModel {
    return {
      id: `-${node.id}`,
      name: "",
      itemId: null,
      parentId: node.id,
      hasItems: false,
      itemType: null
    }
  }
}
