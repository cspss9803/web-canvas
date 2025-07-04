import type { Vector2 } from '../types';
import { generateUUID } from '../Utils.js';

export abstract class UIObject {

    readonly id: string;
    position: Vector2;
    parent: UIObject | null;

    constructor(position: Vector2, parent: UIObject | null = null) {
        this.id = generateUUID();
        this.position = position;
        this.parent = parent;
    }

    abstract render(ctx: CanvasRenderingContext2D, offset: Vector2, zoom: number): void;

    abstract containsPoint( worldPos: Vector2 ): boolean;

    move( delta: Vector2 ): void {
        this.position.x += delta.x;
        this.position.y += delta.y;
    }

}