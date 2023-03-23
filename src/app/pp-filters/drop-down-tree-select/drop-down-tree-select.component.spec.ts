import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownTreeSelectComponent } from './drop-down-tree-select.component';
import { DropDownTreeSelectModel, SelectItemType, TreeNodesService } from './tree-filters';

describe('DropDownTreeSelectComponent', () => {
  let component: DropDownTreeSelectComponent;
  let fixture: ComponentFixture<DropDownTreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownTreeSelectComponent ],
      providers: [ TreeNodesService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set up default selected element's name value if provided", () => {
      // arrante
      const selectModel: DropDownTreeSelectModel = {
        id: "1",
        itemId: "someId",
        parentId: "0",
        name: "some name",
        hasItems: false,
        itemType: SelectItemType.MarketFreeAttrName
      }

      // act
      component.writeValue(selectModel);

      // assert
      expect(component.currentSelectedNode).toEqual(selectModel.name);
  })

  describe("Parent node levels", () => {
    it("should have at least one hidden child after passed as input parameter", () => {
      // arrange
      const filtersList: Array<DropDownTreeSelectModel> = [{
        id: "1",
        name: "Attribute 1",
        itemId: "1",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: true
      },{
        id: "2",
        name: "Attribute 2",
        itemId: "2",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: true
      },{
        id: "3",
        name: "Attribute 3",
        itemId: "3",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: true
      }];

      // act
      component.filtersList = filtersList;
      component.ngOnChanges({
        filtersList: new SimpleChange(null, filtersList, false)
      });

      // assert
      const firstNodeChild = component.filtersListData.find(x => x.parentId === filtersList[0].id);
      const secondNodeChild = component.filtersListData.find(x => x.parentId === filtersList[1].id);
      const thirdNodeChild = component.filtersListData.find(x => x.parentId === filtersList[2].id);

      expect(firstNodeChild).toBeTruthy();
      expect(secondNodeChild).toBeTruthy();
      expect(thirdNodeChild).toBeTruthy();
    });

    it("should notify parent component when parent node is expanded", () => {
      // arrange
      const filterListNodeExpandedSpy = spyOn(component.filterListNodeExpanded, "emit");
      const parentNode: DropDownTreeSelectModel = {
        id: "1",
        name: "Attribute 1",
        itemId: "1",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: true
      }
      // act
      component.itemExpanded({ node: { itemData: parentNode } });

      // assert
      expect(filterListNodeExpandedSpy).toHaveBeenCalledWith(parentNode);
    });
  });

  describe("Last child level", () => {
    let lastChildLevel: DropDownTreeSelectModel;
    beforeEach(() => {
      lastChildLevel = {
        id: "11",
        itemId: "someId",
        parentId: "1",
        name: "some name",
        hasItems: false,
        itemType: SelectItemType.MarketFreeAttrName
      }
    });

    it("should set the level as selected value if is the last level", () => {
      // act
      component.onItemClick(lastChildLevel);

      // assert
      expect(component.currentSelectedNode).toEqual(lastChildLevel.name);
    });

    it("should not set the level as selected value if it is not the last level", () => {
      // arrange
      lastChildLevel.hasItems = true;
      // act
      component.onItemClick(lastChildLevel);

      // assert
      expect(component.currentSelectedNode).toBeFalsy();
    });

    it("should notiy if the item is selected", () => {
      // arrange
      const onChangeSpy = spyOn(component, "onChange");
      // act
      component.onItemClick(lastChildLevel);

      // assert
      expect(onChangeSpy).toHaveBeenCalledWith(lastChildLevel);
    });

    it("should notiy the form is touched if the item is selected", () => {
      // arrange
      const onChangeSpy = spyOn(component, "onTouched");
      // act
      component.onItemClick(lastChildLevel);

      // assert
      expect(onChangeSpy).toHaveBeenCalled();
    });
  });
});
