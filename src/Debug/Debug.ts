import type { Vector2 } from '../types';
import { InteractionMode } from '../types.js';

export function updateOffset( offset: Vector2 ) {
    const element = document.getElementById( 'offset' ) as HTMLSpanElement;
    element.innerHTML = `x: ${ offset.x }px, y: ${ offset.y }px`;
}

export function updateMousePosition( mousePosition: Vector2 ) {
    const element = document.getElementById( 'mousePosition' ) as HTMLSpanElement;
    element.innerHTML = `x: ${ Math.round(mousePosition.x) }, y: ${ Math.round(mousePosition.y) }`;
}

export function updatePointerDownPosition( pointerDownPosition: Vector2 | null ) {
    const element = document.getElementById( 'pointerDownPosition' ) as HTMLSpanElement;
    if ( pointerDownPosition === null ) {
        element.innerHTML = '(尚未按下)';
        return;
    }
    
    element.innerHTML = `x: ${ pointerDownPosition.x }, y: ${ pointerDownPosition.y }`;
}

export function updateZoom( zoom: number ) {
    const element = document.getElementById('zoom') as HTMLSpanElement;
    element.innerHTML = `${ Math.round( zoom * 100 ) }% (${ zoom })`;
}

export function updateWindowsSize( width: number, height: number ) {
    const element = document.getElementById('windowsSize') as HTMLSpanElement;
    element.innerHTML = `${ width }px / ${ height }px`;
}

export function updateInterationMode( interationMode: InteractionMode ) {
    const element = document.getElementById('interationMode') as HTMLSpanElement;
    let modeName = ''
    if( interationMode === InteractionMode.Moving ) { modeName = "移動模式" }
    if( interationMode === InteractionMode.Selecting ) { modeName = "選取模式" }
    element.innerHTML = modeName;
}