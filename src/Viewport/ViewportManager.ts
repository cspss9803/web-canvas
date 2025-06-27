import type { CanvasCore } from '../CanvasCore';
import type { Vector2, MouseEventProps } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { updateCursor } from '../interationMode/updateCursor.js';
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
    updateInterationMode
} from '../Debug/Debug.js';
/* -------------------------------------------------- */

export class ViewportManager {

    core: CanvasCore;
    offset: Vector2 = { x: 0, y: 0 };
    cursorPos: Vector2 = { x: 0, y: 0 };
    zoom: number = 1;
    canMove: boolean = false;
    readonly WHEEL_MOVE_DISTANCE: number = 20;

    constructor( core: CanvasCore ) {
        this.core = core;
        core.events.on('mouseDown', (e: MouseEventProps) => { this.startMoving(e) });
        core.events.on('mouseMove', (e: MouseEventProps) => { this.handleMove(e) });
        core.events.on('mouseUp', (e: MouseEventProps) => { this.stopMoving() });
        core.events.on('wheel', (e: WheelEventProps) => this.handleWheel(e));
    }

    startMoving = ({ mouseScreenPos, mouseButton }: MouseEventProps) => {
        if( !mouseScreenPos || mouseButton === undefined ) return;
        if( this.canViewportMove(mouseButton) ) {
            this.canMove = true;
            this.cursorPos = mouseScreenPos;
            updatePointerDownPosition( mouseScreenPos ); // debug
        }
    }

    handleMove = ({ mouseScreenPos }: MouseEventProps) => {
        updateMousePosition(screenToWorld( this, mouseScreenPos || { x: 0, y: 0 } )); // debug
        if ( !this.canMove || !mouseScreenPos ) return;
        this.offset.x += mouseScreenPos.x - this.cursorPos.x;
        this.offset.y += mouseScreenPos.y - this.cursorPos.y;
        this.cursorPos = mouseScreenPos;
        updateOffset(this.offset); // debug
    }

    stopMoving = () => {
        this.canMove = false;
        updatePointerDownPosition( null ); // debug
    }

    handleWheel = ({useCtrl, useShift, mouseScreenPos, isWheelUp}: WheelEventProps) => {
        if ( useCtrl ) {
            zoomToPoint(this, mouseScreenPos, isWheelUp);
            updateZoom(this.zoom);
        } else if (useShift) {
            this.offset.x += isWheelUp ? -this.WHEEL_MOVE_DISTANCE : this.WHEEL_MOVE_DISTANCE; 
            updateOffset(this.offset); // debug
        } else {
            this.offset.y += isWheelUp ? -this.WHEEL_MOVE_DISTANCE : this.WHEEL_MOVE_DISTANCE; 
            updateOffset(this.offset); // debug
        }
    }

    canViewportMove( mouseButton: MouseButton ) {
        return ( 
            this.core.interaction.mode === InteractionMode.Moving && 
            mouseButton === MouseButton.Left
        ) || mouseButton === MouseButton.Middle;
    }
    
}