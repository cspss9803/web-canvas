import type { CanvasCore } from '../CanvasCore';
import type { MouseEventProps } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { updateCursor } from '../interationMode/updateCursor.js';
import { updateInterationMode } from '../Debug/Debug.js'; // debug

export class InteractionModeManager {

    core: CanvasCore
    mode: InteractionMode = InteractionMode.Selecting
    prevMode: InteractionMode | null = null;

    constructor( core: CanvasCore ) {

        this.core = core;

        core.events.on('keydown', ({ code }: { code: string }) => {
            if( code === 'KeyH' ) {
                this.mode = InteractionMode.Moving;
                this.prevMode = null;
                updateCursor( core, false );
                updateInterationMode( this.mode ); // debug
            }
            if( code === 'KeyV' ) {
                this.mode = InteractionMode.Selecting;
                this.prevMode = null;
                updateCursor( core, false );
                updateInterationMode( this.mode ); // debug
            }
        });

        core.events.on('mouseDown', ({ mouseButton }: MouseEventProps) => {
            if ( mouseButton === MouseButton.Middle ) {
                this.switchToTemporaryMoveMode();
                updateCursor( this.core, true );
                updateInterationMode( this.mode ); // debug
            } else if ( mouseButton === MouseButton.Left && this.mode === InteractionMode.Moving ) {
                updateCursor( this.core, true );
                updateInterationMode( this.mode ); // debug
            }
        });

        core.events.on('mouseUp', () => {
            if ( this.mode === InteractionMode.Moving ) { updateCursor( this.core, false ); }
           this.exitTemporaryMoveMode();
        });

        updateCursor( this.core, false );
        
    }

    // 按滑鼠中鍵時，暫時切換成 "移動模式"
    switchToTemporaryMoveMode() {
        this.prevMode = this.mode;
        this.mode = InteractionMode.Moving;
    }

    // 放開滑鼠中鍵時，恢復到原有的 "互動模式"
    exitTemporaryMoveMode() {
        if ( this.prevMode !== null ) {
            this.mode = this.prevMode;
            this.prevMode = null;
            updateCursor( this.core, false );
        }
        updateInterationMode( this.mode ); // debug
    }
}