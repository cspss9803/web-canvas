import type { Vector2 } from './types.js';
import type { ViewportManager } from './Viewport/ViewportManager.js';

export function screenToWorld( Viewport: ViewportManager, screenPos: Vector2): Vector2 {
    return {
        x: (screenPos.x - Viewport.offset.x) / Viewport.zoom,
        y: (screenPos.y - Viewport.offset.y) / Viewport.zoom
    };
}