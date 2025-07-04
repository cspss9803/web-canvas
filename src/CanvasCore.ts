import { RenderManager } from './Render/RenderManager.js';
import { ViewportManager } from './Viewport/ViewportManager.js';
import { SelectionManager } from './Selection/SelectionManager.js';
import { InputManager } from './Event/InputManager.js';
import { EventManager } from './Event/EventManager.js';
import { InteractionModeManager } from './interationMode/InteractionModeManager.js';
import { UIObjectManager } from './UIObject/UIObjectManager.js';

export class CanvasCore {
    public renderer: RenderManager;
    public viewport: ViewportManager;
    public selection: SelectionManager;
    public input: InputManager;
    public events: EventManager = new EventManager();
    public interaction: InteractionModeManager;
    public objectManager: UIObjectManager;

    constructor( canvas: HTMLCanvasElement ) {
        this.renderer = new RenderManager( this, canvas );
        this.viewport = new ViewportManager( this );
        this.selection = new SelectionManager( this );
        this.input = new InputManager( this );
        this.interaction = new InteractionModeManager( this );
        this.objectManager = new UIObjectManager( this );
        this.interaction.initCursor();
    }
}