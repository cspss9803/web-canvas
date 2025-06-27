import type { CanvasCore } from '../CanvasCore';
import { InteractionMode } from '../types.js';

export class InteractionModeManager {

    core: CanvasCore
    mode: InteractionMode = InteractionMode.Selecting
    prevMode: InteractionMode | null = null;

    constructor( core: CanvasCore ) {
        this.core = core;
    }
}