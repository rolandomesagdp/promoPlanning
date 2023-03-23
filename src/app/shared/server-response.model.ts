interface ServiceStatus {
    code: number,
	message: string;
}

export interface ServiceResponse<T> {
    status: ServiceStatus;
	data: T;
}