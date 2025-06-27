export function clearCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) { throw new Error('context 取得失敗'); }
    context.clearRect(0, 0, canvas.width, canvas.height);
}