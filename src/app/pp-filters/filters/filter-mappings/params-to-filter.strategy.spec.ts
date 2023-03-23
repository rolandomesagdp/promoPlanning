import { Params } from "@angular/router"
import { PpFilterTypes } from "..";
import { PpFilters } from "../pp-filter.class";
import { IPpFilters } from "../pp-filter.model";
import { ParamsToFiltersStrategy } from "./params-to-filter.strategy";

describe("ParamsToFiltersStrategy", () => {
    it("should correctly read Promo duration filter from query params", () => {
        // arrange
        const params: Params = {
            [PpFilterTypes.promoDurationStart]: 1,
            [PpFilterTypes.promoDurationEnd]: 2 
        };
        const paramstoFiltersStrategy = new ParamsToFiltersStrategy(params);

        // act
        const filters: IPpFilters = paramstoFiltersStrategy.setReportFilters().filters;

        // assert
        const expectedFilters: IPpFilters = PpFilters.createEmptyModel();
        expectedFilters.promoDuration = { start: 1, end: 2 };

        expect(filters).toEqual(expectedFilters);
    });

    it("should correctly read Promo start and end dates filters from query params", () => {
        // arrange
        const params: Params = {
            [PpFilterTypes.startDate]: new Date(2021, 5, 10).toUTCString(),
            [PpFilterTypes.endDate]: new Date(2021, 5, 10).toUTCString()
        };
        const paramstoFiltersStrategy = new ParamsToFiltersStrategy(params); 

        // act
        const filters = paramstoFiltersStrategy.setReportFilters().filters;

        // assert
        const expectedFilters: IPpFilters = PpFilters.createEmptyModel();
        expectedFilters.datesRange = {
            start: new Date(2021, 5, 10),
            end: new Date(2021, 5, 10)
        };
        expect(filters).toEqual(expectedFilters);
    });

    it("should correctly read multi-select filters from query param (using Campaigns as example)", () => {
        // arrange
        const params: Params = {
            [PpFilterTypes.campaigns]: "1,2,3"
        };
        const paramstoFiltersStrategy = new ParamsToFiltersStrategy(params);

        // act
        const filters: IPpFilters = paramstoFiltersStrategy.setReportFilters().filters;

        // assert
        const expectedFilters: IPpFilters = PpFilters.createEmptyModel();
        expectedFilters.campaigns = [{
            filterItemId: "1",
            filterItemType: PpFilterTypes.campaigns,
            filterItemName: "",
            isSelected: true
        }, {
            filterItemId: "2",
            filterItemType: PpFilterTypes.campaigns,
            filterItemName: "",
            isSelected: true
        }, {
            filterItemId: "3",
            filterItemType: PpFilterTypes.campaigns,
            filterItemName: "",
            isSelected: true
        }];

        expect(filters).toEqual(expectedFilters);
    });
});