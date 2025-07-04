import { CanvasCore } from './CanvasCore.js';

const template = document.createElement('template');
template.innerHTML = `
    <canvas></canvas>
`;

class WebCanvas extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        document.addEventListener("contextmenu", e => e.preventDefault()); // 阻止原生的右鍵選單出現
        this.shadowRoot?.appendChild( template.content.cloneNode(true) );
        const canvas = this.shadowRoot?.querySelector('canvas') as HTMLCanvasElement;
        canvas.style.display = 'block';

        new CanvasCore( canvas );
    }

}

customElements.define('web-canvas', WebCanvas);