import { Group } from './Group.js';
import type { UIObject } from '../UIObject.js';
import type { Vector2, BoundingEdges } from '../../types';
import { drawRoundedBox } from '../../Render/DrawRoundedBox.js';

export class SelectionGroup extends Group {

    snapshot: Set<UIObject> = new Set();
    startMovePos: Vector2 = { x: 0, y: 0 };

    constructor( position: Vector2 = { x: 0, y: 0 } ) { super(position); }

    toggle( object: UIObject ) {
        if ( this.children.has(object) ) { this.children.delete(object); } 
        else { this.children.add(object); }
    }

    clear(): void { this.children.clear(); }

    add( object: UIObject ) { this.children.add( object ); }

    recordSnapshot() { this.snapshot = new Set( this.children ); }

    updateSelect( objects: UIObject[], selectionEdges: BoundingEdges ) {
        const newlySelected: Set<UIObject> = new Set();
        for (const object of objects) {
            const objectEdges = object.getBoundingEdges();
            const isInBox = !(
                objectEdges.maxX < selectionEdges.minX ||
                objectEdges.minX > selectionEdges.maxX ||
                objectEdges.maxY < selectionEdges.minY ||
                objectEdges.minY > selectionEdges.maxY
            );
            const wasSelected = this.snapshot.has( object );
            if ( isInBox && !wasSelected ) { newlySelected.add(object) } // 框選前沒被選取 + 現在被框選到 => 要選取
            else if ( !isInBox && wasSelected ) { newlySelected.add(object) } // 框選前已被選取 + 現在沒被框選 => 恢復選取
        }
        this.children = new Set(newlySelected);
    }

    render(ctx: CanvasRenderingContext2D, offset: Vector2, zoom: number): void {
        if ( this.children.size === 0 ) return;
        for ( const object of this.children ) {
            const boxEdges = object.getBoundingEdges( zoom );
            drawRoundedBox( ctx, boxEdges, offset, { color: 'rgb(0, 183, 255)' } );
        }
        drawRoundedBox( ctx, this.getBoundingEdges( zoom ), offset );
    }

    startMoveSelectedOjects( startMovePos: Vector2 ) {
        this.startMovePos = startMovePos;
        this.startMove();
    }

    move( currentMousePos: Vector2, useSnap: boolean ) {
        const offset = {
            x: this.startMovePos.x - currentMousePos.x,
            y: this.startMovePos.y - currentMousePos.y,
        }
        for( const object of this.children ) { 
            object.move( offset, useSnap ); 
        }
    }
}