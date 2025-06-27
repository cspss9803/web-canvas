import type { CanvasCore } from '../CanvasCore';
import type { Vector2 } from '../types';
import { screenToWorld } from '../Utils.js';

export class InputManager {

    core: CanvasCore;

    constructor( core: CanvasCore ) {
        this.core = core;
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('wheel', this.onWheel, { passive: false });
    }

    onMouseDown = ( e: MouseEvent ) => {
        const mouseWorldPos = this.getWorldPosByEvent(e);
        const mouseScreenPos = { x: e.clientX, y: e.clientY };
        const mouseButton = e.button;
        const useCtrl = e.ctrlKey;
        const shiftKey = e.shiftKey;
        this.core.events.emit('mouseDown', {
            mouseWorldPos, 
            mouseScreenPos, 
            mouseButton, 
            useCtrl,
            shiftKey
        });
    }

    onMouseMove = (e: MouseEvent) => {
        const mouseWorldPos = this.getWorldPosByEvent(e);
        const mouseScreenPos = { x: e.clientX, y: e.clientY };
        const useCtrl = e.ctrlKey;
        const shiftKey = e.shiftKey;
        this.core.events.emit('mouseMove', { 
            mouseWorldPos, 
            mouseScreenPos, 
            useCtrl,
            shiftKey
        });
    }

    onMouseUp = (e: MouseEvent) => {
        const mouseWorldPos = this.getWorldPosByEvent(e);
        const mouseScreenPos = { x: e.clientX, y: e.clientY };
        const useCtrl = e.ctrlKey;
        const shiftKey = e.shiftKey;
        this.core.events.emit('mouseUp', { 
            mouseWorldPos, 
            mouseScreenPos, 
            useCtrl,
            shiftKey
        });
    }

    onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const useCtrl = e.ctrlKey;
        const useShift = e.shiftKey;
        const isWheelUp = e.deltaY < 0;
        const mouseScreenPos = { x: e.clientX, y: e.clientY };
        this.core.events.emit('wheel', { 
            useCtrl, 
            useShift, 
            mouseScreenPos, 
            isWheelUp 
        });
    }

    onKeyDown = (e: KeyboardEvent) => {
        const code = e.code;
        this.core.events.emit('keydown', { code });
    }

    getWorldPosByEvent(e: MouseEvent): Vector2 {
        return screenToWorld( this.core.viewport, { x: e.clientX, y: e.clientY });
    }
}
