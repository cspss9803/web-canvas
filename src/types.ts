export type Vector2 = { x: number; y: number; }

export enum InteractionMode { Selecting = "Selecting", Moving = "Moving" }

export enum MouseButton { Left = 0, Middle = 1, Right = 2, Back = 3, Forward = 4 }

export type MouseEventProps = {
    mouseScreenPos ?: Vector2
    mouseWorldPos ?: Vector2
    mouseButton ?: MouseButton
    useCtrl ?: boolean
    useShift ?: boolean
};