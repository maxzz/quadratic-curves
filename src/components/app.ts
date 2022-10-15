import { AppContext } from "./types";
import { initPersistData } from "./store";
import { drawCurves } from "./shape-line";
import { initDraggingListeners } from "./dragging";
import { generateCodeText } from "./code-text-generator";
import { Accordion } from "./ui-accordion";
import { Previews } from "./shape-preview";
import templates from "../templates.html?raw";

export function initAppContext(): AppContext | undefined {
    // 1. Create HTML content to avoid FOUC
    const template = document.createElement('div');
    document.body.appendChild(template);
    template.outerHTML = templates;

    // 2. Init app elements
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    const checkDragGroup = document.getElementById('chk-drag-group') as HTMLInputElement;
    const checkHidePoints = document.getElementById('chk-hide-pts') as HTMLInputElement;
    const checkShowGrid = document.getElementById('chk-show-grid') as HTMLInputElement;
    const code = document.getElementById('code') as HTMLPreElement;
    const btnCopy = document.querySelector<HTMLButtonElement>('#btn-copy-persistent')!;

    if (!ctx || !code || !btnCopy || !checkDragGroup || !checkHidePoints || !checkShowGrid) {
        console.log('failed to init');
        return;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 3. Init app previews and context
    const appContent: Omit<AppContext, 'previews'> = { ctx, scenes: [], current: 0, canvas, code, btnCopy, checkDragGroup, checkHidePoints, checkShowGrid, };
    (appContent as AppContext).previews = new Previews(appContent as AppContext);

    return (appContent as AppContext);
}

function initEventHandlers(appContext: AppContext) {
    // 1. Drag handlers
    initDraggingListeners(appContext, updateApp);

    // 2 Copy source button and Hide Points checkbox
    appContext.btnCopy.addEventListener('click', () => navigator.clipboard.writeText(appContext.code.innerText));
    appContext.checkHidePoints.addEventListener('click', () => updateApp(appContext));
    appContext.checkShowGrid.addEventListener('click', () => updateApp(appContext));

    // 3. Resize observer
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
            if (entry.contentBoxSize) {
                appContext.canvas.width = entry.contentRect.width;
                appContext.canvas.height = entry.contentRect.height;
                updateApp(appContext);
            }
        }
    }).observe(appContext.canvas);

    // 4. Details
    document.querySelectorAll('details').forEach((el) => new Accordion(el));
}

export function initApp(appContext: AppContext) {
    initEventHandlers(appContext);

    appContext.checkDragGroup.checked = true;
    appContext.checkHidePoints.checked = false;
    appContext.checkShowGrid.checked = true;

    appContext.scenes = initPersistData();

    appContext.previews.update();
}

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
    appContext.code.innerText = generateCodeText(appContext.scenes[appContext.current] || [], appContext.scenes);

    // 4. update previews
    appContext.previews.update();
}

//TODO: points persistence

//TODO: show/hide control points and show/hide points
//TODO: select one from overlapping points under cursor
//TODO: when points overlapping set the same pos for them

//TODO: copy state points
//TODO: code: js, ts, array, persist JSON

//TODO: link to GitHub - Done
//TODO: update link and preview on maxzz.github.io

//TODO: add line preview as render wo/ circles
//TODO: add button to copy state

//TODO: rectangular marque
//TODO: add move rectangle

//TODO: add blank preview to add default new blank

//TODO: add scale factor

//TODO: show grid; snap to grid
//TODO: add point to selection by click
//TODO: undo/redo