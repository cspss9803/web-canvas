import type { CanvasCore } from '../CanvasCore';
import type { MouseEventProps, Vector2 } from '../types';
import { InteractionMode, MouseButton } from '../types.js';


export class SelectionManager {
    
    core: CanvasCore;
    start: Vector2 | null = null
    end: Vector2 | null = null
    
    constructor( core: CanvasCore ) {
        this.core = core;

        core.events.on('mouseDown', (e: MouseEventProps) => { this.startSelect(e) });
        core.events.on('mouseMove', (e: MouseEventProps) => { this.selecting(e) });
        core.events.on('mouseUp', (e: MouseEventProps) => { this.stopSelect(e) });
    }

    startSelect = ({ mouseWorldPos, mouseButton }: MouseEventProps) => {
        if( 
            this.core.interaction.mode !== InteractionMode.Selecting || 
            !mouseWorldPos || 
            mouseButton !== MouseButton.Left
        ) return;
        this.start = mouseWorldPos;
    }
    selecting = ({ mouseWorldPos }: MouseEventProps) => {
        if( 
            this.core.interaction.mode !== InteractionMode.Selecting || 
            !mouseWorldPos ||
            !this.start
        ) return;
        this.end = mouseWorldPos;
    }
    stopSelect = ({}: MouseEventProps) => {
        if( this.start ) this.start = null;
        if( this.end ) this.end = null;
    }
    
}