import type { CanvasCore } from '../CanvasCore';
import type { Vector2, CanvasMouseEvent } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import type { UIObject } from '../UIObject/UIObject';

export class SelectionManager {
    
    public core: CanvasCore;
    public start: Vector2 | null = null
    public end: Vector2 | null = null
    public isSelecting: boolean = false;
    public selectedObjects: UIObject[] = [];
    
    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('mouseDown', this.startSelect);
        core.events.on('mouseMove', this.selecting);
        core.events.on('mouseUp', this.stopSelect);
    }

    private startSelect = (e: CanvasMouseEvent) => {
        const isSelectMode = this.core.interaction.mode === InteractionMode.Select;
        const useLeftMouseButton = e.button === MouseButton.Left;
        if( isSelectMode && useLeftMouseButton ) {
            this.start = e.worldPosition;
            this.isSelecting = true;
            this.core.renderer.render();
        }
    }

    private selecting = (e: CanvasMouseEvent) => {
        if( this.isSelecting ) {
            this.end = e.worldPosition;
            this.core.renderer.render();
        };
    }

    private stopSelect = () => {
        if( this.isSelecting ) {
            if( this.start ) this.start = null;
            if( this.end ) this.end = null;
            this.isSelecting = false;
            this.core.renderer.render();
        }
    }
    
}