import type { Vector2, BoundingEdges } from './types';
import type { UIObject } from './UIObject/UIObject';
import type { ViewportManager } from './Viewport/ViewportManager';

export function screenToWorld( Viewport: ViewportManager, screenPos: Vector2 ): Vector2 {
    return {
        x: (screenPos.x - Viewport.offset.x) / Viewport.zoom,
        y: (screenPos.y - Viewport.offset.y) / Viewport.zoom
    };
}

export function generateUUID(): string { // 參考 RFC4122 v4 格式
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function getObjectsTotalBoundingEdges( objects: Set<UIObject> ): BoundingEdges {

    if ( objects.size === 0 ) { return { minX: 0, maxX: 0, minY: 0, maxY: 0 }; }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for ( const object of objects ) {
        const boxEdges = object.getBoundingEdges();
        minX = Math.min(minX, boxEdges.minX);
        minY = Math.min(minY, boxEdges.minY);
        maxX = Math.max(maxX, boxEdges.maxX);
        maxY = Math.max(maxY, boxEdges.maxY);
    }

    return { minX, minY, maxX, maxY };
}

export function isPointInEdges( worldPosition: Vector2, edges: BoundingEdges ){
    return !(
        worldPosition.x < edges.minX ||
        worldPosition.x > edges.maxX ||
        worldPosition.y < edges.minY ||
        worldPosition.y > edges.maxY
    )
}