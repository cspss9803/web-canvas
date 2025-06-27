import type { CanvasCore } from '../CanvasCore';
import type { Vector2, MouseEventProps } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { zoomToPoint } from './Zoom.js';
import { screenToWorld } from '../Utils.js';

type WheelEventProps = {
    useCtrl: boolean;
    useShift: boolean;
    mouseScreenPos: Vector2;
    isWheelUp: boolean;
};

/* debug -------------------------------------------- */
import { 
    updateOffset, 
    updateMousePosition, 
    updatePointerDownPosition, 
    updateZoom, 
} from '../Debug/Debug.js';
/* -------------------------------------------------- */

export class ViewportManager {

    core: CanvasCore;
    offset: Vector2 = { x: 0, y: 0 };
    cursorPos: Vector2 = { x: 0, y: 0 };
    zoom: number = 1;
    isPanning: boolean = false;
    readonly WHEEL_MOVE_DISTANCE: number = 20;

    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('mouseDown', (e: MouseEventProps) => { this.startPanning(e) });
        core.events.on('mouseMove', (e: MouseEventProps) => { this.handlePan(e) });
        core.events.on('mouseUp', (e: MouseEventProps) => { this.stopPanning() });
        core.events.on('wheel', (e: WheelEventProps) => this.handleWheel(e));
    }

    startPanning = ({ mouseScreenPos, mouseButton }: MouseEventProps) => {
        if( !mouseScreenPos || mouseButton === undefined ) return;
        if( this.canPan( mouseButton ) ) {
            this.isPanning = true;
            this.cursorPos = mouseScreenPos;
            updatePointerDownPosition( mouseScreenPos ); /* debug */
        }
    }

    handlePan = ({ mouseScreenPos }: MouseEventProps) => {
        updateMousePosition(screenToWorld( this, mouseScreenPos || { x: 0, y: 0 } )); /* debug */
        if ( !this.isPanning || !mouseScreenPos ) return;
        this.offset.x += mouseScreenPos.x - this.cursorPos.x;
        this.offset.y += mouseScreenPos.y - this.cursorPos.y;
        this.cursorPos = mouseScreenPos;
        updateOffset(this.offset); /* debug */
    }

    stopPanning = () => {
        this.isPanning = false;
        updatePointerDownPosition( null ); /* debug */
    }

    handleWheel = ({useCtrl, useShift, mouseScreenPos, isWheelUp}: WheelEventProps) => {
        if ( useCtrl ) {
            zoomToPoint(this, mouseScreenPos, isWheelUp);
            updateZoom(this.zoom);
        } else if (useShift) {
            this.offset.x += isWheelUp ? -this.WHEEL_MOVE_DISTANCE : this.WHEEL_MOVE_DISTANCE; 
            updateOffset(this.offset); /* debug */
        } else {
            this.offset.y += isWheelUp ? -this.WHEEL_MOVE_DISTANCE : this.WHEEL_MOVE_DISTANCE; 
            updateOffset(this.offset); /* debug */
        }
    }

    private canPan( mouseButton: MouseButton ) {

        // 互動模式在 "Moving" 時，按下左鍵 => 允許移動視角
        if( this.core.interaction.mode === InteractionMode.Pan && mouseButton === MouseButton.Left ) {
            return true;
        } 
        
        // 按著滑鼠中鍵，並且沒有在進行框選 => 允許移動視角
        else if( mouseButton === MouseButton.Middle && !this.core.selection.isSelecting ) {
            return true;
        } 
        
        // 其他情況 => 不允許移動視角
        else {
            return false
        }
    }
    
}