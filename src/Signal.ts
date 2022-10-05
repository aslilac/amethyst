type SignalSubscriber<T> = (result: T) => void;
type UnsubscribeFunc = () => void;

/**
 * Allows sending a one way signal to a set of subscribers. You can sort of think
 * of it as a very simple event source.
 */
export class Signal<T = void> {
	subscribers = new Set<SignalSubscriber<T>>();

	subscribe(subscriber: SignalSubscriber<T>): UnsubscribeFunc {
		this.subscribers.add(subscriber);
		return () => {
			this.subscribers.delete(subscriber);
		};
	}

	signal(result: T) {
		if (this.subscribers.size < 1)
			throw new Error("Tried to send signal, but no one has subscribed");

		for (const subscriber of this.subscribers) {
			subscriber(result);
		}
	}
}
