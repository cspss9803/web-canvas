import type { CanvasCore } from '../CanvasCore';
import type { Vector2, CanvasMouseEvent, BoundingEdges } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { UIObject } from '../UIObject/UIObject';
import { getHitObject } from './GetHitObject.js';
import { getObjectsTotalBoundingEdges, isPointInEdges } from '../Utils.js';
import { Group } from '../UIObject/Group/Group.js';
import { selectObjects } from './selectObjects.js';

export class SelectionManager {
    
    public core: CanvasCore;
    public start: Vector2 | null = null
    public end: Vector2 | null = null
    public isSelecting: boolean = false;
    public selectedSnapshot: Set<UIObject> = new Set();
    public selectionGroup: Group = new Group();
    
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
            const selectedObjects = this.selectionGroup.children;
            const hitObject = getHitObject( e.worldPosition, objectManager.objects );

            const objectsTotalBoundingEdges = getObjectsTotalBoundingEdges( selectedObjects );
            const isPointInSelectionEdges = isPointInEdges( e.worldPosition, objectsTotalBoundingEdges );

            if ( isPointInSelectionEdges ) {}
            else if ( hitObject ) {
                if( e.shiftKey ) { this.toggleSelection( hitObject ); }
                else if( !selectedObjects.has( hitObject ) ) { 
                    selectedObjects.clear(); 
                    selectedObjects.add(hitObject); 
                }
                this.core.renderer.render();
            } 
            else { 
                this.start = e.worldPosition;
                this.isSelecting = true;
                if( !e.shiftKey ) { selectedObjects.clear(); }
                this.selectedSnapshot = this.selectionGroup.children;
            }
        }
    }

    private selecting = ( e: CanvasMouseEvent ) => {
        if( this.isSelecting ) {
            this.end = e.worldPosition;
            const selectionEdges = this.getSelectionEdges();
            if( selectionEdges ) { 
                const objects = this.core.objectManager.objects;
                const snapshot = this.selectedSnapshot
                const selectedObjects = selectObjects( objects, snapshot, selectionEdges );
                this.selectionGroup.children = new Set( selectedObjects );
            }
            this.core.renderer.render();
        };
    }

    private stopSelect = () => {
        if( this.isSelecting ) {
            if( this.start ) this.start = null;
            if( this.end ) this.end = null;
            this.isSelecting = false;
            this.selectedSnapshot.clear();
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

    private toggleSelection( object: UIObject ) {
        const selected = this.selectionGroup.children;
        if (selected.has(object)) { selected.delete(object); } 
        else { selected.add(object); }
    }
    
}