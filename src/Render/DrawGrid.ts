import type { Vector2 } from '../types';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`
type Color = RGB | RGBA | HEX;

enum Direction { Vertical, Horizontal };

interface GridSettings {

    /** 網格大小 */
    gridSize: number;

    /** 細線顏色 */
    thinLineColor: Color;

    /** 細線寬度 */
    thinLineWidth: number;

    /** 粗線顏色 */
    thickLineColor: Color;

    /** 粗線寬度 */
    thickLineWidth: number;

    /** 每多少格繪制一條粗線 */
    thickLineInterval: number;
}

export function drawGrid( 
    canvas: HTMLCanvasElement, 
    offset: Vector2 = { x: 0, y: 0 },
    zoom: number = 1,
    gridSettings: GridSettings = {
        gridSize: 25,
        thinLineColor: '#aaa',
        thinLineWidth: 0.5,
        thickLineColor: '#777',
        thickLineWidth: 1,
        thickLineInterval: 5
    } 
) {
    
    const ctx = canvas.getContext('2d');

    const { 
        thinLineColor, 
        thinLineWidth, 
        thickLineColor, 
        thickLineWidth, 
        thickLineInterval 
    } = gridSettings;
    const gridSize = Math.round( gridSettings.gridSize * zoom * 100 ) / 100;

    function drawLines( direction: Direction ) {
        const isVertical = direction === Direction.Vertical;

        // 根據當前繪製的方向選擇寬或高
        const max = isVertical ? canvas.width : canvas.height;

        // 根據當前繪製的方向選擇 x 或 y
        const offsetValue = isVertical ? offset.x : offset.y;

        let gridIndex = Math.floor( ( offsetValue % gridSize - offsetValue ) / gridSize );
        for (
            let pos = offsetValue % gridSize; 
            pos < max; 
            pos += gridSize
        ) {

            const isThickLine = gridIndex % thickLineInterval === 0;
            gridIndex++;

            if ( !ctx ) { throw new Error('canvas context 取得失敗'); }
            ctx.strokeStyle = isThickLine ? thickLineColor : thinLineColor;
            ctx.lineWidth = isThickLine ? thickLineWidth : thinLineWidth;
            ctx.beginPath();

            if ( isVertical ) {
                ctx.moveTo( pos, 0 );
                ctx.lineTo( pos, canvas.height );
            } else {
                ctx.moveTo( 0, pos );
                ctx.lineTo( canvas.width, pos );
            }
            ctx.stroke();
        }
    }

    drawLines( Direction.Vertical );
    drawLines( Direction.Horizontal );

}