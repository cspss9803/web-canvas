import type { Vector2 } from '../types';
import { generateUUID } from '../Utils.js';

export abstract class UIObject {
    /** 唯一 ID（方便連線等操作） */
    readonly id: string;

    /** 世界座標 */
    position: Vector2;

    /** 參考父物件（若為最上層即為 null） */
    parent: UIObject | null;

    constructor(position: Vector2, parent: UIObject | null = null) {
        this.id = generateUUID();
        this.position = position;
        this.parent = parent;
    }

    /** 全局渲染入口，子類實作 */
    abstract render(ctx: CanvasRenderingContext2D, offset: Vector2, zoom: number): void;

    /** 全局碰撞／點擊檢測，子類可覆寫 */
    abstract containsPoint( worldPos: Vector2, offset: Vector2 ): boolean;

    /** 移動：同時更新子代 worldPos（相對於 parent 的偏移不變） */
    move( delta: Vector2 ): void {
        this.position.x += delta.x;
        this.position.y += delta.y;
        // 若有子物件，可遞迴移動（Group 會 override）
    }

    /** 旋轉、縮放等通用變換，可擴充 */
}