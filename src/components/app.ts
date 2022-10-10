import { AppContext } from "./types";
import { initPersistData } from "./store";
import { drawCurve, generateDefaultScene } from "./shape-line";
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
    const appContent: Omit<AppContext, 'previews'> = { ctx, lines: [], current: 0, canvas, code, btnCopy, checkDragGroup, };
    (appContent as AppContext).previews = new Previews(appContent as AppContext);

    return (appContent as AppContext);
}

function initEventHandlers(appContext: AppContext) {

    // 1. Drag handlers
    initDraggingListeners(appContext, updateApp);

    // 2. Copy source button
    appContext.btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(appContext.code.innerText);
    });

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

    appContext.lines = initPersistData();

    // init new lines if there is no persist data
    const dafaultScene = generateDefaultScene({nLines: 7, doQuad: false});
    appContext.lines.unshift(dafaultScene); // alway prepend default curves
    appContext.current = 0;
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

export function updateApp(appContext: AppContext) {

    function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw background gradient
        let gradient = ctx.createLinearGradient(0, 0, width, height);
    
        // gradient.addColorStop(0, 'hsla(68, 46%, 50%, .2)');
        // gradient.addColorStop(1, 'hsla(58, 100%, 50%, .1)');
    
        // gradient.addColorStop(0, '#8000ff90');
        // gradient.addColorStop(1, '#80105f90');
    
        gradient.addColorStop(0, 'tomato');
        gradient.addColorStop(1, 'purple');
    
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }
    drawBackground(appContext.ctx, appContext.canvas.width, appContext.canvas.height);

    // 2. Draw lines
    appContext.lines[appContext.current]?.forEach(line => drawCurve(appContext.ctx, line));

    // 3. Update generated code
    appContext.code.innerText = generateCodeText(appContext.lines[appContext.current] || [], appContext.lines);

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
