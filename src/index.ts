import './index.css';

const GRAPHSTYLE = {
    curve: {
        width: 6,
        color: 'hsla(216, 91%, 50%, 0.95)'
    },
    circles: {
        width: 3,
        color: '#000',
        fill: 'hsla(100, 93%, 50%, 1)'
    },
    pline: {
        width: 2,
        color: ''
    },
    point: {
        radius: 15,
        width: 5,
        color: 'hsla(205, 98%, 50%, 0.95)',
        fill: 'rgba(200, 0, 200, .9)',
        arc1: 0,
        arc2: 2 * Math.PI
    },
    cpoint: { // control point
        radius: 10,
        width: 2,
        color: 'hsla(205, 98%, 50%, 0.95)',
        fill: 'rgba(200, 0, 200, .9)',
        arc1: 0,
        arc2: 2 * Math.PI
    }
} as const;

function hue(h: number) {
    return `hsla(${h}, 100%, 50%, 0.95)`;
}

interface IPoint {
    x: number;
    y: number;
}

interface ILine {
    p1: IPoint; // starting point
    p2: IPoint; // end point
    cp1?: IPoint;
    cp2?: IPoint;
    color?: string;
}

namespace Line {
    export function initLine(quad: boolean, n: number): ILine {
        let defLine: ILine = {
            p1: {x: 39, y: 18},
            p2: {x: 49, y: 282},
            cp1: {x: 9, y: 116},
            cp2: {x: 15, y: 195},
            color: hue(10)
        };
    
        let line: ILine = JSON.parse(JSON.stringify(defLine)); // deep copy

        if (quad) {
            delete line.cp2;
        }

        for (var p in line) {
            if (typeof line[p] === 'string') {
                continue; // skip color
            }
            line[p].x = line[p].x + n * 80;
        }

        line.color = hue(n * 40);

        return line;
    }

    export function drawLine(c: CanvasRenderingContext2D, ln: ILine) {
        // curve
        c.lineWidth = GRAPHSTYLE.curve.width;
        c.strokeStyle = ln.color;

        c.beginPath();
        c.moveTo(ln.p1.x, ln.p1.y);

        if (ln.cp2) {
            c.bezierCurveTo(ln.cp1.x, ln.cp1.y, ln.cp2.x, ln.cp2.y, ln.p2.x, ln.p2.y);
        } else {
            c.quadraticCurveTo(ln.cp1.x, ln.cp1.y, ln.p2.x, ln.p2.y);
        }
        c.stroke();
        // c.fillStyle = 'black';
        // c.fill();

        // lines
        c.lineWidth = GRAPHSTYLE.pline.width;
        c.strokeStyle = GRAPHSTYLE.pline.color;

        c.beginPath();
        c.moveTo(ln.p1.x, ln.p1.y);
        c.lineTo(ln.cp1.x, ln.cp1.y);

        if (ln.cp2) {
            c.moveTo(ln.p2.x, ln.p2.y);
            c.lineTo(ln.cp2.x, ln.cp2.y);
        } else {
            c.lineTo(ln.p2.x, ln.p2.y);
        }

        c.stroke();

        // control points
        for (var p in ln) {
            let isControl = p === 'cp1' || p === 'cp2';

            c.lineWidth = isControl ? GRAPHSTYLE.cpoint.width : GRAPHSTYLE.circles.width;
            c.strokeStyle = GRAPHSTYLE.circles.color;
            c.fillStyle = isControl ? GRAPHSTYLE.circles.fill : ln.color;

            let stl = isControl ? GRAPHSTYLE.cpoint : GRAPHSTYLE.point;

            c.beginPath();
            c.arc(ln[p].x, ln[p].y, stl.radius, stl.arc1, stl.arc2, true);
            c.fill();
            c.stroke();
        }
    } //drawLine()

} //namespace Line

