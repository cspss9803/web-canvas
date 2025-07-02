import type { CanvasCore } from '../CanvasCore';
import type { Vector2, CanvasMouseEvent } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { zoomToPoint } from './Zoom.js';

export class ViewportManager {

    core: CanvasCore;
    offset: Vector2 = { x: 0, y: 0 };
    cursorPos: Vector2 = { x: 0, y: 0 };
    zoom: number = 1;
    isPanning: boolean = false;

    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('mouseDown', (e) => { this.startPanning(e) });
        core.events.on('mouseMove', (e) => { this.handlePan(e) });
        core.events.on('mouseUp', () => { this.stopPanning() });
        core.events.on('wheel', (e) => this.handleWheel(e));
    }

    startPanning = ( e: CanvasMouseEvent ) => {
        if( this.canPan( e.button ) ) {
            this.isPanning = true;
            this.cursorPos = e.screenPosition;
        }
    }

    handlePan = ( e: CanvasMouseEvent ) => {
        if ( !this.isPanning ) return;
        this.offset.x += e.screenPosition.x - this.cursorPos.x;
        this.offset.y += e.screenPosition.y - this.cursorPos.y;
        this.cursorPos = e.screenPosition;
    }

    stopPanning = () => { this.isPanning = false; }

    handleWheel = ( e: WheelEvent ) => {
        const isWheelUp = e.deltaY < 0;
        const mouseScreenPos = { x: e.clientX, y: e.clientY };

        // 縮放視角 => 滾動滑鼠 + 按著Ctrl
        if ( e.ctrlKey ) { zoomToPoint( this, mouseScreenPos, isWheelUp ); } 
        
        // 左右平移視角 => 滾動滑鼠 + 按著Shift
        else if ( e.shiftKey ) { this.offset.x += isWheelUp ? -20 : 20; } 
        
        // 上下平移視角 => 只滾動滑鼠
        else { this.offset.y += isWheelUp ? -20 : 20; }
    }

    private canPan( mouseButton: MouseButton ) {

        // 互動模式在 "Moving" 時，按下左鍵 => 允許移動視角
        if( 
            this.core.interaction.mode === InteractionMode.Pan && 
            mouseButton === MouseButton.Left 
        ) { return true; } 
        
        // 按著滑鼠中鍵，並且沒有在進行框選 => 允許移動視角
        else if( 
            mouseButton === MouseButton.Middle && 
            !this.core.selection.isSelecting 
        ) { return true; } 
        
        // 其他情況 => 不允許移動視角
        else { return false; }
    }
    
}