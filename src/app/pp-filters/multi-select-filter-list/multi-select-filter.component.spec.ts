import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { MultiSelectFilterComponent } from '.';
import { PpFilterTypes } from '../filters/pp-filter-type.enum';
import { IFilterSelectItem } from './filter-select-item.model';

describe('CheckBoxFilterListComponent', () => {
    let component: MultiSelectFilterComponent;
    let fixture: ComponentFixture<MultiSelectFilterComponent>;
    const placeHolder: string = "Select campaigns...";
    const defaultTooltip: string = "Select campaigns...";
    let filterItemsList: IFilterSelectItem[] = [{
        filterItemId: "1",
        filterItemName: "Campaign 1",
        filterItemType: PpFilterTypes.campaigns,
        isSelected: false
    }, {
        filterItemId: "2",
        filterItemName: "Campaign 2",
        filterItemType: PpFilterTypes.campaigns,
        isSelected: false
    }, {
        filterItemId: "3",
        filterItemName: "Campaign 3",
        filterItemType: PpFilterTypes.campaigns,
        isSelected: false
    }, {
        filterItemId: "4",
        filterItemName: "Campaign 4",
        filterItemType: PpFilterTypes.campaigns,
        isSelected: false
    }];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MultiSelectFilterComponent],
            imports: [PpAngularMaterialModule, BrowserAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiSelectFilterComponent);
        component = fixture.componentInstance;
        component.filtersList = [...filterItemsList];
        component.placeHolders = placeHolder;
        component.defaultTooltip = defaultTooltip;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("filter item selection", () => {
        it("should set the default selection in the selection control", () => {
            // arrange
            const defaultSelection = [...filterItemsList.filter(x => x.filterItemId === "1" || x.filterItemId === "2")];
            component.filtersList = filterItemsList;

            // act
            component.writeValue(defaultSelection);

            // assert
            const currentSelection: IFilterSelectItem[] = component.filtersSelectionControl.value;
            expect(currentSelection).toEqual(defaultSelection);
        });

        it("should select all items if user clicks select all", () => {
            // arrange
            component.filtersList = filterItemsList;

            // act
            component.selectAll();

            // assert
            const currentSelection: IFilterSelectItem[] = component.filtersSelectionControl.value;
            expect(currentSelection).toEqual(filterItemsList);
        });

        it("should clear all items if user clicks clear all", () => {
            // arrange
            component.filtersList = filterItemsList;
            component.writeValue(filterItemsList)

            // act
            component.clearAll();

            // assert
            const currentSelection: IFilterSelectItem[] = component.filtersSelectionControl.value;
            expect(currentSelection).toEqual([]);
        });
    });

    describe("selection notification", () => {
        let onChangeSpy;
        beforeEach(() => {
            onChangeSpy = spyOn(component, "onChange");
        })
        it("should notify if an element is selected", () => {
            // arrange
            component.filtersList = filterItemsList;
            
            // act
            const valueToSelect = filterItemsList.find(x => x.filterItemId === "1");
            component.filtersSelectionControl.setValue([valueToSelect]);
            component.selectionChanged();

            // assert
            const expectedNotificationValue: IFilterSelectItem = filterItemsList.find(x => x.filterItemId === "1");
            expect(onChangeSpy).toHaveBeenCalledWith([expectedNotificationValue]);
        });

        it("should notify if all elements are selected with select all option", () => {
            // arrange
            component.filtersList = filterItemsList;
            
            // act
            component.selectAll();

            // assert
            expect(onChangeSpy).toHaveBeenCalledWith(filterItemsList);
        });

        it("should notify if all elements are cleared with clear all option", () => {
            // arrange
            component.filtersList = filterItemsList;
            component.writeValue(filterItemsList);
            
            // act
            component.clearAll();

            // assert
            expect(onChangeSpy).toHaveBeenCalledWith([]);
        });
    });
});