namespace GenCode {
    function genLine(l: ILine) {
        return "ctx.beginPath();\n" +
            `ctx.moveTo(${l.p1.x}, ${l.p1.y});\n` +
            (l.cp2 ?
                `ctx.bezierCurveTo(${l.cp1.x}, ${l.cp1.y}, ${l.cp2.x}, ${l.cp2.y}, ${l.p2.x}, ${l.p2.y});\n` :
                `ctx.quadraticCurveTo(${l.cp1.x}, ${l.cp1.y}, ${l.p2.x}, ${l.p2.y});\n`
            ) +
            "ctx.stroke();\n";
    } //genLine()

    function genLineAsArray(l: ILine) {
        return "{ " +
            `p1: {x: ${l.p1.x}, y: ${l.p1.y}}, p2: {x: ${l.p2.x}, y: ${l.p2.y}}, ` +
            (l.cp2 ?
                `cp1: {x: ${l.cp1.x}, y: ${l.cp1.y}}, cp2: {x: ${l.cp2.x}, y: ${l.cp2.y}}` :
                `cp1: {x: ${l.cp1.x}, y: ${l.cp1.y}}`
            ) +
            " }";
    } //genLine()

    function genAll(lines: ILine[]) {
        return JSON.stringify(lines);
    }

    export function showCode(code: HTMLPreElement, lines: ILine[]) {
        if (code) {
            // 1. Build components
            let txt =
                "canvas = document.getElementById('canvas');\n" +
                "ctx = canvas.getContext('2d');\n" +
                `ctx.lineWidth = ${GRAPHSTYLE.curve.width};\n`;

            lines.forEach(ln => txt += `\n${genLine(ln)}`);

            // 2. Build points array
            let body = '\nconst points = [';
            lines.forEach(ln => body += `\n    ${genLineAsArray(ln)},`);
            txt += `${body}\n];`;

            txt += `\n// prev = '${genAll(lines)}';\n\n`;

            // 3. set text to DOM
            code.firstChild.nodeValue = txt;
        }
    } //showCode()
} //namespace GenCode

