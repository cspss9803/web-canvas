import type { CanvasCore } from '../CanvasCore';
import { drawGrid } from './DrawGrid.js';
import { clearCanvas } from './Clear.js';
import { drawSelectionArea } from './DrawSelectionArea.js';
import { drawObjects } from './DrawObjects.js';
import { drawBoundingBox } from './DrawBoundingBox.js';

export class RenderManager {

    public core: CanvasCore;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    private isRenderedThisFrame: boolean = false;
    
    constructor( core: CanvasCore, canvas: HTMLCanvasElement ) {
        this.core = core;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
    }

    public render() {
        if ( this.isRenderedThisFrame ) return;
        this.isRenderedThisFrame = true;
        requestAnimationFrame(() => {
            const { canvas, context } = this;
            const { offset, zoom } = this.core.viewport;
            const { isSelecting, start, end } = this.core.selection;
            const { objects, selected } = this.core.objectManager;

            clearCanvas( canvas );
            drawGrid( canvas, offset, zoom );

            if( objects.length ) { drawObjects( context, objects, offset, zoom ); }
            if( selected.length ) { drawBoundingBox( context, selected, offset, zoom ); }
            if( isSelecting ) { drawSelectionArea( context, start, end, offset, zoom ); }

            this.isRenderedThisFrame = false;
        });
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.render();
    }
}