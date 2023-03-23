import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPpFilters, PpFilters } from "@app/pp-filters/filters";
import { EnvironmentService } from "@pp-core/environment";
import { UnitsOfMeasurement } from "@pp-core/units-of-measurement";
import { Observable, of } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { IPromotionSummary } from "../promotion/promotion-summary.model";
import { IPromotionListService } from "./promotion-list.service";

@Injectable()
export class PromotionSummaryService implements IPromotionListService {
	private promotionController: string;

	constructor(private httpClient: HttpClient, environmentService: EnvironmentService) {
		this.promotionController = `${environmentService.getEnvironment().serverUrl}promos`;
	}

    getPromotions(filters: IPpFilters): Observable<IPromotionSummary[]> {
		let promotionFilters: PpFilters = filters ? PpFilters.create(filters) : undefined;
		let params = promotionFilters ? promotionFilters.toHttpParams() : undefined;
		const url = `${this.promotionController}/summary`;
		return this.getObservablePromotionSummaries().pipe(
			map((promotionSummaries: IPromotionSummary[]) => {
				return promotionSummaries.map((promotionSummary: IPromotionSummary) => {
					promotionSummary.imageUrl = promotionSummary.imageUrl ? promotionSummary.imageUrl : "assets/images/promotions/default-promotion-image.jpg";
					return promotionSummary;
				})
			})
		);
	}

    getPromotionsCount(filters: IPpFilters): Observable<number> {
		let promotionFilters: PpFilters = filters ? PpFilters.create(filters) : undefined;
		let params = promotionFilters ? promotionFilters.toHttpParams() : undefined;
		const url = `${this.promotionController}/count`;
		return of(30);
	}

	getById(promotionId: string, unitOfMeasurement: UnitsOfMeasurement): Observable<IPromotionSummary> {
		const url: string = `${this.promotionController}/promoSummary/promotionId/${promotionId}/uom/${unitOfMeasurement}`;
		return this.getObservablePromotionSummaries().pipe(
			concatMap((summaries: IPromotionSummary[]) => {
				const summary = summaries.find(x => x.promoId === promotionId);
				return of(summary);
			}),
			map((promotionSummary: IPromotionSummary) => {
				promotionSummary.imageUrl = promotionSummary.imageUrl ? promotionSummary.imageUrl : "assets/images/promotions/default-promotion-image.jpg";
				return promotionSummary;
			})
		);
	}

	private getObservablePromotionSummaries(): Observable<IPromotionSummary[]> {
		return of([{
			promoId: "PROMO2023030814004011",
			promoName: "test_autoupdate",
			description: "Trying to edit a promotion",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-10",
			endDate: "2023-04-27",
			participantsCount: 10,
			uplift: -8509.78,
			upliftPercent: -0.36,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		}, {
			promoId: "PROMO2023031503172138",
			promoName: "promo edition uplift",
			description: "Trying to edit uplift",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-16",
			endDate: "2023-04-01",
			participantsCount: 10,
			uplift: 4462.13,
			  upliftPercent: 118.41,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		},{
			promoId: "PROMO2023030814004012",
			promoName: "test_autoupdate",
			description: "Trying to edit a promotion",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-10",
			endDate: "2023-04-27",
			participantsCount: 10,
			uplift: -8509.78,
			upliftPercent: -0.36,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		}, {
			promoId: "PROMO2023031503172139",
			promoName: "promo edition uplift",
			description: "Trying to edit uplift",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-16",
			endDate: "2023-04-01",
			participantsCount: 10,
			uplift: 4462.13,
			  upliftPercent: 118.41,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		},
		{
			promoId: "PROMO2023030814004013",
			promoName: "test_autoupdate",
			description: "Trying to edit a promotion",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-10",
			endDate: "2023-04-27",
			participantsCount: 10,
			uplift: -8509.78,
			upliftPercent: -0.36,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		}, {
			promoId: "PROMO2023031503172110",
			promoName: "promo edition uplift",
			description: "Trying to edit uplift",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-16",
			endDate: "2023-04-01",
			participantsCount: 10,
			uplift: 4462.13,
			  upliftPercent: 118.41,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		},
		{
			promoId: "PROMO2023030814004014",
			promoName: "test_autoupdate",
			description: "Trying to edit a promotion",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-10",
			endDate: "2023-04-27",
			participantsCount: 10,
			uplift: -8509.78,
			upliftPercent: -0.36,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		}, {
			promoId: "PROMO2023031503172111",
			promoName: "promo edition uplift",
			description: "Trying to edit uplift",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-16",
			endDate: "2023-04-01",
			participantsCount: 10,
			uplift: 4462.13,
			  upliftPercent: 118.41,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		},
		{
			promoId: "PROMO2023030814004015",
			promoName: "test_autoupdate",
			description: "Trying to edit a promotion",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-10",
			endDate: "2023-04-27",
			participantsCount: 10,
			uplift: -8509.78,
			upliftPercent: -0.36,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		}, {
			promoId: "PROMO2023031503172112",
			promoName: "promo edition uplift",
			description: "Trying to edit uplift",
			imageUrl: '',
			promoType: 'Discount',
			status: 'Draft',
			duration: "10",
			startDate: "2023-03-16",
			endDate: "2023-04-01",
			participantsCount: 10,
			uplift: 4462.13,
			  upliftPercent: 118.41,
			roi: 234,
			isLocked: false,
			lockedUser: '',
			lockStartTime: new Date()
		}])
	}
}