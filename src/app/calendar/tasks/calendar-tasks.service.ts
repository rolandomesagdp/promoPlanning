import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPpFilters, PpFilters } from "@app/pp-filters/filters";
import { environment } from "@environments/environment";
import { Observable, of } from "rxjs";
import { CalendarTaskType } from "./calendar-task-type.enum";
import { PpCalendarTask } from "./calendar-task.model";

@Injectable()
export class CalendarTasksService {

    constructor(private httpClient: HttpClient) { }

    getCalendar(filters: IPpFilters): Observable<PpCalendarTask[]> {
		let calendarFilters: PpFilters = filters ? PpFilters.create(filters) : undefined;
		let params = calendarFilters ? calendarFilters.toHttpParams() : undefined;
		const url = `${environment.serverUrl}promos/calendarView`;
		return of([
			{
				id: 1,
				parentId: 0,
				elementId: "1",
				elementType: CalendarTaskType.PromoType,
				startDate: null,
				endDate: null,
				name: "Discount",
				numberOfPromos: 2,
				unitBase: '2359743.21',
				units: '2354464.99',
				uplift: '-0.22',
				upliftQty: '-5228.22',
				numberOfParticipants: 212,
				currentStatus: 1,
				color: '',
				status: 1,
				isLocked: false,
				lockedUser: null,
				lockStartTime: new Date(),
			  },{
				  id: 2,
				  parentId: 1,
				  elementId: "PROMO2023030814004011",
				  elementType: CalendarTaskType.Promo,
				  startDate: new Date("2023-03-10T00:00:00"),
				  endDate: new Date("2023-04-27T00:00:00"),
				  name: "test_autoupdate",
				  unitBase: '2355974.77',
				  units: '2347464.99',
				  uplift: '-0.36',
				  upliftQty: '-8509.78',
				  numberOfPromos: 0,
				  numberOfParticipants: 210,
				  color: "#EA2128",
				  status: 1,
				  isLocked: false,
				  lockedUser: null,
				  lockStartTime: new Date(),
				  currentStatus: 1
				},
			{
				id: 3,
				parentId: 1,
				elementId: "PROMO2023031503172138",
				elementType: CalendarTaskType.Promo,
				startDate: new Date("2023-03-16T00:00:00"),
				endDate: new Date("2023-04-01T00:00:00"),
				name: "promo edition uplift",
				unitBase: '3768.44',
				units: '7000',
				uplift: '87.08',
				upliftQty: '3281.56',
				numberOfPromos: 0,
				numberOfParticipants: 2,
				color: "#31d231",
				status: 1,
				isLocked: false,
				lockedUser: null,
				lockStartTime: new Date(),
				currentStatus: 1
			  }
		  ]);
	}
}