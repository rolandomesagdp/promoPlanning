import { CalendarTaskType } from "./calendar-task-type.enum";

export interface PpCalendarTask {
	id: number;
	parentId: number;
	elementId: string;
	elementType: CalendarTaskType;
	startDate?: Date;
	endDate?: Date;
	name: string;
	numberOfPromos?: number;
	unitBase: string;
	units: string;
	uplift: string;
	upliftQty: string;
	numberOfParticipants: number;
	currentStatus: number;
	color: string;
	status?: number;
	isLocked: boolean;
	lockedUser: string;
	lockStartTime: Date;
}