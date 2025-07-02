import type { CanvasMouseEvent } from '../types';

type EventMap = {
    mouseDown: [CanvasMouseEvent];
    mouseMove: [CanvasMouseEvent];
    mouseUp: [CanvasMouseEvent];
    wheel: [WheelEvent];
    keyDown: [KeyboardEvent];
    keyUp: [KeyboardEvent];
};

export class EventManager {
    private listeners: {
        [K in keyof EventMap]?: ((...args: EventMap[K]) => void)[];
    } = {};

    on<K extends keyof EventMap>(eventName: K, handler: (...args: EventMap[K]) => void) {
        if (!this.listeners[eventName]) this.listeners[eventName] = [];
        this.listeners[eventName]!.push(handler);
    }

    off<K extends keyof EventMap>(eventName: K, handler: (...args: EventMap[K]) => void) {
        this.listeners[eventName] = (
            (this.listeners[eventName] || []).filter(h => h !== handler)
        ) as typeof this.listeners[K];
    }

    emit<K extends keyof EventMap>(eventName: K, ...args: EventMap[K]) {
        (this.listeners[eventName] || []).forEach(handler => handler(...args));
    }
}