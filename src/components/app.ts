import { GenCode } from "./code-text-generator";
import { initDrag } from "./dragging";
import { Line } from "./shape-line";
import { ILine } from "./types";

export type AppContext = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    code: HTMLPreElement;
    lines: ILine[];
    checkDragGroup: HTMLInputElement;
};

export function initAppContext(): AppContext | undefined {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    const code = document.getElementById('code') as HTMLPreElement;
    const checkDragGroup = document.getElementById('drag-group') as HTMLInputElement;
    if (!ctx || !code || !checkDragGroup) {
        console.log('failed init');
        return;
    }
    return { canvas, ctx, code, lines: [], checkDragGroup, };
}

export function initData(appContext: AppContext, nLines: number, quad: boolean, prev?: string) {

    // if (prev) { // later conver old format wo/ points member
    //     appContext.lines = JSON.parse(prev);
    // } else {
    for (let i = 0; i < nLines; i++) {
        appContext.lines.push(Line.initLine(quad, i));
    }
    // }

    // line style
    appContext.ctx.lineCap = 'round';
    appContext.ctx.lineJoin = 'round';

    // drag handlers
    const { dragStart, dragging, dragDone, } = initDrag(appContext, draw);
    const events: {name: keyof Pick<HTMLElementEventMap, 'mousedown' | 'mousemove' | 'mouseup' | 'mouseout'>, fn: (event: MouseEvent) => void}[] = [
        {
            name: 'mousedown',
            fn: dragStart,
        },
        {
            name: 'mousemove',
            fn: dragging,
        },
        {
            name: 'mouseup',
            fn: dragDone,
        },
        {
            name: 'mouseout',
            fn: dragDone,
        },
    ];
    events.forEach(({ name, fn }) => {
        appContext.canvas.addEventListener(name, fn);
    });
    
    appContext.canvas.onmousedown = dragStart;
    appContext.canvas.onmousemove = dragging;
    appContext.canvas.onmouseup = appContext.canvas.onmouseout = dragDone;

    //appContext.canvas.style.cursor = 'move';

    function onCanvasSizeChanged(entries: ResizeObserverEntry[]) {
        for (const entry of entries) {
            if (entry.contentBoxSize) {
                appContext.canvas.width = entry.contentBoxSize[0].inlineSize;
                appContext.canvas.height = entry.contentBoxSize[0].blockSize;
                draw(appContext);
            }
        }
    }

    const resizeObserver = new ResizeObserver(onCanvasSizeChanged);
    resizeObserver.observe(appContext.canvas, { box: 'content-box' });
}

export function draw(appContext: AppContext) {
    appContext.ctx.clearRect(0, 0, appContext.canvas.width, appContext.canvas.height);

    // bg gradient
    let gradient = appContext.ctx.createLinearGradient(0, 0, appContext.canvas.width, appContext.canvas.height);
    // gradient.addColorStop(0, 'hsla(68, 46%, 50%, .2)');
    // gradient.addColorStop(1, 'hsla(58, 100%, 50%, .1)');
    gradient.addColorStop(0, 'tomato');
    gradient.addColorStop(1, 'purple');
    appContext.ctx.fillStyle = gradient;
    appContext.ctx.fillRect(0, 0, appContext.canvas.width, appContext.canvas.height);

    appContext.lines.forEach(line => Line.drawLine(appContext.ctx, line));

    // update generated code
    appContext.code.innerText = GenCode.showCode(appContext.lines);
}

//TODO: points persistence
//TODO: select one from overlapping points under cursor
//TODO: copy state points
//TODO: show/hide control points
//TODO: when points overlapping set the same pos for them