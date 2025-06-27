import { RenderManager } from './Render/RenderManager.js';
import { ViewportManager } from './Viewport/ViewportManager.js';
import { SelectionManager } from './Selection/SelectionManager.js';
import { InputManager } from './Event/InputManager.js';
import { EventManager } from './Event/EventManager.js';
import { InteractionMode } from './types.js';
import { updateCursor } from './Cursor/updateCursor.js';
import { updateWindowsSize, updateInterationMode } from './Debug/Debug.js'; // debug

export class CanvasCore {

    canvas: HTMLCanvasElement;
    renderer: RenderManager;
    viewport: ViewportManager;
    selection: SelectionManager;
    input: InputManager;
    events: EventManager = new EventManager();
    interactionMode: InteractionMode = InteractionMode.Selecting;
    prevInteractionMode: InteractionMode | null = null;

    constructor( canvas: HTMLCanvasElement ) {
        this.canvas = canvas;
        this.canvas.style.display = 'block';
        this.viewport = new ViewportManager( this );
        this.renderer = new RenderManager( this );
        this.selection = new SelectionManager( this );
        this.input = new InputManager( this );
        window.addEventListener('resize', () => this.resize());
        this.resize();
        this.renderer.startListening();
        updateCursor( this, false );
        updateInterationMode( this.interactionMode ); // debug
    }

    resize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderer.render();
        updateWindowsSize( this.canvas.width, this.canvas.height ); // debug
    }
}