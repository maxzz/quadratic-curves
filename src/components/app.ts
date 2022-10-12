import { AppContext } from "./types";
import { initPersistData } from "./store";
import { drawCurve } from "./shape-line";
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
    const code = document.getElementById('code') as HTMLPreElement;
    const btnCopy = document.querySelector<HTMLButtonElement>('#btn-copy-persistent')!;

    if (!ctx || !code || !btnCopy || !checkDragGroup || !checkHidePoints) {
        console.log('failed to init');
        return;
    }

    // 3. Init app previews and context
    const appContent: Omit<AppContext, 'previews'> = { ctx, scenes: [], current: 0, canvas, code, btnCopy, checkDragGroup, checkHidePoints, };
    (appContent as AppContext).previews = new Previews(appContent as AppContext);

    return (appContent as AppContext);
}

function initEventHandlers(appContext: AppContext) {

    // 1. Drag handlers
    initDraggingListeners(appContext, updateApp);

    // 2 Copy source button and Hide Points checkbox
    appContext.btnCopy.addEventListener('click', () => navigator.clipboard.writeText(appContext.code.innerText));
    appContext.checkHidePoints.addEventListener('click', () => updateApp(appContext));

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

function initData(appContext: AppContext) {

    appContext.scenes = initPersistData();

    // init new lines if there is no persist data
    // const dafaultScene = generateDefaultScene({nLines: 7, doQuad: false});
    // appContext.scenes.unshift(dafaultScene); // always prepend default curves
    // appContext.current = 0;
}

export function initApp(appContext: AppContext) {
    initEventHandlers(appContext);

    appContext.checkDragGroup.checked = true;
    appContext.checkHidePoints.checked = false;

    // line style
    appContext.ctx.lineCap = 'round';
    appContext.ctx.lineJoin = 'round';
    //appContext.canvas.style.cursor = 'move';

    initData(appContext);

    appContext.previews.update();
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

export function updateApp(appContext: AppContext) {

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
    drawBackground(appContext.ctx, appContext.canvas.width, appContext.canvas.height);

    drawRectSelection(appContext);

    // 2. Draw lines
    appContext.scenes[appContext.current]?.forEach(curve => drawCurve(appContext, curve));

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
