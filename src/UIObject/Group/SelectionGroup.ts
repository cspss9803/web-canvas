import { Group } from './Group.js';
import type { UIObject } from '../UIObject.js';
import type { Vector2, BoundingEdges } from '../../types';
import { selectObjects } from '../../Selection/selectObjects.js';
import { drawRoundedBox } from '../../Render/DrawRoundedBox.js';

export class SelectionGroup extends Group {

    snapshot: Set<UIObject> = new Set();

    constructor(position: Vector2 = { x: 0, y: 0 }) { super(position); }

    toggle( object: UIObject ) {
        if ( this.children.has(object) ) { this.children.delete(object); } 
        else { this.children.add(object); }
    }

    clear(): void { this.children.clear(); }

    add( object: UIObject ) { this.children.add( object ); }

    recordSnapshot() { this.snapshot = new Set( this.children ); }

    updateSelect( objects: UIObject[], selectionEdges: BoundingEdges ) {
        this.children = selectObjects( objects, this.snapshot, selectionEdges );
    }

    render(ctx: CanvasRenderingContext2D, offset: Vector2, zoom: number): void {
        if ( this.children.size === 0 ) return;
        for ( const object of this.children ) {
            const boxEdges = object.getBoundingEdges( zoom );
            drawRoundedBox( ctx, boxEdges, offset, { color: 'rgb(0, 183, 255)' } );
        }
        drawRoundedBox( ctx, this.getBoundingEdges( zoom ), offset );
    }
}