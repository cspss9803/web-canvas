import type { CanvasCore } from '../CanvasCore';
import { InteractionMode, MouseButton } from '../types.js';
import { updateCursor } from '../interationMode/updateCursor.js';
import { switchToTemporaryMoveMode, exitTemporaryMoveMode } from './temporaryMoveMode.js';

export class InteractionModeManager {

    public core: CanvasCore
    public mode: InteractionMode = InteractionMode.Select
    public prevMode: InteractionMode | null = null;

    constructor( core: CanvasCore ) {

        this.core = core;

        core.events.on('keyDown', (e) => {
            if( e.code === 'KeyH' ) {
                this.mode = InteractionMode.Pan;
                this.prevMode = null;
                if( !this.core.selection.isSelecting ) { updateCursor( core, false ); }
            } else if( e.code === 'KeyV' ) {
                this.mode = InteractionMode.Select;
                this.prevMode = null;
                if( !this.core.viewport.isPanning ) { updateCursor( core, false ); }
            }
        });

        core.events.on('mouseDown', (e) => {
            if ( e.button === MouseButton.Middle ) {
                switchToTemporaryMoveMode( this );
                updateCursor( this.core, true );
            } else if ( e.button === MouseButton.Left && this.mode === InteractionMode.Pan ) {
                updateCursor( this.core, true );
            }
        });

        core.events.on('mouseUp', () => {
            if ( this.mode === InteractionMode.Pan ) { updateCursor( this.core, false ); }
            exitTemporaryMoveMode( this );
            updateCursor( this.core, false );
        });

    }

    public initCursor() { updateCursor( this.core, false ); }
}