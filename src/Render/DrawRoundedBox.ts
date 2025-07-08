import type { Vector2, BoundingEdges, Color } from '../types.js';

interface BoundingBoxStyle {
    thickness?: number;
    radius?: number;
    color?: Color;
}

export function drawRoundedBox(
    ctx: CanvasRenderingContext2D,
    boxEdges: BoundingEdges,
    offset: Vector2,
    style?: BoundingBoxStyle
) {
    const thickness = style?.thickness || 3;
    const radius = style?.radius || 3;
    const color = style?.color || 'rgb(0, 85, 255)';
    ctx.save();
    ctx.translate( offset.x, offset.y );
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;

    const x = boxEdges.minX - thickness / 2;
    const y = boxEdges.minY - thickness / 2;
    const width = (boxEdges.maxX - boxEdges.minX) + thickness;
    const height = (boxEdges.maxY - boxEdges.minY) + thickness;

    ctx.beginPath();
    ctx.moveTo( x + radius, y );
    ctx.lineTo( x + width - radius, y );
    ctx.arcTo ( x + width, y, x + width, y + radius, radius );
    ctx.lineTo( x + width, y + height - radius );
    ctx.arcTo ( x + width, y + height, x + width - radius, y + height, radius );
    ctx.lineTo( x + radius, y + height );
    ctx.arcTo ( x, y + height, x, y + height - radius, radius );
    ctx.lineTo( x, y + radius );
    ctx.arcTo ( x, y, x + radius, y, radius );
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}