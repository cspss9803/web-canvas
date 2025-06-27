import type { CanvasCore } from '../CanvasCore';
import type { MouseEventProps } from '../types';
import { InteractionMode, MouseButton } from '../types.js';
import { updateCursor } from '../interationMode/updateCursor.js';
import { switchToTemporaryMoveMode, exitTemporaryMoveMode } from './temporaryMoveMode.js';
import { updateInterationMode } from '../Debug/Debug.js'; /* debug */

export class InteractionModeManager {

    core: CanvasCore
    mode: InteractionMode = InteractionMode.Selecting
    prevMode: InteractionMode | null = null;

    constructor( core: CanvasCore ) {

        this.core = core;
        updateInterationMode( this.mode ); /* debug */

        core.events.on('keydown', ({ code }: { code: string }) => {

            if( code === 'KeyH' ) {
                this.mode = InteractionMode.Moving;
                this.prevMode = null;
                if( !this.core.selection.isSelecting ) { updateCursor( core, false ); }
                updateInterationMode( this.mode ); /* debug */
            } else if( code === 'KeyV' ) {
                this.mode = InteractionMode.Selecting;
                this.prevMode = null;
                if( !this.core.viewport.isPanning ) { updateCursor( core, false ); }
                updateInterationMode( this.mode ); /* debug */
            }
        });

        core.events.on('mouseDown', ({ mouseButton }: MouseEventProps) => {
            if ( mouseButton === MouseButton.Middle ) {
                switchToTemporaryMoveMode( this );
                updateCursor( this.core, true );
                updateInterationMode( this.mode ); /* debug */
            } else if ( mouseButton === MouseButton.Left && this.mode === InteractionMode.Moving ) {
                updateCursor( this.core, true );
                updateInterationMode( this.mode ); /* debug */
            }
        });

        core.events.on('mouseUp', () => {
            if ( this.mode === InteractionMode.Moving ) { updateCursor( this.core, false ); }
            exitTemporaryMoveMode( this )
            updateCursor( this.core, false );
        });

    }

    init() { updateCursor( this.core, false ); }
}