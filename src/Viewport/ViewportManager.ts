import type { CanvasCore } from '../CanvasCore.js';
import type { Vector2 } from '../types.js';
import { InteractionMode, MouseButton } from '../types.js';
import { updateCursor } from '../Cursor/updateCursor.js';
import { zoomToPoint } from './Zoom.js';
import { screenToWorld } from '../Utils.js';

type mouseEventProps = {
    mouseScreenPos?: Vector2,
    mouseWorldPos?: Vector2,
    mouseButton?: MouseButton
};

type wheelEventProps = {
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
        core.events.on('mouseDown', (e: mouseEventProps) => { this.startMoving(e) });
        core.events.on('mouseMove', (e: mouseEventProps) => { this.handleMove(e) });
        core.events.on('mouseUp', (e: mouseEventProps) => { this.stopMoving() });
        core.events.on('wheel', (e: wheelEventProps) => this.handleWheel(e));
    }

    startMoving = ({ mouseScreenPos, mouseButton }: mouseEventProps) => {
        if( !mouseScreenPos ) return;
        if( 
            this.core.interactionMode === InteractionMode.Moving && 
            mouseButton === MouseButton.Left || 
            mouseButton === MouseButton.Middle
        ) {
            this.cursorPos = mouseScreenPos;
            this.canMove = true;
            if( mouseButton === MouseButton.Middle ) {
                this.core.prevInteractionMode = this.core.interactionMode;
                this.core.interactionMode = InteractionMode.Moving;
            }
            updateCursor( this.core, true );
        }
        updateInterationMode( this.core.interactionMode ); // debug
        updatePointerDownPosition( mouseScreenPos ); // debug
    }

    handleMove = ({ mouseScreenPos }: mouseEventProps) => {
        updateMousePosition(screenToWorld( this, mouseScreenPos || { x: 0, y: 0 } )); // debug
        if ( !this.canMove || !mouseScreenPos ) return;
        this.offset.x += mouseScreenPos.x - this.cursorPos.x;
        this.offset.y += mouseScreenPos.y - this.cursorPos.y;
        this.cursorPos = mouseScreenPos;
        updateOffset(this.offset); // debug
    }

    stopMoving = () => {
        this.canMove = false;
        if ( this.core.prevInteractionMode !== null ) {
            this.core.interactionMode = this.core.prevInteractionMode;
            this.core.prevInteractionMode = null;
            updateCursor( this.core, false );
        }
        updateInterationMode( this.core.interactionMode ); // debug
        updatePointerDownPosition( null ); // debug
    }

    handleWheel = ({useCtrl, useShift, mouseScreenPos, isWheelUp}: wheelEventProps) => {
        if (useCtrl) {
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
    
}