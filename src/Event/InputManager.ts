import type { CanvasCore } from '../CanvasCore';
import type { Vector2, CanvasMouseEvent } from '../types';
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
        // 確定點到的是畫布才發出按下事件
        if( e.composedPath()[0] === this.core.renderer.canvas ) {
            this.core.events.emit('mouseDown', this.getCanvasMouseEvent(e));
        }
    }

    onMouseMove = (e: MouseEvent) => {
        this.core.events.emit('mouseMove', this.getCanvasMouseEvent(e));
    }

    onMouseUp = (e: MouseEvent) => {
        this.core.events.emit('mouseUp', this.getCanvasMouseEvent(e));
    }

    onWheel = (e: WheelEvent) => {
        e.preventDefault();
        this.core.events.emit('wheel', e);
    }

    onKeyDown = (e: KeyboardEvent) => {
        this.core.events.emit('keyDown', e);
    }

    getWorldPosByEvent(e: MouseEvent): Vector2 {
        return screenToWorld( this.core.viewport, { x: e.clientX, y: e.clientY });
    }

    getCanvasMouseEvent( e: MouseEvent ): CanvasMouseEvent {
        const canvasMouseEvent = e as CanvasMouseEvent;
        canvasMouseEvent.screenPosition = { x: e.clientX, y: e.clientY };
        canvasMouseEvent.worldPosition = this.getWorldPosByEvent( e );
        return canvasMouseEvent;
    }
}
