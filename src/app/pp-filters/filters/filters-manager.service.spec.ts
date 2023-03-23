import { PpFilterTypes } from "./pp-filter-type.enum";
import { FiltersManager } from "./filters-manager.service";
import { PpFilters } from "./pp-filter.class";
import { IPpFilters } from "./pp-filter.model";
import { SelectItemType } from "../drop-down-tree-select/tree-filters";

describe("FiltersManager", () => {
    let loggerMock, localStorage;
    let filtersManager: FiltersManager;
    let filters: IPpFilters;

    beforeEach(() => {
        loggerMock = jasmine.createSpyObj(["debug"]);
        localStorage = jasmine.createSpyObj(["getPromotionFilters", "addPromotionFilters", "clear"]);
        filtersManager = new FiltersManager(loggerMock, localStorage);
        filters = {
            pageSize: 10,
            pageIndex: 1,
            searchValue: "",
            datesRange: {
                start: new Date(2021, 5, 11),
                end: new Date(2021, 5, 12)
            },
            promoDuration: {
                start: 1,
                end: 90
            },
            campaigns: [{
                filterItemId: "1",
                filterItemName: "Campaign 1",
                filterItemType: PpFilterTypes.campaigns,
                isSelected: true
            }],
            promoStatus: [{
                filterItemId: "1",
                filterItemName: "Status 1",
                filterItemType: PpFilterTypes.promoStatus,
                isSelected: true
            }],
            promoTypes: [{
                filterItemId: "1",
                filterItemName: "PromoType 1",
                filterItemType: PpFilterTypes.promoType,
                isSelected: true
            }],
            promoTypesSO99: [{
                filterItemId: "1",
                filterItemName: "PromoType SO99 1",
                filterItemType: PpFilterTypes.promoTypeSO99,
                isSelected: true
            }],
            productAttribute: {
                id: "1",
                itemId: "1",
                parentId: "0",
                name: "Product Attribure 1",
                itemType: SelectItemType.ProductFreeAttrName,
                hasItems: false
            },
            marketAttribute: {
                id: "1",
                itemId: "1",
                parentId: "0",
                name: "Market Attribute 1",
                itemType: SelectItemType.MarketFreeAttrName,
                hasItems: false
            },
            promoAttribute: {
                id: "1",
                name: "Promo Attribute 1",
                itemId: "1",
                parentId: "0",
                itemType: SelectItemType.PromoAttr,
                hasItems: false
            }
        }
    });

    describe("applyFilters()", () => {
        it("should make applyFiltersEvent$ to emit the filters value", done => {
            // arrange
            filtersManager.filters = filters;
    
            // act
            filtersManager.applyFilters();
            filtersManager.applyFiltersEvent$.subscribe((emitedFilters: IPpFilters) => {
                // assert
                expect(emitedFilters).toEqual(filters);
                done();
            });
        });
    });

    describe("clearAllFilters()", () => {
        it("should make applyFiltersEvent$ to emit a cleared filters object", done => {
            // arrange
            filtersManager.filters = filters;

            // act
            filtersManager.clearAllFiltersAndApply();
            filtersManager.applyFiltersEvent$.subscribe((clearedFilters: IPpFilters) => {
                // assert
                expect(filtersManager.filters).toEqual(PpFilters.createEmptyModel());
                expect(clearedFilters).toEqual(PpFilters.createEmptyModel());
                done();
            })
        });
    });
});