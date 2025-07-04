export type Vector2 = { x: number; y: number; }

export enum InteractionMode { Select = "Select", Pan = "Pan" }

export enum MouseButton { Left = 0, Middle = 1, Right = 2, Back = 3, Forward = 4 }

export type MouseEventProps = {
    mouseScreenPos ?: Vector2
    mouseWorldPos ?: Vector2
    mouseButton ?: MouseButton
    useCtrl ?: boolean
    useShift ?: boolean
};

export interface CanvasMouseEvent extends MouseEvent {
    screenPosition: Vector2;
    worldPosition: Vector2
}

export interface TextStyle {
    content: string;
    color: string;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    fontFamily: string;
}

export interface BorderStyle {
    color: string;
    width: number;
    dashArray?: number[]; // e.g. [5,3] 虛線
}