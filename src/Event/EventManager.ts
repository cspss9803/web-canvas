type EventType = 'mouseDown' | 'mouseMove' | 'mouseUp' | 'wheel' | 'keydown' | 'keyUp';

export class EventManager {

    private listeners: Record<string, Function[]> = {};

    on( eventName: EventType, handler: Function ) {
        if (!this.listeners[eventName]) this.listeners[eventName] = [];
        this.listeners[eventName].push(handler);
    }

    off( eventName: EventType, handler: Function ) {
        this.listeners[eventName] = (this.listeners[eventName] || []).filter(h => h !== handler);
    }

    emit(eventName: EventType, ...args: any[]) {
        (this.listeners[eventName] || []).forEach(handler => handler(...args));
    }
}