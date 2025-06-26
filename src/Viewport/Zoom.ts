import { Vector2 } from '../types.js';
import type { ViewportManager } from './ViewportManager.js';
import { screenToWorld } from '../Utils.js';

export function zoomToPoint( viewport: ViewportManager, pointOnScreen: Vector2, isWheelUp: boolean) {
    // 紀錄這個「螢幕座標」在縮放之前的「世界座標」
    const worldPosBefore = screenToWorld( viewport, pointOnScreen );
    
    const ZOOM_STEP = 0.05;
    const MAX_ZOOM = 4;
    const MIN_ZOOM = 0.1;
    let newZoom = viewport.zoom + ( isWheelUp ? ZOOM_STEP : -ZOOM_STEP );
    newZoom = Math.min( MAX_ZOOM, Math.max( MIN_ZOOM, newZoom ) );
    viewport.zoom = Math.round( newZoom * 1000 ) / 1000;

    // 計算出，在調整 zoom 之後，滑鼠的「世界座標」會在螢幕上的哪個位置
    const newScreenPosOfWorldPos = {
        x: worldPosBefore.x * viewport.zoom,
        y: worldPosBefore.y * viewport.zoom
    };

    // 計算出「滑鼠在螢幕上原本的位置」到「現在滑鼠在螢幕上現在的位置」之間的差距有多少
    const newOffset = {
        x: Math.round(pointOnScreen.x - newScreenPosOfWorldPos.x),
        y: Math.round(pointOnScreen.y - newScreenPosOfWorldPos.y)
    };

    // 把這個差距補上，讓這個世界座標仍位於滑鼠下方(達到以滑鼠位置為縮放中心的效果)
    viewport.offset = newOffset;
}