function main() {

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let code: HTMLPreElement;
    let lines: ILine[] = [];

    function init(nLines: number, quad: boolean, prev?: string) {

        if (prev) {
            lines = JSON.parse(prev);
        } else {
            for (let i = 0; i < nLines; i++) {
                lines.push(Line.initLine(quad, i));
            }
        }

        // line style
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // handlers
        canvas.onmousedown = dragStart;
        canvas.onmousemove = dragging;
        canvas.onmouseup = canvas.onmouseout = dragStop;

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // bg gradient
        let gradient = ctx.createLinearGradient(0, 0, 100, 200);
        gradient.addColorStop(0, 'hsla(68, 46%, 50%, .2)');
        gradient.addColorStop(1, 'hsla(58, 100%, 50%, .1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 500);

        lines.forEach(line => Line.drawLine(ctx, line));

        GenCode.showCode(code, lines);
    }

    // dragging

    let drag = null;
    let dpoint: IPoint;
    let dragLine: ILine;

    function dragStart(event: DragEvent) {
        let pos = mousePos(event);

        // find the nearest point
        for (var i = 0; i < lines.length; i++) {
            var line: ILine = lines[i];

            for (var p in line) {
                if (typeof line[p] === 'string') {
                    continue; // skip color
                }

                let dx = line[p].x - pos.x;
                let dy = line[p].y - pos.y;

                if ((dx * dx) + (dy * dy) < GRAPHSTYLE.point.radius * GRAPHSTYLE.point.radius) {
                    dragLine = line;
                    drag = p;
                    dpoint = pos;
                    //canvas.style.cursor = 'move';
                    canvas.classList.add('cursor-move');
                    return;
                }
            }
        }
    }

    function dragging(event: DragEvent) {
        if (drag) {
            let pos = mousePos(event);
            dragLine[drag].x += pos.x - dpoint.x;
            dragLine[drag].y += pos.y - dpoint.y;
            dpoint = pos;
            draw();
        }
    }

    function dragStop(event: DragEvent) {
        dragLine = null;
        drag = null;
        canvas.style.cursor = 'default';
        draw();
    }


    function mousePos(event: DragEvent): IPoint {
        return {
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop
        }
    }

    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    code = document.getElementById('code') as HTMLPreElement;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        var prev;
        //prev = /*7*/'[{"p1":{"x":126,"y":174},"p2":{"x":121,"y":429},"cp1":{"x":55,"y":246},"cp2":{"x":80,"y":324},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":177,"y":244},"p2":{"x":122,"y":429},"cp1":{"x":136,"y":287},"cp2":{"x":125,"y":329},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":127,"y":174},"p2":{"x":179,"y":243},"cp1":{"x":155,"y":183},"cp2":{"x":167,"y":209},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":164,"y":138},"p2":{"x":223,"y":229},"cp1":{"x":195,"y":145},"cp2":{"x":216,"y":177},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":166,"y":136},"p2":{"x":261,"y":82},"cp1":{"x":191,"y":98},"cp2":{"x":230,"y":91},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":318,"y":174},"p2":{"x":225,"y":230},"cp1":{"x":293,"y":196},"cp2":{"x":266,"y":215},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":262,"y":83},"p2":{"x":319,"y":175},"cp1":{"x":312,"y":98},"cp2":{"x":320,"y":143},"color":"hsla(240, 100%, 50%, 0.95)"}]';
        //prev = '[{"p1":{"x":133,"y":33},"p2":{"x":32,"y":160},"cp1":{"x":78,"y":51},"cp2":{"x":52,"y":81},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":184,"y":89},"p2":{"x":30,"y":162},"cp1":{"x":119,"y":89},"cp2":{"x":79,"y":119},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":134,"y":33},"p2":{"x":189,"y":90},"cp1":{"x":152,"y":54},"cp2":{"x":165,"y":77},"color":"hsla(80, 100%, 50%, 0.95)"}]';
        //prev = '[{"p1":{"x":146,"y":92},"p2":{"x":49,"y":282},"cp1":{"x":46,"y":92},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":147,"y":92},"p2":{"x":196,"y":138},"cp1":{"x":177,"y":102},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":197,"y":139},"p2":{"x":48,"y":285},"cp1":{"x":90,"y":143},"color":"hsla(80, 100%, 50%, 0.95)"}]';
        //prev = /*7 quadratic*/ '[{"p1":{"x":17,"y":281},"p2":{"x":51,"y":53},"cp1":{"x":9,"y":116},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":51,"y":53},"p2":{"x":112,"y":100},"cp1":{"x":105,"y":72},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":111,"y":100},"p2":{"x":16,"y":282},"cp1":{"x":56,"y":161},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":97,"y":23},"p2":{"x":197,"y":18},"cp1":{"x":154,"y":14},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":198,"y":18},"p2":{"x":234,"y":59},"cp1":{"x":238,"y":28},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":234,"y":59},"p2":{"x":157,"y":74},"cp1":{"x":218,"y":77},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":158,"y":75},"p2":{"x":99,"y":23},"cp1":{"x":180,"y":54},"color":"hsla(240, 100%, 50%, 0.95)"}]';
        //prev = /*7 quadratic*/ '[{"p1":{"x":36,"y":279},"p2":{"x":107,"y":84},"cp1":{"x":39,"y":129},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":107,"y":84},"p2":{"x":157,"y":133},"cp1":{"x":139,"y":99},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":157,"y":133},"p2":{"x":36,"y":280},"cp1":{"x":83,"y":173},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":144,"y":54},"p2":{"x":211,"y":16},"cp1":{"x":174,"y":23},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":211,"y":14},"p2":{"x":267,"y":78},"cp1":{"x":249,"y":32},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":266,"y":76},"p2":{"x":197,"y":105},"cp1":{"x":228,"y":81},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":198,"y":106},"p2":{"x":143,"y":54},"cp1":{"x":186,"y":65},"color":"hsla(240, 100%, 50%, 0.95)"}]';

        init(7, canvas.className == 'quadratic', prev);
    }
}

main();
