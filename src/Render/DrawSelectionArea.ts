import type { Vector2 } from "../types"

export function drawSelectionArea( 
    context: CanvasRenderingContext2D,
    start: Vector2 | null, 
    end: Vector2 | null,
    offset: Vector2,
    zoom: number
) {
    if( !start || !end ) return;
    context.save();
    context.translate( offset.x, offset.y );
    context.scale( zoom, zoom );
    context.strokeStyle = 'rgb(0, 119, 255)';
    context.lineWidth = 1.5;
    context.fillStyle = 'rgba(0, 119, 255, 0.25)';
    const x = Math.min( start.x,  end.x );
    const y = Math.min( start.y,  end.y );
    const w = Math.abs( start.x - end.x );
    const h = Math.abs( start.y - end.y );
    context.fillRect( x, y, w, h );
    context.strokeRect( x, y, w, h );
    context.restore();
}