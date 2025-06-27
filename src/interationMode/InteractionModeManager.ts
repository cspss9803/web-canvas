import type { CanvasCore } from '../CanvasCore';
import { InteractionMode } from '../types.js';
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
        
    }
}