import type { InteractionModeManager } from '../interationMode/InteractionModeManager';
import { InteractionMode } from '../types.js';
import { updateCursor } from '../interationMode/updateCursor.js';
import { updateInterationMode } from '../Debug/Debug.js'; /* debug */

// 按滑鼠中鍵時，暫時切換成 "移動模式"
export function switchToTemporaryMoveMode( interaction: InteractionModeManager ) {
    interaction.prevMode = interaction.mode;
    interaction.mode = InteractionMode.Moving;
}

// 放開滑鼠中鍵時，恢復到原有的 "互動模式"
export function exitTemporaryMoveMode( interaction: InteractionModeManager ) {
    if ( interaction.prevMode !== null ) {
        interaction.mode = interaction.prevMode;
        interaction.prevMode = null;
        updateCursor( interaction.core, false );
    }
    updateInterationMode( interaction.mode ); /* debug */
}