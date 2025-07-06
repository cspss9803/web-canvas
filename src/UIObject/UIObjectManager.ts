import type { CanvasCore } from '../CanvasCore';
import type { UIObject } from './UIObject';
import type { BoundingEdges } from '../types';
import { selectObjects } from './selectObjects.js';
import { Rect } from './Shape/Rect.js';
import { Group } from './Group/Group.js';


export class UIObjectManager {
    
    public core: CanvasCore;
    public objects: UIObject[] = [];
    public selectedSnapshot: Set<UIObject> = new Set();
    public selectionGroup: Group = new Group();

    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('keyDown', this.deleteSelected);
        this.add( new Rect( { x:200, y:200 }, { width: 50, height:50 } ) );
        this.add( new Rect( { x:500, y:500 }, { width: 50, height:50 } ) );
    }

    public add( object: UIObject ) { this.objects.push( object ); }

    public removeObjects( objects: UIObject[] ) {
        if (objects.length === 0) return;
        const selectedIds = new Set(objects.map(o => o.id));
        this.objects = this.objects.filter(o => !selectedIds.has(o.id));
        this.selectionGroup.children = [];
    }

    private deleteSelected = ( e:KeyboardEvent ) => {
        if( ['Delete', 'Backspace'].includes(e.code) ) {
            this.removeObjects( this.selectionGroup.children );
            this.core.renderer.render();
        }
    }

    public updateSelected( selectionEdges: BoundingEdges ) {
        this.selectionGroup.children = selectObjects( this.objects, this.selectedSnapshot, selectionEdges );
    }

    public updateSelectedSnapshot( isRecord: boolean ) {
        if( isRecord ) { this.selectedSnapshot = new Set(this.selectionGroup.children); }
        else { this.selectedSnapshot.clear(); }
    }
}