type SignalSubscriber = () => void;
type UnsubscribeFunc = () => void;

export class Signal {
	subscribers = new Set<SignalSubscriber>();

	subscribe(subscriber: SignalSubscriber): UnsubscribeFunc {
		this.subscribers.add(subscriber);
		return () => {
			this.subscribers.delete(subscriber);
		};
	}

	signal() {
		for (const subscriber of this.subscribers) {
			subscriber();
		}
	}
}
