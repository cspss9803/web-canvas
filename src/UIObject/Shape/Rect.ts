import type { Vector2, TextStyle, BorderStyle } from '../../types';
import { UIObject } from '../UIObject';
import { Shape } from './Shape.js';

export class Rect extends Shape {
    width: number;
    height: number;

    constructor( position: Vector2, width: number, height:number, fillColor: string, borderStyle: BorderStyle, textStyle: TextStyle, parent: UIObject | null ) {
        super(  position, fillColor, borderStyle, textStyle, parent );
        this.width = width;
        this.height = height;
    }

    renderShape(ctx: CanvasRenderingContext2D) {
        const { x, y } = this.position;
        ctx.fillRect(x, y, this.width, this.height);
    }

    containsPoint(worldPos: Vector2, offset: Vector2): boolean {
        return false;
    }
}