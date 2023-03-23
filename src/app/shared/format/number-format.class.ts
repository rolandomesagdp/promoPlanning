import { formatNumber } from '@angular/common';
import { EnvironmentService } from '@pp-core/environment';

export class NumberFormat {

	private localeId: string;

	get formattedNumber() {
		return formatNumber(this.originalValue, this.localeId, "1.2-2");
	}

	get percentFormat() {
		return `${formatNumber(this.originalValue, this.localeId, "1.2-2")} %`;
	}

	constructor(environmentService: EnvironmentService, public originalValue: number) { 
		this.localeId = environmentService.getEnvironment().local_id;
	}
}