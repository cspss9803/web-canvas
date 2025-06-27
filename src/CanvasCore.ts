import { RenderManager } from './Render/RenderManager.js';
import { ViewportManager } from './Viewport/ViewportManager.js';
import { SelectionManager } from './Selection/SelectionManager.js';
import { InputManager } from './Event/InputManager.js';
import { EventManager } from './Event/EventManager.js';
import { InteractionModeManager } from './interationMode/InteractionModeManager.js';

export class CanvasCore {
    renderer: RenderManager;
    viewport: ViewportManager;
    selection: SelectionManager;
    input: InputManager;
    events: EventManager = new EventManager();
    interaction: InteractionModeManager

    constructor( canvas: HTMLCanvasElement ) {
        this.renderer = new RenderManager( this, canvas );
        this.viewport = new ViewportManager( this );
        this.selection = new SelectionManager( this );
        this.input = new InputManager( this );
        this.interaction = new InteractionModeManager( this );
        this.interaction.initCursor();
        this.renderer.startListening();
    }
}