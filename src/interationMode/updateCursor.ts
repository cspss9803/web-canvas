import type { CanvasCore } from '../CanvasCore';
import { InteractionMode } from '../types.js';

export function updateCursor( core: CanvasCore, isMouseDown: boolean ) {
    if( !core.interaction ) return;
    const interactionMode = core.interaction.mode;
    const canvas = core.canvas;

    switch ( interactionMode ) {
        case InteractionMode.Selecting:
            canvas.style.cursor = 'url(./src/Cursor/select.svg) 0 0, auto';
            break;
        case InteractionMode.Moving:
            const cusrorName = isMouseDown ? 'grabbing.svg' : 'hand.svg';
            canvas.style.cursor = `url(./src/Cursor/${cusrorName}) 0 0, auto`;
            break;
    }
}