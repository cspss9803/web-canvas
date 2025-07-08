import type { Vector2, BoundingEdges } from '../types';
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

    abstract isHit( worldPos: Vector2 ): boolean;

    abstract getBoundingEdges( zoom?: number ): BoundingEdges

    move( delta: Vector2 ): void {
        this.position.x += delta.x;
        this.position.y += delta.y;
    }

}