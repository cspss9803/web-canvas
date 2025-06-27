import { CanvasCore } from './CanvasCore.js';

class WebCanvas extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        document.addEventListener("contextmenu", e => e.preventDefault());
        const canvas = document.createElement('canvas');
        canvas.style.display = 'block';
        this.shadowRoot?.appendChild( canvas );
        new CanvasCore( canvas );
    }

}

customElements.define('web-canvas', WebCanvas);