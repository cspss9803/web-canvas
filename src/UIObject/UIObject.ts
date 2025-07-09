import type { Vector2, BoundingEdges } from '../types';
import { generateUUID } from '../Utils.js';

export abstract class UIObject {

    readonly id: string;
    posBeforeMove: Vector2;
    position: Vector2;
    parent: UIObject | null;

    constructor(position: Vector2, parent: UIObject | null = null) {
        this.id = generateUUID();
        this.position = position;
        this.posBeforeMove = position;
        this.parent = parent;
    }

    abstract render(ctx: CanvasRenderingContext2D, offset: Vector2, zoom: number): void;

    abstract isHit( worldPos: Vector2 ): boolean;

    abstract getBoundingEdges( zoom?: number ): BoundingEdges

    startMove() {
        this.posBeforeMove = {
            x: this.position.x,
            y: this.position.y,
        };
    }

    move( offset: Vector2, useSnap: boolean ): void {
        const newPos = {
            x: this.posBeforeMove.x - offset.x,
            y: this.posBeforeMove.y - offset.y
        };
        const newPosWithSnap = {
            x: Math.round(newPos.x / 25) * 25,
            y: Math.round(newPos.y / 25) * 25
        }
        this.position = useSnap ? newPosWithSnap : newPos;
    }

}