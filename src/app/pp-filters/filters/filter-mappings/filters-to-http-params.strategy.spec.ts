import { HttpParams } from "@angular/common/http";
import { PpFilterTypes } from "..";
import { PpFilters } from "../pp-filter.class";
import { IPpFilters } from "../pp-filter.model";
import { FiltersToHttpParams } from "./filters-to-http-params.strategy";

describe("FiltersToHttpParams", () => {
    let filters: IPpFilters;

    beforeEach(() => {
        filters = PpFilters.createEmptyModel();
    });

    it("should be undefined if no filters are provided", () => {
        // arrange
        const toHttpParamsStrategy = new FiltersToHttpParams(filters);

        // act
        const httpParams: HttpParams = toHttpParamsStrategy.toHttpParams();
        let paramsAsString = httpParams.toString();

        // assert
        expect(paramsAsString).toBeFalsy();
    });

    it("should contain promo duration start and end if are provided", () => {
        // arrange
        filters.promoDuration = { start: 1, end: 2 };
        const toHttpParamsStrategy = new FiltersToHttpParams(filters);

        // act
        const httpParams: HttpParams = toHttpParamsStrategy.toHttpParams();
        let paramsAsString = httpParams.toString();

        // assert
        const expectedQueryString: string = `${PpFilterTypes.promoDurationStart}=${filters.promoDuration.start}&${PpFilterTypes.promoDurationEnd}=${filters.promoDuration.end}`;
        expect(paramsAsString).toEqual(expectedQueryString);
    });

    it("should contain correct dates provided in date range filter", () => {
        // arrange
        filters.datesRange = { start: new Date(2021, 4, 4), end: new Date(2021, 4, 15) };
        const toHttpParamStrategy = new FiltersToHttpParams(filters);

        // act
        const paramsAsString = toHttpParamStrategy.toHttpParams().toString();

        // assert
        const expectedParamsString = `${PpFilterTypes.startDate}=${filters.datesRange.start.toUTCString()}&${PpFilterTypes.endDate}=${filters.datesRange.end.toUTCString()}`;
        const expectedWithEncodedChars = expectedParamsString.replace(/ /g, "%20");
        expect(paramsAsString).toEqual(expectedWithEncodedChars);
    });

    it("should contain correct ids provided in multi-select filters (using Campaigns as example)", () => {
        // arrange
        filters.campaigns = [{
                filterItemId: "1",
                filterItemName: "Campaign 1",
                filterItemType: PpFilterTypes.campaigns,
                isSelected: true
            }, {
                filterItemId: "2",
                filterItemName: "Campaign 2",
                filterItemType: PpFilterTypes.campaigns,
                isSelected: true
            }, {
                filterItemId: "3",
                filterItemName: "Campaign 3",
                filterItemType: PpFilterTypes.campaigns,
                isSelected: true
            }];
        const toHttpParamsStrategy = new FiltersToHttpParams(filters);

        // act
        const paramsAsString = toHttpParamsStrategy.toHttpParams().toString();

        // assert
        const expectedQueryString = `${PpFilterTypes.campaigns}=${filters.campaigns[0].filterItemId},${filters.campaigns[1].filterItemId},${filters.campaigns[2].filterItemId}`;
        expect(paramsAsString).toEqual(expectedQueryString);
    });

    it("should contain correct ids provided in multi-select filters (using Promotion Status as example)", () => {
        // arrange
        filters.promoStatus = [{
                filterItemId: "1",
                filterItemName: "Status 1",
                filterItemType: PpFilterTypes.promoStatus,
                isSelected: true
            }, {
                filterItemId: "2",
                filterItemName: "Status 2",
                filterItemType: PpFilterTypes.promoStatus,
                isSelected: true
            }, {
                filterItemId: "3",
                filterItemName: "Status 3",
                filterItemType: PpFilterTypes.promoStatus,
                isSelected: true
            }];
        const toHttpParamsStrategy = new FiltersToHttpParams(filters);

        // act
        const paramsAsString = toHttpParamsStrategy.toHttpParams().toString();

        // assert
        const expectedQueryString = `${PpFilterTypes.promoStatus}=${filters.promoStatus[0].filterItemId},${filters.promoStatus[1].filterItemId},${filters.promoStatus[2].filterItemId}`;
        expect(paramsAsString).toEqual(expectedQueryString);
    });
});