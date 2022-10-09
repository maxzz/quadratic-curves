import { AppContext, SingleCurve } from "./types";
import { initPersistData } from "./store";
import { createCurve, drawCurve } from "./shape-line";
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

    const code = document.getElementById('code') as HTMLPreElement;
    const btnCopy = document.querySelector<HTMLButtonElement>('#btn-copy-persistent')!;
    const checkDragGroup = document.getElementById('drag-group') as HTMLInputElement;

    if (!ctx || !code || !btnCopy || !checkDragGroup) {
        console.log('failed to init');
        return;
    }

    // 3. Init app previews and context
    const appContent: Omit<AppContext, 'previews'> = { ctx, line: [], lines: [], current: 0, canvas, code, btnCopy, checkDragGroup, };
    (appContent as AppContext).previews = new Previews(appContent as AppContext);

    return (appContent as AppContext);
}

function initEventHandlers(appContext: AppContext) {
    
    // 1. Drag handlers
    initDraggingListeners(appContext, draw);

    // 2. Copy source button
    appContext.btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(appContext.code.innerText);
    });

    // 3. Resize
    function onCanvasSizeChanged(entries: ResizeObserverEntry[]) {
        for (const entry of entries) {
            if (entry.contentBoxSize) {
                appContext.canvas.width = entry.contentRect.width;
                appContext.canvas.height = entry.contentRect.height;
                draw(appContext);
            }
        }
    }

    const resizeObserver = new ResizeObserver(onCanvasSizeChanged);
    resizeObserver.observe(appContext.canvas);

    // 4. Details
    document.querySelectorAll('details').forEach((el) => new Accordion(el));
}

function initData(appContext: AppContext) {

    appContext.lines = initPersistData();

    function generateDefaultLine(): SingleCurve[] { // TODO: this may go as static text definition, no need code (unless scale but it should be done anyway)
        const nLines: number = 7; // init(appContext, 7, canvas.className == 'quadratic', oldStrings ? oldStrings[0] : undefined);
        const doQuad: boolean = false;
        const rv: SingleCurve[] = [];
        for (let idx = 0; idx < nLines; idx++) {
            rv.push(createCurve(doQuad, idx));
        }
        return rv;
    }

    // init new lines if there is no persist data
    const dafaultLine = generateDefaultLine();
    appContext.lines.unshift(dafaultLine); // alway prepend default curves
    appContext.current = 0;

    appContext.line = appContext.lines[appContext.current];
}

export function initApp(appContext: AppContext) {
    initEventHandlers(appContext);

    appContext.checkDragGroup.checked = true;

    // line style
    appContext.ctx.lineCap = 'round';
    appContext.ctx.lineJoin = 'round';
    //appContext.canvas.style.cursor = 'move';

    initData(appContext);

    appContext.previews.update();
}

export function draw(appContext: AppContext) {
    appContext.ctx.clearRect(0, 0, appContext.canvas.width, appContext.canvas.height);

    // 1. Draw background gradient
    let gradient = appContext.ctx.createLinearGradient(0, 0, appContext.canvas.width, appContext.canvas.height);
    // gradient.addColorStop(0, 'hsla(68, 46%, 50%, .2)');
    // gradient.addColorStop(1, 'hsla(58, 100%, 50%, .1)');
    gradient.addColorStop(0, 'tomato');
    gradient.addColorStop(1, 'purple');
    appContext.ctx.fillStyle = gradient;
    appContext.ctx.fillRect(0, 0, appContext.canvas.width, appContext.canvas.height);

    // 2. Draw lines
    appContext.line.forEach(line => drawCurve(appContext.ctx, line));

    // 3. Update generated code
    appContext.code.innerText = generateCodeText(appContext.line, appContext.lines);

    // 4. update previews
    appContext.previews.update();
}

//TODO: points persistence
//TODO: select one from overlapping points under cursor
//TODO: copy state points
//TODO: show/hide control points and show/hide points
//TODO: when points overlapping set the same pos for them
//TODO: link to GitHub - Done
//TODO: code: js, ts, array, persist JSON
//TODO: update link and preview on maxzz.github.io
//TODO: rectangular marque

//TODO: add line preview as render wo/ circles
//TODO: add button to copy state

//TODO: add move rectangle

//TODO: add blank preview to add default new blank
