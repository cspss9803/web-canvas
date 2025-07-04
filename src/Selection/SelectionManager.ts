import type { CanvasCore } from '../CanvasCore';
import type { Vector2, CanvasMouseEvent, BoundingEdges } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { getHitObject } from './GetHitObject.js';

export class SelectionManager {
    
    public core: CanvasCore;
    public start: Vector2 | null = null
    public end: Vector2 | null = null
    public isSelecting: boolean = false;
    
    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('mouseDown', this.startSelect);
        core.events.on('mouseMove', this.selecting);
        core.events.on('mouseUp', this.stopSelect);
    }

    private startSelect = ( e: CanvasMouseEvent ) => {
        const isSelectMode = this.core.interaction.mode === InteractionMode.Select;
        const useLeftMouseButton = e.button === MouseButton.Left;
        if( isSelectMode && useLeftMouseButton ) {
            const startWorldPos = e.worldPosition;
            const objectManager = this.core.objectManager;
            const hitObject = getHitObject( startWorldPos, objectManager.objects );
            if ( hitObject ) {
                objectManager.selected.push( hitObject );
            } else {
                objectManager.selected = [];
                this.start = startWorldPos;
                this.isSelecting = true;
            }
            this.core.renderer.render();
        }
    }

    private selecting = ( e: CanvasMouseEvent ) => {
        if( this.isSelecting ) {
            this.end = e.worldPosition;
            const selectionEdges = this.getSelectionEdges();
            this.core.objectManager.updateSelected( selectionEdges );
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

    private getSelectionEdges(): BoundingEdges {
        if( this.start && this.end ) {
            return {
                minX: Math.min( this.start.x, this.end.x ),
                maxX: Math.max( this.start.x, this.end.x ),
                minY: Math.min( this.start.y, this.end.y ),
                maxY: Math.max( this.start.y, this.end.y ),
            };
        } 
        else { return { minX: 0, maxX: 0, minY: 0, maxY: 0 }; }
    }
    
}