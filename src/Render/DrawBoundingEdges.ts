// import type { UIObject } from '../UIObject/UIObject';
import type { Group } from '../UIObject/Group/Group';
import type { Vector2, BoundingEdges } from '../types.js';
import { drawRoundedBox } from './DrawRoundedBox.js';

export function drawBoundingEdges(
    ctx: CanvasRenderingContext2D, 
    selectionGroup: Group, 
    offset: Vector2,
    zoom: number
) {
    // 如果沒有選取任何物件，則不繪製
    if ( selectionGroup.children.size === 0 ) return;

    const totalEdges = selectionGroup.getBoundingEdges();

    for ( const object of selectionGroup.children ) {
        const boxEdges = object.getBoundingEdges();

        const adjustedBoxEdges: BoundingEdges = {
            minX: boxEdges.minX * zoom,
            minY: boxEdges.minY * zoom,
            maxX: boxEdges.maxX * zoom,
            maxY: boxEdges.maxY * zoom,
        };

        drawRoundedBox(
            ctx, 
            adjustedBoxEdges, 
            offset,
            { thickness: 3, radius: 3, color: 'rgb(0, 183, 255)' }
        );
    }

    const adjustedTotalEdges = {
        minX: totalEdges.minX * zoom,
        minY: totalEdges.minY * zoom,
        maxX: totalEdges.maxX * zoom,
        maxY: totalEdges.maxY * zoom,
    }

    drawRoundedBox(
        ctx, 
        adjustedTotalEdges, 
        offset,
        { thickness: 3, radius: 3, color: 'rgb(0, 85, 255)' }
    );
}