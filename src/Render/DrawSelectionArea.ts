import type { Vector2 } from "../types"

export function drawSelectionArea( 
    ctx: CanvasRenderingContext2D,
    start: Vector2 | null, 
    end: Vector2 | null,
    offset: Vector2,
    zoom: number
) {
    if( !start || !end ) return;
    ctx.save();
    ctx.translate( offset.x, offset.y );
    ctx.scale( zoom, zoom );
    ctx.strokeStyle = 'rgb(0, 119, 255)';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(0, 119, 255, 0.25)';
    const x = Math.min( start.x,  end.x );
    const y = Math.min( start.y,  end.y );
    const w = Math.abs( start.x - end.x );
    const h = Math.abs( start.y - end.y );
    ctx.fillRect( x, y, w, h );
    ctx.strokeRect( x, y, w, h );
    ctx.restore();
}