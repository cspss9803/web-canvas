import type { CanvasCore } from '../CanvasCore';
import type { MouseEventProps, Vector2 } from '../types';
import { InteractionMode } from '../types.js';


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

    startSelect = ({ mouseWorldPos }: MouseEventProps) => {
        if( this.core.interaction.mode !== InteractionMode.Selecting || !mouseWorldPos ) return;
        this.start = mouseWorldPos;
    }
    selecting = ({ mouseWorldPos }: MouseEventProps) => {
        if( this.core.interaction.mode !== InteractionMode.Selecting || !mouseWorldPos ) return;
        this.end = mouseWorldPos;
    }
    stopSelect = ({}: MouseEventProps) => {
        if(  this.start ) this.start = null;
        if(  this.end ) this.end = null;
    }
    
}