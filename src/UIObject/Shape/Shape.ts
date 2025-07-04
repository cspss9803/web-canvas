import type { Vector2, TextStyle, BorderStyle } from '../../types';
import { UIObject } from '../UIObject.js';

export abstract class Shape extends UIObject {
    fillColor: string;
    borderStyle: BorderStyle;
    text?: TextStyle;   // 若要在形狀上繪文字

    constructor(
        position: Vector2,
        fillColor: string,
        borderStyle: BorderStyle,
        text?: TextStyle,
        parent: UIObject | null = null
    ) {
        super(position, parent);
        this.fillColor = fillColor;
        this.borderStyle = borderStyle;
        this.text = text;
    }

    /** 子類實作各自的幾何路徑 */
    render(ctx: CanvasRenderingContext2D, offset: Vector2, zoom: number) {
        ctx.save();
        ctx.translate( offset.x, offset.y );
        ctx.scale( zoom, zoom );
        ctx.fillStyle = this.fillColor;
        this.renderShape( ctx );
        ctx.restore();
    };

    protected abstract renderShape( ctx: CanvasRenderingContext2D ): void;
    abstract containsPoint(worldPos: Vector2, offset: Vector2): boolean;
}