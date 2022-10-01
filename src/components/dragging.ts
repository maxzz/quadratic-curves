import { ILine, IPoint } from "./types";

type DraggingLine = {
    pt?: IPoint;
    line?: ILine;
    member: string | null;
};

let drag: DraggingLine[] = [];

function dragStart(event: DragEvent) {
    drag = [];
    let pt = mousePos(event);

    // find the nearest point
    for (var i = 0; i < appContext.lines.length; i++) {
        var line: ILine = appContext.lines[i];

        let res = Line.lineHasPoint(line, pt);
        if (res) {
            drag.push({
                line: res.line,
                member: res.member,
                pt: pt,

            });
            if (!appContext.checkDragGroup.checked) {
                break;
            }
        }
    }

    if (drag.length) {
        //canvas.style.cursor = 'move';
        // canvas.classList.add('cursor-move');
        setTimeout(() => appContext.canvas.classList.add('cursor-move'), 0);
    }
}

function dragging(event: DragEvent) {
    if (drag.length) {
        let pos = mousePos(event);
        drag.forEach((item) => {
            item.line[item.member].x += pos.x - item.pt.x;
            item.line[item.member].y += pos.y - item.pt.y;
            item.pt = pos;
        });
        draw();
    }
}

function dragDone(event: DragEvent) {
    drag = [];
    //canvas.style.cursor = 'default';
    appContext.canvas.classList.remove('cursor-move');
    draw();
}

function mousePos(event: DragEvent): IPoint {
    return {
        x: event.pageX - appContext.canvas.offsetLeft,
        y: event.pageY - appContext.canvas.offsetTop
    };
}
