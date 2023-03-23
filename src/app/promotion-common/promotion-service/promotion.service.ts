import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPpFilters, PpFilters } from '@app/pp-filters/filters';
import { EnvironmentService } from '@pp-core/environment';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { IPromotion } from '../promotion/promotion.model';
import { IPromotionListService } from './promotion-list.service';

@Injectable()
export class PromotionService implements IPromotionListService {
	private promotionController: string;

	constructor(private httpClient: HttpClient, environmentService: EnvironmentService) {
		this.promotionController = `${environmentService.getEnvironment().serverUrl}promos`;
	}

	getById(promotionId: string): Observable<IPromotion> {
		// const promotionUrl = `${this.promotionController}/${promotionId}`;
		// return this.httpClient.get<IPromotion>(promotionUrl);
		return this.getPromotions(null).pipe(
			concatMap((promotions: IPromotion[]) => {
				const promotion = promotions.find(x => x.promoId === promotionId);
				return of(promotion);
			})
		)
	}

	getPromotions(filters: IPpFilters): Observable<IPromotion[]> {
		let promotionFilters: PpFilters = filters ? PpFilters.create(filters) : undefined;
		let params = promotionFilters ? promotionFilters.toHttpParams() : undefined;
		const url = `${this.promotionController}`;
		return this.getObservablePromotions();
	}

	getPromotionsCount(filters: IPpFilters): Observable<number> {
		let promotionFilters: PpFilters = filters ? PpFilters.create(filters) : undefined;
		let params = promotionFilters ? promotionFilters.toHttpParams() : undefined;
		const url = `${this.promotionController}/count`;
		return of(30)
	}

	createPromotion(promotion: IPromotion): Observable<IPromotion> {
		return of(promotion);
	}

	updatePromotion(promotion: IPromotion): Observable<IPromotion> {
		const url = `${this.promotionController}`;
		return this.httpClient.put<IPromotion>(url, promotion);
	}

	deletePromo(promoId: string): Observable<boolean> {
		const deletePromoUrl = `${this.promotionController}/${promoId}`;
		return this.httpClient.delete<boolean>(deletePromoUrl);
	}

