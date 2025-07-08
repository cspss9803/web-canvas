import { UIObject } from '../UIObject.js';
import type { BoundingEdges, Vector2 } from '../../types';
import { isPointInEdges } from '../../Utils.js';

export class Group extends UIObject {

    children: Set<UIObject>;
    constructor( position: Vector2 = { x: 0, y: 0 } ) { 
        super( position );
        this.children = new Set(); 
    }

    render(ctx: CanvasRenderingContext2D, offset: Vector2, zoom: number): void {
        for( const object of this.children ) {
            object.render(ctx, offset, zoom);
        }
    }

    isHit( worldPos: Vector2 ): boolean {
        return isPointInEdges( worldPos, this.getBoundingEdges() );
    }

    has( object: UIObject ): boolean {
        for (const child of this.children) {
            if (child === object) return true;
            if (child instanceof Group && child.has(object)) return true;
        }
        return false;
    }

    getBoundingEdges( zoom: number = 1 ): BoundingEdges {
        if( this.children.size === 0 ) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
        let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
        for ( const object of this.children ) {
            const boxEdges = object.getBoundingEdges( zoom );
            minX = Math.min(minX, boxEdges.minX);
            minY = Math.min(minY, boxEdges.minY);
            maxX = Math.max(maxX, boxEdges.maxX);
            maxY = Math.max(maxY, boxEdges.maxY);
        }
        return { minX, minY, maxX, maxY };
    }

    move( delta: Vector2 ): void {
        for( const object of this.children ) {
            object.move( delta );
        }
    }
}