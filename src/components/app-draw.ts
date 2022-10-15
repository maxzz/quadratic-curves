import { AppContext } from "./types";
import { drawCurves } from "./shape-line";
import { updateGenCode } from "./text-generator";

function drawBackground(c: CanvasRenderingContext2D, width: number, height: number) {
    c.clearRect(0, 0, width, height);

    // 1. Draw background gradient
    let gradient = c.createLinearGradient(0, 0, width, height);

    // gradient.addColorStop(0, 'hsla(68, 46%, 50%, .2)');
    // gradient.addColorStop(1, 'hsla(58, 100%, 50%, .1)');

    // gradient.addColorStop(0, '#8000ff90');
    // gradient.addColorStop(1, '#80105f90');

    gradient.addColorStop(0, 'tomato');
    gradient.addColorStop(1, 'purple');

    c.fillStyle = gradient;
    c.fillRect(0, 0, width, height);
}

function drawRectSelection(appContext: AppContext) {
    if (appContext.rect) {
        const { ctx: c } = appContext;
        const { x, y, w, h } = appContext.rect;

        c.beginPath();
        c.fillStyle = '#42a5f520';
        c.fillRect(x, y, w, h);
        c.rect(x, y, w, h);
        c.lineWidth = 0.5;
        c.strokeStyle = '#42a5f5';
        c.stroke();
    }
}

function drawGrid(appContext: AppContext) {
    if (appContext.checkShowGrid.checked) {
        const { ctx: c } = appContext;
        const { width: w, height: h } = c.canvas;
        const [dx, dy] = [w / 20, h / 20];

        c.lineWidth = .5;
        c.setLineDash([2, 4]);
        c.strokeStyle = '#480613';

        // vertical
        for (let x = 0; x < w; x += dx) {
            c.beginPath();
            c.moveTo(x, 0);
            c.lineTo(x, w);
            c.stroke();
        }

        // horizontal
        for (let y = 0; y < w; y += dy) {
            c.beginPath();
            c.moveTo(0, y);
            c.lineTo(h, y);
            c.stroke();
        }

        c.setLineDash([]);
    }
}

export function updateApp(appContext: AppContext) {
    drawBackground(appContext.ctx, appContext.canvas.width, appContext.canvas.height);
    drawGrid(appContext);
    drawRectSelection(appContext);

    // 2. Draw lines
    drawCurves(appContext);

    // 3. Update generated code
    updateGenCode(appContext);

    // 4. update previews
    appContext.previews.update();
}
