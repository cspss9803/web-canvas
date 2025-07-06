import type { UIObject } from '../UIObject';
import type { BoundingEdges, Vector2 } from '../../types';

export class Group {

    children: UIObject[];

    constructor( children: UIObject[] = [] ) {
        this.children = children;
    }

    isHit( worldPos: Vector2 ): boolean {
        const edges = this.getBoundingEdges();
        return !(
            worldPos.x < edges.minX ||
            worldPos.x > edges.maxX ||
            worldPos.y < edges.minY ||
            worldPos.y > edges.maxY
        );
    }

    getBoundingEdges(): BoundingEdges {
        if( this.children.length === 0 ) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
    
        for ( const object of this.children ) {
            const boxEdges = object.getBoundingEdges();
            const adjustedBoxEdges: BoundingEdges = {
                minX: boxEdges.minX,
                minY: boxEdges.minY,
                maxX: boxEdges.maxX,
                maxY: boxEdges.maxY,
            };
            minX = Math.min(minX, adjustedBoxEdges.minX);
            minY = Math.min(minY, adjustedBoxEdges.minY);
            maxX = Math.max(maxX, adjustedBoxEdges.maxX);
            maxY = Math.max(maxY, adjustedBoxEdges.maxY);
        }

        return { minX, minY, maxX, maxY };
    }
}