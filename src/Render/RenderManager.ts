import type { CanvasCore } from '../CanvasCore.js';
import { drawGrid } from './DrawGrid.js';
import { clearCanvas } from './Clear.js';

export class RenderManager {

    core: CanvasCore;
    isRenderedThisFrame: boolean = false;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    
    constructor( core: CanvasCore ) {
        this.core = core;
        this.canvas = core.canvas;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
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
            const viewport = this.core.viewport;
            clearCanvas( this.canvas );
            drawGrid( this.canvas, viewport.offset, viewport.zoom );
            
            this.isRenderedThisFrame = false;
        });
    }
}