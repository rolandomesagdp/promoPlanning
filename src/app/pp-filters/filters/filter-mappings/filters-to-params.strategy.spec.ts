import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { PpFilterTypes } from "..";
import { PpFilters } from "../pp-filter.class";
import { IPpFilters } from "../pp-filter.model";

describe("FiltersToParams", () => {
    let reportFilterModel: IPpFilters;

    beforeEach(() => {
        reportFilterModel = PpFilters.createEmptyModel();
    });

    it("should be undefined if no values are provided", () => {
        // arrange
        const reportFiltersClass = PpFilters.create(reportFilterModel);

        // act
        const reportFilterParams = reportFiltersClass.toParams();

        // assert
        expect(reportFilterParams).toBeFalsy();
    });

    it("should build correct params for Promo Duration", () => {
        // arrange
        reportFilterModel.promoDuration = { start: 1, end: 25 };
        const reportFiltersClass = PpFilters.create(reportFilterModel);

        // act
        const reportFilterParams = reportFiltersClass.toParams();

        // assert
        expect(reportFilterParams).toEqual({
            [PpFilterTypes.promoDurationStart.toString()]: 1,
            [PpFilterTypes.promoDurationEnd.toString()]: 25
        });
    });
    
    it("should build correct params based on provided date range", () => {
        // arrange
        reportFilterModel.datesRange = {
            start: new Date(2021, 5, 3),
            end: new Date(2021, 5, 10)
        };
        const reportFiltersClass = PpFilters.create(reportFilterModel);

        // act
        const reportFilterParams = reportFiltersClass.toParams();

        // assert
        expect(reportFilterParams).toEqual({
            [PpFilterTypes.startDate.toString()]: new Date(2021, 5, 3).toUTCString(),
            [PpFilterTypes.endDate.toString()]: new Date(2021, 5, 10).toUTCString()
        });
    });

    it("should contain correct select item params (Campaigns)", () => {
        // arrange
        const campaingsSelectItems: IFilterSelectItem[] = [{
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
        }];
        reportFilterModel.campaigns = campaingsSelectItems;
        const reportFilters = PpFilters.create(reportFilterModel);

        // act
        const params = reportFilters.toParams();

        // assert
        expect(params).toEqual({
            [PpFilterTypes.campaigns]: "1,2,3"
        });
    });

    it("should contain correct select item params (Promotion Status)", () => {
        // arrange
        const promoStatusSelectItems: IFilterSelectItem[] = [{
            filterItemId: "1",
            filterItemName: "Status 1",
            filterItemType: PpFilterTypes.promoStatus,
            isSelected: false
        }, {
            filterItemId: "2",
            filterItemName: "Status 2",
            filterItemType: PpFilterTypes.promoStatus,
            isSelected: false
        }, {
            filterItemId: "3",
            filterItemName: "Status 3",
            filterItemType: PpFilterTypes.promoStatus,
            isSelected: false
        }];

        reportFilterModel.promoStatus = promoStatusSelectItems;
        const reportFilters = PpFilters.create(reportFilterModel);

        // act
        const params = reportFilters.toParams();

        // assert
        expect(params).toEqual({
            [PpFilterTypes.promoStatus]: "1,2,3"
        });
    });
});