	private getObservablePromotions(): Observable<IPromotion[]> {
		return of([
			{
			  promoId: "PROMO2023030814004011",
			  name: "test_autoupdate",
			  description: "Trying to edit a promotion",
			  imageUrl: '',
			  status: 1,
			  campaignId: "",
			  sellInStartDate: "2023-03-10",
			  sellInEndDate: "2023-04-27",
			  sellOutStartDate: "2023-03-10",
			  sellOutEndDate: "2023-04-27",
			  promoTypeId: 1,
			  isPastPromotion: false,
			  forecast: 2347464.99,
			  uplift: -8509.78,
			  upliftPercent: -0.36,
			  flags: [
				{
				  flagId: 13,
				  name: "Test_Flag",
				  message: "Event with missing information",
				  color: "red",
				  type: "promo"
				}
			  ],
			  promoAttributes: null,
			  isLocked: false,
			  lockedUser: null,
			  lockStartTime: null,
			  approvedParticipantsStatus: "NotApproved"
			},
			{
			  promoId: "PROMO2023031503172138",
			  name: "promo edition uplift",
			  description: "Trying to edit uplift",
			  imageUrl: '',
			  status: 1,
			  campaignId: "",
			  sellInStartDate: "2023-03-16",
			  sellInEndDate: "2023-04-01",
			  sellOutStartDate: "2023-03-16",
			  sellOutEndDate: "2023-04-01",
			  promoTypeId: 1,
			  isPastPromotion: false,
			  forecast: 8180.57,
			  uplift: 4462.13,
			  upliftPercent: 118.41,
			  flags: [
				{
				  flagId: 13,
				  name: "Test_Flag",
				  message: "Event with missing information",
				  color: "red",
				  type: "promo"
				}
			  ],
			  promoAttributes: null,
			  isLocked: false,
			  lockedUser: null,
			  lockStartTime: null,
			  approvedParticipantsStatus: "NotApproved"
			},{
				promoId: "PROMO2023030814004012",
				name: "test_autoupdate",
				description: "Trying to edit a promotion",
				imageUrl: '',
				status: 1,
				campaignId: "",
				sellInStartDate: "2023-03-10",
				sellInEndDate: "2023-04-27",
				sellOutStartDate: "2023-03-10",
				sellOutEndDate: "2023-04-27",
				promoTypeId: 1,
				isPastPromotion: false,
				forecast: 2347464.99,
				uplift: -8509.78,
				upliftPercent: -0.36,
				flags: [
				  {
					flagId: 13,
					name: "Test_Flag",
					message: "Event with missing information",
					color: "red",
					type: "promo"
				  }
				],
				promoAttributes: null,
				isLocked: false,
				lockedUser: null,
				lockStartTime: null,
				approvedParticipantsStatus: "NotApproved"
			  },
			  {
				promoId: "PROMO2023031503172139",
				name: "promo edition uplift",
				description: "Trying to edit uplift",
				imageUrl: '',
				status: 1,
				campaignId: "",
				sellInStartDate: "2023-03-16",
				sellInEndDate: "2023-04-01",
				sellOutStartDate: "2023-03-16",
				sellOutEndDate: "2023-04-01",
				promoTypeId: 1,
				isPastPromotion: false,
				forecast: 8180.57,
				uplift: 4462.13,
				upliftPercent: 118.41,
				flags: [
				  {
					flagId: 13,
					name: "Test_Flag",
					message: "Event with missing information",
					color: "red",
					type: "promo"
				  }
				],
				promoAttributes: null,
				isLocked: false,
				lockedUser: null,
				lockStartTime: null,
				approvedParticipantsStatus: "NotApproved"
			  }, {
				promoId: "PROMO2023030814004013",
				name: "test_autoupdate",
				description: "Trying to edit a promotion",
				imageUrl: '',
				status: 1,
				campaignId: "",
				sellInStartDate: "2023-03-10",
				sellInEndDate: "2023-04-27",
				sellOutStartDate: "2023-03-10",
				sellOutEndDate: "2023-04-27",
				promoTypeId: 1,
				isPastPromotion: false,
				forecast: 2347464.99,
				uplift: -8509.78,
				upliftPercent: -0.36,
				flags: [
				  {
					flagId: 13,
					name: "Test_Flag",
					message: "Event with missing information",
					color: "red",
					type: "promo"
				  }
				],
				promoAttributes: null,
				isLocked: false,
				lockedUser: null,
				lockStartTime: null,
				approvedParticipantsStatus: "NotApproved"
			  },
			  {
				promoId: "PROMO2023031503172110",
				name: "promo edition uplift",
				description: "Trying to edit uplift",
				imageUrl: '',
				status: 1,
				campaignId: "",
				sellInStartDate: "2023-03-16",
				sellInEndDate: "2023-04-01",
				sellOutStartDate: "2023-03-16",
				sellOutEndDate: "2023-04-01",
				promoTypeId: 1,
				isPastPromotion: false,
				forecast: 8180.57,
				uplift: 4462.13,
				upliftPercent: 118.41,
				flags: [
				  {
					flagId: 13,
					name: "Test_Flag",
					message: "Event with missing information",
					color: "red",
					type: "promo"
				  }
				],
				promoAttributes: null,
				isLocked: false,
				lockedUser: null,
				lockStartTime: null,
				approvedParticipantsStatus: "NotApproved"
			  }, {
				promoId: "PROMO2023030814004014",
				name: "test_autoupdate",
				description: "Trying to edit a promotion",
				imageUrl: '',
				status: 1,
				campaignId: "",
				sellInStartDate: "2023-03-10",
				sellInEndDate: "2023-04-27",
				sellOutStartDate: "2023-03-10",
				sellOutEndDate: "2023-04-27",
				promoTypeId: 1,
				isPastPromotion: false,
				forecast: 2347464.99,
				uplift: -8509.78,
				upliftPercent: -0.36,
				flags: [
				  {
					flagId: 13,
					name: "Test_Flag",
					message: "Event with missing information",
					color: "red",
					type: "promo"
				  }
				],
				promoAttributes: null,
				isLocked: false,
				lockedUser: null,
				lockStartTime: null,
				approvedParticipantsStatus: "NotApproved"
			  },
			  {
				promoId: "PROMO2023031503172111",
				name: "promo edition uplift",
				description: "Trying to edit uplift",
				imageUrl: '',
				status: 1,
				campaignId: "",
				sellInStartDate: "2023-03-16",
				sellInEndDate: "2023-04-01",
				sellOutStartDate: "2023-03-16",
				sellOutEndDate: "2023-04-01",
				promoTypeId: 1,
				isPastPromotion: false,
				forecast: 8180.57,
				uplift: 4462.13,
				upliftPercent: 118.41,
				flags: [
				  {
					flagId: 13,
					name: "Test_Flag",
					message: "Event with missing information",
					color: "red",
					type: "promo"
				  }
				],
				promoAttributes: null,
				isLocked: false,
				lockedUser: null,
				lockStartTime: null,
				approvedParticipantsStatus: "NotApproved"
			  }, {
				promoId: "PROMO2023030814004015",
				name: "test_autoupdate",
				description: "Trying to edit a promotion",
				imageUrl: '',
				status: 1,
				campaignId: "",
				sellInStartDate: "2023-03-10",
				sellInEndDate: "2023-04-27",
				sellOutStartDate: "2023-03-10",
				sellOutEndDate: "2023-04-27",
				promoTypeId: 1,
				isPastPromotion: false,
				forecast: 2347464.99,
				uplift: -8509.78,
				upliftPercent: -0.36,
				flags: [
				  {
					flagId: 13,
					name: "Test_Flag",
					message: "Event with missing information",
					color: "red",
					type: "promo"
				  }
				],
				promoAttributes: null,
				isLocked: false,
				lockedUser: null,
				lockStartTime: null,
				approvedParticipantsStatus: "NotApproved"
			  },
			  {
				promoId: "PROMO2023031503172112",
				name: "promo edition uplift",
				description: "Trying to edit uplift",
				imageUrl: '',
				status: 1,
				campaignId: "",
				sellInStartDate: "2023-03-16",
				sellInEndDate: "2023-04-01",
				sellOutStartDate: "2023-03-16",
				sellOutEndDate: "2023-04-01",
				promoTypeId: 1,
				isPastPromotion: false,
				forecast: 8180.57,
				uplift: 4462.13,
				upliftPercent: 118.41,
				flags: [
				  {
					flagId: 13,
					name: "Test_Flag",
					message: "Event with missing information",
					color: "red",
					type: "promo"
				  }
				],
				promoAttributes: null,
				isLocked: false,
				lockedUser: null,
				lockStartTime: null,
				approvedParticipantsStatus: "NotApproved"
			  }
		  ])
	}
}
