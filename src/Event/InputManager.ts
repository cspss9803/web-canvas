import { CanvasCore } from '../CanvasCore.js';
import type { Vector2 } from '../types.js';
import { screenToWorld } from '../Utils.js';

export class InputManager {

    core: CanvasCore;

    constructor(core: CanvasCore) {
        this.core = core;
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('wheel', this.onWheel, { passive: false });
    }

    onMouseDown = (e: MouseEvent) => {
        const mouseWorldPos = this.getWorldPosByEvent(e);
        const mouseScreenPos = { x: e.clientX, y: e.clientY };
        const mouseButton = e.button;
        this.core.events.emit('mouseDown', { mouseWorldPos, mouseScreenPos, mouseButton });
    }

    onMouseMove = (e: MouseEvent) => {
        const mouseWorldPos = this.getWorldPosByEvent(e);
        const mouseScreenPos = { x: e.clientX, y: e.clientY };
        this.core.events.emit('mouseMove', { mouseWorldPos, mouseScreenPos });
    }

    onMouseUp = (e: MouseEvent) => {
        const mouseWorldPos = this.getWorldPosByEvent(e);
        const mouseScreenPos = { x: e.clientX, y: e.clientY };
        this.core.events.emit('mouseUp', { mouseWorldPos, mouseScreenPos });
    }

    onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const useCtrl = e.ctrlKey;
        const useShift = e.shiftKey;
        const isWheelUp = e.deltaY < 0;
        const mouseScreenPos = { x: e.clientX, y: e.clientY };
        this.core.events.emit('wheel', { useCtrl, useShift, mouseScreenPos, isWheelUp });
    }

    onKeyDown = (e: KeyboardEvent) => {
        this.core.events.emit('keyDown', e);
    }

    getWorldPosByEvent(e: MouseEvent): Vector2 {
        return screenToWorld( this.core.viewport, { x: e.clientX, y: e.clientY });
    }
}
