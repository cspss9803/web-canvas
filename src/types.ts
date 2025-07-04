type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`
export type Color = RGB | RGBA | HEX;

export type Vector2 = { x: number; y: number; }

export enum InteractionMode { Select = "Select", Pan = "Pan" }

export enum MouseButton { Left = 0, Middle = 1, Right = 2, Back = 3, Forward = 4 }

export interface CanvasMouseEvent extends MouseEvent {
    screenPosition: Vector2;
    worldPosition: Vector2
}

// export type BoundingBox = {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
// }

export type BoundingEdges = {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}