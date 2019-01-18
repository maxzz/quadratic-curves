function main() {

    interface IPoint {
        x: number;
        y: number;
    }

    interface ILine {
        p1: IPoint; /* starting point */
        p2: IPoint; /* end point */
        cp1?: IPoint;
        cp2?: IPoint;
        color?: string;
    }

    function hue(h: number) {
        return `hsla(${h}, 100%, 50%, 0.95)`;
    }

    let defLine: ILine = {
        p1: {x: 39, y: 18},
        p2: {x: 49, y: 282},
        cp1: {x: 9, y: 116},
        cp2: {x: 15, y: 195},
        color: hue(10)
    };

    let canvas: HTMLCanvasElement,
        c: CanvasRenderingContext2D,
        code: HTMLPreElement,
        lines: ILine[] = [],
        style = {
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
        };

    function initLine(quad: boolean, n: number): ILine {
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

    function init(nLines: number, quad: boolean, prev?: string) {

        if (prev) {
            lines = JSON.parse(prev);
        } else {
            for (let i = 0; i < nLines; i++) {
                lines.push(initLine(quad, i));
            }
        }

        // line style
        c.lineCap = 'round';
        c.lineJoin = 'round';

        // handlers
        canvas.onmousedown = dragStart;
        canvas.onmousemove = dragging;
        canvas.onmouseup = canvas.onmouseout = dragStop;

        draw();
    }

    function drawLine(ln: ILine) {
        // curve
        c.lineWidth = style.curve.width;
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
        c.lineWidth = style.pline.width;
        c.strokeStyle = style.pline.color;

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

            c.lineWidth = isControl ? style.cpoint.width : style.circles.width;
            c.strokeStyle = style.circles.color;
            c.fillStyle = isControl ? style.circles.fill : ln.color;

            let stl = isControl ? style.cpoint : style.point;

            c.beginPath();
            c.arc(ln[p].x, ln[p].y, stl.radius, stl.arc1, stl.arc2, true);
            c.fill();
            c.stroke();
        }
    } //drawLine()

    function draw() {
        c.clearRect(0, 0, canvas.width, canvas.height);

        // bg gradient
        let gradient = c.createLinearGradient(0, 0, 100, 200);
        gradient.addColorStop(0, 'hsla(68, 46%, 50%, .2)');
        gradient.addColorStop(1, 'hsla(58, 100%, 50%, .1)');
        c.fillStyle = gradient;
        c.fillRect(0, 0, 400, 500);

        lines.forEach(line => drawLine(line));

        showCode();
    }

    function genLine(l: ILine) {
        return "c.beginPath();\n" +
            `c.moveTo(${l.p1.x}, ${l.p1.y});\n` +
            (l.cp2 ?
                `c.bezierCurveTo(${l.cp1.x}, ${l.cp1.y}, ${l.cp2.x}, ${l.cp2.y}, ${l.p2.x}, ${l.p2.y});\n` :
                `c.quadraticCurveTo(${l.cp1.x}, ${l.cp1.y}, ${l.p2.x}, ${l.p2.y});\n`
            ) +
            "c.stroke();\n";
    } //genLine()

    function genAll() {
        return JSON.stringify(lines);
    }

    function showCode() {
        if (code) {
            let txt =
                "canvas = document.getElementById('canvas');\n" +
                "c = canvas.getContext('2d');\n" +
                `c.lineWidth = ${style.curve.width};\n`;

            lines.forEach(ln => txt += `\n${genLine(ln)}\n`);

            txt += `\n// ${genAll()}\n`;

            code.firstChild.nodeValue = txt;
        }
    } //showCode()

    // dragging

    let drag = null;
    let dpoint: IPoint;
    let dragLine: ILine;

    function dragStart(event) {
        event = mousePos(event);

        // find the nearest point
        var dx, dy;
        for (var i = 0; i < lines.length; i++) {
            var line: ILine = lines[i];

            for (var p in line) {
                if (typeof line[p] === 'string') {
                    continue; // skip color
                }

                dx = line[p].x - event.x;
                dy = line[p].y - event.y;

                if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
                    dragLine = line;
                    drag = p;
                    dpoint = event;
                    canvas.style.cursor = 'move';
                    return;
                }
            }
        }
    }

    function dragging(event) {
        if (drag) {
            event = mousePos(event);
            dragLine[drag].x += event.x - dpoint.x;
            dragLine[drag].y += event.y - dpoint.y;
            dpoint = event;

            draw();
        }
    }

    function dragStop(event) {
        dragLine = null;
        drag = null;
        canvas.style.cursor = 'default';

        draw();
    }


    function mousePos(event): IPoint {
        event = event ? event : window.event;
        return {
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop
        }
    }


    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    code = document.getElementById('code') as HTMLPreElement;

    if (canvas.getContext) {
        c = canvas.getContext('2d');

        let prev = '[{"p1":{"x":126,"y":174},"p2":{"x":121,"y":429},"cp1":{"x":55,"y":246},"cp2":{"x":80,"y":324},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":177,"y":244},"p2":{"x":122,"y":429},"cp1":{"x":136,"y":287},"cp2":{"x":125,"y":329},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":127,"y":174},"p2":{"x":179,"y":243},"cp1":{"x":155,"y":183},"cp2":{"x":167,"y":209},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":164,"y":138},"p2":{"x":223,"y":229},"cp1":{"x":195,"y":145},"cp2":{"x":216,"y":177},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":166,"y":136},"p2":{"x":261,"y":82},"cp1":{"x":191,"y":98},"cp2":{"x":230,"y":91},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":318,"y":174},"p2":{"x":225,"y":230},"cp1":{"x":293,"y":196},"cp2":{"x":266,"y":215},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":262,"y":83},"p2":{"x":319,"y":175},"cp1":{"x":312,"y":98},"cp2":{"x":320,"y":143},"color":"hsla(240, 100%, 50%, 0.95)"}]';
        //let prev;

        init(7, canvas.className == 'quadratic', prev);
    }
}

main();
