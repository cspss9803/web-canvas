import type { CanvasCore } from '../CanvasCore';
import { drawGrid } from './DrawGrid.js';
import { clearCanvas } from './Clear.js';
import { drawSelectionArea } from './DrawSelectionArea.js';

export class RenderManager {

    core: CanvasCore;
    isRenderedThisFrame: boolean = false;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    
    constructor( core: CanvasCore, canvas: HTMLCanvasElement ) {
        this.core = core;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
    }

    startListening() {
        this.core.events.on('mouseDown', () => this.render() );
        this.core.events.on('mouseMove', () => this.render() );
        this.core.events.on('mouseUp', () => this.render() );
        this.core.events.on('wheel', () => this.render() );
    }

    render() {
        if ( this.isRenderedThisFrame ) return;
        this.isRenderedThisFrame = true;
        requestAnimationFrame(() => {
            const { canvas, context } = this;
            const { offset, zoom } = this.core.viewport;
            const { isSelecting, start, end } = this.core.selection;

            clearCanvas( canvas );
            drawGrid( canvas, offset, zoom );
            if( isSelecting ) { drawSelectionArea( context, start, end, offset, zoom ); }

            this.isRenderedThisFrame = false;
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.render();
    }
}