import type { CanvasCore } from '../CanvasCore';
import type { Vector2, CanvasMouseEvent, BoundingEdges } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { UIObject } from '../UIObject/UIObject';
import { getHitObject } from './GetHitObject.js';
import { getObjectsTotalBoundingEdges } from '../Utils.js';

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

            const objectManager = this.core.objectManager;
            const selectedObjects = objectManager.selectionGroup.children;
            const hitObject = getHitObject( e.worldPosition, objectManager.objects );
            const isPointInSelectionEdges = this.isPointInSelectionEdges( e.worldPosition );

            if ( isPointInSelectionEdges ) {}
            else if ( hitObject ) {
                if( e.shiftKey ) { this.toggleSelection( hitObject ); }
                else if( !selectedObjects.includes( hitObject ) ) { 
                    selectedObjects.length = 0; 
                    selectedObjects.push(hitObject); 
                }
            } 
            else { 
                this.start = e.worldPosition;
                this.isSelecting = true;
                if( !e.shiftKey ) { selectedObjects.length = 0; }
                objectManager.updateSelectedSnapshot( true );
            }
            this.core.renderer.render();
        }
    }

    private selecting = ( e: CanvasMouseEvent ) => {
        if( this.isSelecting ) {
            this.end = e.worldPosition;
            const selectionEdges = this.getSelectionEdges();
            if( selectionEdges ) { this.core.objectManager.updateSelected( selectionEdges ); }
            this.core.renderer.render();
        };
    }

    private stopSelect = () => {
        if( this.isSelecting ) {
            if( this.start ) this.start = null;
            if( this.end ) this.end = null;
            this.isSelecting = false;
            this.core.objectManager.updateSelectedSnapshot( false );
            this.core.renderer.render();
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

    private isPointInSelectionEdges( point: Vector2) {
        const selectionEdges = getObjectsTotalBoundingEdges( this.core.objectManager.selectionGroup.children );
        return !(
            point.x < selectionEdges.minX ||
            point.x > selectionEdges.maxX ||
            point.y < selectionEdges.minY ||
            point.y > selectionEdges.maxY
        );
    }

    private toggleSelection( object: UIObject ) {
        const selectedObjects = this.core.objectManager.selectionGroup.children;
        // const selected = this.core.objectManager.selected;
        const index = selectedObjects.indexOf( object );
        if ( index !== -1 ) { selectedObjects.splice( index, 1 ); } 
        else { selectedObjects.push( object ); }
    }
    
}