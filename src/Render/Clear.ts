export function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) { throw new Error('context 取得失敗'); }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}