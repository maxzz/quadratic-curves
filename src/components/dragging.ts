import { AppContext, XY } from "./types";
import { curveHasPoint } from "./shape-line";
import { SingleCurve } from "./types";

type DraggingLine = {
    pt?: XY;
    line?: SingleCurve;
    idx: number;
};

function getDragHandlersContext(appContext: AppContext, updateApp: (appContext: AppContext) => void) {
    let context: DraggingLine[] = [];

    function dragStart(event: MouseEvent) {
        //appContext.canvas.setPointerCapture(); //TODO: https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

        context = [];
        let pt = mousePos(event);

        const currentScene = appContext.scenes[appContext.current] || [];

        // find the nearest point
        for (var i = 0; i < currentScene.length; i++) {
            var line: SingleCurve = currentScene[i];

            //line.color === 'hsla(240, 100%, 50%, 0.95)' && console.log('----------', line);

            let res = curveHasPoint(line, pt);
            if (res) {
                context.push({ line: res.line, idx: res.idx, pt: pt, });
                if (!appContext.checkDragGroup.checked) {
                    break;
                }
            }
        }

        if (context.length) {
            //canvas.style.cursor = 'move';
            // canvas.classList.add('cursor-move');
            setTimeout(() => appContext.canvas.classList.add('cursor-move'), 0);
        }
    }

    function dragMove(event: MouseEvent) {
        if (context.length) {
            let pos = mousePos(event);
            context.forEach((draggingLine: DraggingLine) => {
                const line = draggingLine.line?.points[draggingLine.idx];
                if (line && draggingLine.pt) {
                    line[0] += pos[0] - draggingLine.pt[0];
                    line[1] += pos[1] - draggingLine.pt[1];
                    draggingLine.pt = pos;
                }
            });
            updateApp(appContext);
        }
    }

    function dragDone(event: MouseEvent) {
        context = [];
        //canvas.style.cursor = 'default';
        appContext.canvas.classList.remove('cursor-move');
        updateApp(appContext);
    }

    function mousePos(event: MouseEvent): XY {
        return [
            Math.round(event.pageX - appContext.canvas.offsetLeft),
            Math.round(event.pageY - appContext.canvas.offsetTop),
        ];
    }

    return {
        dragStart,
        dragMove,
        dragDone,
    };
}

export function initDraggingListeners(appContext: AppContext, updateApp: (appContext: AppContext) => void) {
    const { dragStart, dragMove, dragDone, } = getDragHandlersContext(appContext, updateApp);

    const events: { name: keyof Pick<HTMLElementEventMap, 'mousedown' | 'mousemove' | 'mouseup' | 'mouseout'>, fn: (event: MouseEvent) => void; }[] = [
        { name: 'mousedown', fn: dragStart, },
        { name: 'mousemove', fn: dragMove, },
        { name: 'mouseup', fn: dragDone, }, // { name: 'mouseout', fn: dragDone, },
    ];
    events.forEach(({ name, fn }) => appContext.canvas.addEventListener(name, fn));
}
