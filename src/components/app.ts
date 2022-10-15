import { AppContext } from "./types";
import { initPersistData } from "./store";
import { initDraggingListeners } from "./dragging";
import { initCodeGeneratorEvents, updateGenCode } from "./text-generator";
import { Accordion } from "./ui-accordion";
import { Previews } from "./shape-preview";
import { updateApp } from "./app-draw";
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
    const appContent: Omit<AppContext, 'previews'> = { ctx, scenes: [], current: 0, canvas, codeType: 0, code, btnCopy, checkDragGroup, checkHidePoints, checkShowGrid, };
    (appContent as AppContext).previews = new Previews(appContent as AppContext);

    return (appContent as AppContext);
}

function initEventHandlers(appContext: AppContext) {
    // 1. Drag handlers
    initDraggingListeners(appContext, updateApp);

    // 2.1. Hide Points and show grid checkboxes
    appContext.checkHidePoints.addEventListener('click', () => updateApp(appContext));
    appContext.checkShowGrid.addEventListener('click', () => updateApp(appContext));

    // 2.2. Code flavour checkbox and copy source button 
    appContext.btnCopy.addEventListener('click', () => navigator.clipboard.writeText(appContext.code.innerText));
    initCodeGeneratorEvents(appContext, updateGenCode);

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
