import { Subscription } from "rxjs";

export class SubscriptionsManager {
	private subscriptions: Subscription;

	constructor() {
		this.subscriptions = new Subscription();
	}

	add(subscripiton: Subscription): void {
		this.subscriptions.add(subscripiton);
	}

	unsubscribe(): void {
		this.subscriptions.unsubscribe();
	}
}
