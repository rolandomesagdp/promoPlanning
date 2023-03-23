import { CalendarTaskType, PpCalendarTask } from "@app/calendar/tasks";
import { of } from "rxjs";

export class RouteMock {
    snapshot = {
        params: {
            id: "1"
        }
    };
    
    queryParams = of({});
}

export class CalendarViewSpecSetup {

    getTaskByType(type: CalendarTaskType): PpCalendarTask {
        return {
            id: 1,
            parentId: 0,
            elementId: "ññkjad",
            elementType: type,
            startDate: new Date(),
            endDate: new Date(),
            name: "ñlkjadf",
            numberOfPromos: 0,
            unitBase: "1",
            units: "1",
            upliftQty: "1",
            uplift: "lkjs",
            numberOfParticipants: 20,
            currentStatus: 1,
            color: "ñkj",
            status: 1,
            isLocked: false,
            lockedUser: "",
            lockStartTime: new Date()
        }
    }

    getCalendarTasks(): PpCalendarTask[] {
        return [{
            id: 1,
            parentId: 0,
            elementId: "ññkjad",
            elementType: CalendarTaskType.PromoType,
            startDate: new Date(),
            endDate: new Date(),
            name: "ñlkjadf",
            numberOfPromos: 0,
            unitBase: "1",
            units: "1",
            upliftQty: "1",
            uplift: "lkjs",
            numberOfParticipants: 20,
            currentStatus: 1,
            color: "ñkj",
            status: 1,
            isLocked: false,
            lockedUser: "",
            lockStartTime: new Date()
        },
        {
            id: 2,
            parentId: 1,
            elementId: "ññkjad",
            elementType: CalendarTaskType.PromoType,
            startDate: new Date(),
            endDate: new Date(),
            name: "ñlkjadf",
            numberOfPromos: 0,
            unitBase: "1",
            units: "1",
            upliftQty: "1",
            uplift: "lkjs",
            numberOfParticipants: 20,
            currentStatus: 1,
            color: "ñkj",
            status: 1,
            isLocked: false,
            lockedUser: "",
            lockStartTime: new Date()
        },
        {
            id: 3,
            parentId: 0,
            elementId: "ññkjad",
            elementType: CalendarTaskType.PromoType,
            startDate: new Date(),
            endDate: new Date(),
            name: "ñlkjadf",
            numberOfPromos: 0,
            unitBase: "1",
            units: "1",
            upliftQty: "1",
            uplift: "lkjs",
            numberOfParticipants: 20,
            currentStatus: 1,
            color: "ñkj",
            status: 1,
            isLocked: false,
            lockedUser: "",
            lockStartTime: new Date()
        },
        {
            id: 4,
            parentId: 3,
            elementId: "ññkjad",
            elementType: CalendarTaskType.PromoType,
            startDate: new Date(),
            endDate: new Date(),
            name: "ñlkjadf",
            numberOfPromos: 0,
            unitBase: "1",
            units: "1",
            upliftQty: "1",
            uplift: "lkjs",
            numberOfParticipants: 20,
            currentStatus: 1,
            color: "ñkj",
            status: 1,
            isLocked: false,
            lockedUser: "",
            lockStartTime: new Date()
        }];
    }
}