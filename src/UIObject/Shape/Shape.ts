import type { Vector2, TextStyle, BorderStyle } from '../../types';
import { UIObject } from '../UIObject.js';

export abstract class Shape extends UIObject {

    constructor( position: Vector2 ) {
        super( position );
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = 'red';
        this.renderShape( ctx );
        ctx.restore();
    };

    protected abstract renderShape( ctx: CanvasRenderingContext2D ): void;
    abstract containsPoint( worldPos: Vector2 ): boolean;
}