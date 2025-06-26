type EventType = 
    'mouseDown' |
    'mouseMove' |
    'mouseUp' |
    'wheel' |
    'keyDown' |
    'keyUp';

export class EventManager {

    private listeners: Record<string, Function[]> = {};

    on(event: EventType, handler: Function) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(handler);
    }

    off(event: EventType, handler: Function) {
        this.listeners[event] = (this.listeners[event] || []).filter(h => h !== handler);
    }

    emit(event: EventType, ...args: any[]) {
        (this.listeners[event] || []).forEach(handler => handler(...args));
    }
}