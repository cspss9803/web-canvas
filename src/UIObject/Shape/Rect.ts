import type { BoundingEdges, Vector2 } from '../../types';
import { Shape } from './Shape.js';

interface RectSize {
    width: number,
    height: number
}

export class Rect extends Shape {

    size: RectSize

    constructor( position: Vector2, size: RectSize ) {
        super( position );
        this.size = size;
    }

    renderShape(ctx: CanvasRenderingContext2D) {
        const { x, y } = this.position;
        const { width, height } = this.size;
        ctx.fillRect( x, y, width, height );
    }

    isHit( worldPos: Vector2 ) {
        const { x: px, y: py } = this.position;
        const { x, y } = worldPos;
        const { width, height } = this.size;
        return x >= px && x <= px + width && y >= py && y <= py + height;
    }

    getBoundingEdges( zoom: number ): BoundingEdges {
        return {
            minX: this.position.x * zoom ,
            maxX: (this.position.x + this.size.width) * zoom,
            minY: this.position.y * zoom,
            maxY: (this.position.y + this.size.height) * zoom
        };
    }
}