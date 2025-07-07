import type { UIObject } from '../UIObject';
import type { BoundingEdges, Vector2 } from '../../types';
import { isPointInEdges } from '../../Utils.js';

export class Group {

    children: Set<UIObject>;
    constructor() { this.children = new Set(); }

    isHit( worldPos: Vector2 ): boolean {
        return isPointInEdges( worldPos, this.getBoundingEdges() );
    }

    getBoundingEdges(): BoundingEdges {
        if( this.children.size === 0 ) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
        let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
        for ( const object of this.children ) {
            const boxEdges = object.getBoundingEdges();
            minX = Math.min(minX, boxEdges.minX);
            minY = Math.min(minY, boxEdges.minY);
            maxX = Math.max(maxX, boxEdges.maxX);
            maxY = Math.max(maxY, boxEdges.maxY);
        }
        return { minX, minY, maxX, maxY };
    }
}