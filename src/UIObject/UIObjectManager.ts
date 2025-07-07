import type { CanvasCore } from '../CanvasCore';
import type { UIObject } from './UIObject';
import { Rect } from './Shape/Rect.js';


export class UIObjectManager {
    
    public core: CanvasCore;
    public objects: UIObject[] = [];

    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('keyDown', this.deleteSelected);
        this.add( new Rect( { x:200, y:200 }, { width: 50, height:50 } ) );
        this.add( new Rect( { x:500, y:500 }, { width: 50, height:50 } ) );
    }

    public add( object: UIObject ) { this.objects.push( object ); }

    public removeObjects( objects: Set<UIObject> ) {
        if (objects.size === 0) return;
        const selectedIds = new Set(Array.from(objects, o => o.id));
        this.objects = this.objects.filter(o => !selectedIds.has(o.id));
        this.core.selection.selectionGroup.children.clear();
    }

    private deleteSelected = ( e:KeyboardEvent ) => {
        if( ['Delete', 'Backspace'].includes(e.code) ) {
            this.removeObjects( this.core.selection.selectionGroup.children );
            this.core.renderer.render();
        }
    }
}