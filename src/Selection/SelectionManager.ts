import type { CanvasCore } from '../CanvasCore';
import type { Vector2, CanvasMouseEvent, BoundingEdges } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { getHitObject } from './GetHitObject.js';
import { SelectionGroup } from '../UIObject/Group/SelectionGroup.js';

export class SelectionManager {
    
    public core: CanvasCore;
    public start: Vector2 | null = null;
    public end: Vector2 | null = null;
    public isSelecting: boolean = false;
    public isMoving: boolean = false;
    public selectionGroup: SelectionGroup = new SelectionGroup();
    
    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('mouseDown', this.startSelect);
        core.events.on('mouseMove', this.selecting);
        core.events.on('mouseUp', this.stopSelect);
    }

    private startSelect = ( e: CanvasMouseEvent ) => {
        const isSelectMode = this.core.interaction.mode === InteractionMode.Select;
        const useLeftMouseButton = e.button === MouseButton.Left;
        if( !isSelectMode || !useLeftMouseButton ) return;

        const { objects } = this.core.objectManager;
        const { selectionGroup } = this;
        const hitObject = getHitObject( e.worldPosition, objects );
        const isHitSelectionGroup = selectionGroup.isHit( e.worldPosition );

        if ( hitObject ) {
            if( e.shiftKey ) { selectionGroup.toggle( hitObject ); }
            else if( !selectionGroup.has( hitObject ) ) { 
                selectionGroup.clear();
                selectionGroup.add( hitObject ); 
            } 
            this.startMove( e.worldPosition );
            this.core.renderer.render();
        } 
        else if( isHitSelectionGroup ) { this.startMove( e.worldPosition ); }
        else { 
            if( !e.shiftKey ) { selectionGroup.clear(); }
            this.isSelecting = true;
            this.start = e.worldPosition;
            selectionGroup.recordSnapshot();
        }
    }

    private startMove( startPosition: Vector2 ) {
        this.isMoving = true;
        this.selectionGroup.startMoveSelectedOjects( startPosition );
    }

    private selecting = ( e: CanvasMouseEvent ) => {
        if( this.isSelecting ) {
            this.end = e.worldPosition;
            const selectionEdges = this.getSelectionEdges();
            if( selectionEdges ) { 
                const objects = this.core.objectManager.objects;
                this.selectionGroup.updateSelect( objects, selectionEdges );
            }
            this.core.renderer.render();
        } else if( this.isMoving ) {
            this.selectionGroup.move( e.worldPosition, true );
            this.core.renderer.render();
        }
    }

    private stopSelect = () => {
        if( this.isSelecting ) {
            this.start = null;
            this.end = null;
            this.isSelecting = false;
            this.core.renderer.render();
        }
        else if ( this.isMoving ) {
            this.isMoving = false;
        }
    }

    private getSelectionEdges(): BoundingEdges | null {
        if( this.start && this.end ) {
            return {
                minX: Math.min( this.start.x, this.end.x ),
                maxX: Math.max( this.start.x, this.end.x ),
                minY: Math.min( this.start.y, this.end.y ),
                maxY: Math.max( this.start.y, this.end.y ),
            };
        } 
        else { return null; }
    }
}