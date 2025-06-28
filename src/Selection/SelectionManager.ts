import type { CanvasCore } from '../CanvasCore';
import type { Vector2, CanvasMouseEvent } from '../types';
import { InteractionMode, MouseButton } from '../types.js';

export class SelectionManager {
    
    core: CanvasCore;
    start: Vector2 | null = null
    end: Vector2 | null = null
    isSelecting: boolean = false;
    
    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('mouseDown', (e: CanvasMouseEvent) => { this.startSelect(e) });
        core.events.on('mouseMove', (e: CanvasMouseEvent) => { this.selecting(e) });
        core.events.on('mouseUp', () => { this.stopSelect() });
    }

    startSelect = (e: CanvasMouseEvent) => {
        if( 
            this.core.interaction.mode !== InteractionMode.Select || 
            e.button !== MouseButton.Left
        ) return;
        this.start = e.worldPosition;
        this.isSelecting = true;
    }

    selecting = (e: CanvasMouseEvent) => {
        if( !this.isSelecting ) return;
        this.end = e.worldPosition;
    }

    stopSelect = () => {
        if( this.start ) this.start = null;
        if( this.end ) this.end = null;
        this.isSelecting = false;
    }
    
}