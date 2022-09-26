type ObservableSubscriber<T> = (value: T) => CleanupFunc<T> | void;
type CleanupFunc<T> = (value: T) => void;
type UnsubscribeFunc = () => void;

export class Observable<T> {
	private lastValue: T | undefined;
	subscribers = new Set<ObservableSubscriber<T>>();
	cleanupSubscribers = new Set<CleanupFunc<T>>();

	constructor(source: (resolve: (value: T) => void) => void) {
		source((value: T) => {
			for (const cleanup of this.cleanupSubscribers) {
				cleanup(this.lastValue!);
			}

			this.cleanupSubscribers.clear();
			this.lastValue = value;

			for (const subscriber of this.subscribers) {
				const cleanup = subscriber(value);
				if (cleanup) this.cleanupSubscribers.add(cleanup);
			}
		});
	}

	subscribe(subscriber: ObservableSubscriber<T>): UnsubscribeFunc {
		if (this.lastValue) {
			subscriber(this.lastValue);
		}

		this.subscribers.add(subscriber);
		return () => {
			this.subscribers.delete(subscriber);
		};
	}
}

new Observable((resolve) => {
	setInterval(() => {
		resolve(1);
	}, 1000);
});
