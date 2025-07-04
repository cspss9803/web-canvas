import type { UIObject } from '../UIObject/UIObject';
import type { Vector2, BoundingEdges, Color } from '../types.js';

interface BoundingBoxStyle {
    thickness: number;
    radius: number;
    color: Color;
}

export function drawBoundingBox(
    ctx: CanvasRenderingContext2D, 
    objects: UIObject[], 
    offset: Vector2,
    zoom: number
) {
    // 如果沒有選取任何物件，則不繪製
    if ( objects.length === 0 ) return;

    // 計算所有物件的總 Bounding Box
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for ( const object of objects ) {
        const boxEdges = object.getBoundingEdges();

        const adjustedBoxEdges: BoundingEdges = {
            minX: boxEdges.minX * zoom,
            minY: boxEdges.minY * zoom,
            maxX: boxEdges.maxX * zoom,
            maxY: boxEdges.maxY * zoom,
        };

        minX = Math.min(minX, adjustedBoxEdges.minX);
        minY = Math.min(minY, adjustedBoxEdges.minY);
        maxX = Math.max(maxX, adjustedBoxEdges.maxX);
        maxY = Math.max(maxY, adjustedBoxEdges.maxY);

        // 繪製單個物件的外框
        drawRoundedBox(
            ctx, 
            adjustedBoxEdges, 
            offset,
            { thickness: 3, radius: 3, color: 'rgb(0, 183, 255)' }
        );
    }

    // 彙整出來的最終 Bounding Edges
    const totalEdges: BoundingEdges = {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY ,
    };

    drawRoundedBox(
        ctx, 
        totalEdges, 
        offset,
        { thickness: 3, radius: 3, color: 'rgb(0, 85, 255)' }
    );
}

function drawRoundedBox(
    ctx: CanvasRenderingContext2D,
    boxEdges: BoundingEdges,
    offset: Vector2,
    style: BoundingBoxStyle
) {
    const thickness = style.thickness;
    const radius = style.radius;
    const color = style.color;
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