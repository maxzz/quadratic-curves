function main() {

    interface IPoint {
        x: number;
        y: number;
    }

    interface ILine {
        p1: IPoint;
        p2: IPoint;
        cp1?: IPoint;
        cp2?: IPoint;
    }

    let canvas: HTMLCanvasElement,
        c: CanvasRenderingContext2D,
        code: HTMLPreElement,
        line: ILine,
        style = {
            curve: {
                width: 6,
                color: 'hsla(216, 91%, 50%, 0.95)'
            },
            circles: {
                width: 6,
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
            }
        };

    function initLine(quad: boolean): ILine {
        let line: ILine = {
            p1: { x: 20, y: 20 }, /* starting point */
            p2: { x: 370, y: 300 } /* end point */
        };

        if (quad) {
            line.cp1 = { x: 370, y: 20 };
        } else {
            line.cp1 = { x: 70, y: 100 };
            line.cp2 = { x: 70, y: 100 };
        }

        return line;
    }

    function init(quad: boolean) {
        line = initLine(quad);

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

        // curve
        c.lineWidth = style.curve.width;
        c.strokeStyle = style.curve.color;

        c.beginPath();
        c.moveTo(ln.p1.x, ln.p1.y);

        if (ln.cp2) {
            c.bezierCurveTo(ln.cp1.x, ln.cp1.y, ln.cp2.x, ln.cp2.y, ln.p2.x, ln.p2.y);
        } else {
            c.quadraticCurveTo(ln.cp1.x, ln.cp1.y, ln.p2.x, ln.p2.y);
        }
        c.stroke();

        // control points
        for (var p in ln) {
            c.lineWidth = style.circles.width;
            c.strokeStyle = style.circles.color;
            c.fillStyle = style.circles.fill;

            c.beginPath();
            c.arc(ln[p].x, ln[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
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

        drawLine(line);

        showCode();
    }

    function genLine(l: ILine) {
        return "c.beginPath();\n" +
            `c.moveTo(${l.p1.x}, ${l.p1.y});\n` +
            (l.cp2 ?
                `c.bezierCurveTo(${l.cp1.x}, ${l.cp1.y}, ${l.cp2.x}, ${l.cp2.y}, ${l.p2.x}, ${l.p2.y});\n` :
                `c.quadraticCurveTo(${l.cp1.x}, ${l.cp1.y}, ${l.p2.x}, ${l.p2.y});\n`
            ) +
            "c.stroke();";
    } //genLine()

    function showCode() {
        if (code) {
            let txt = 
                "canvas = document.getElementById('canvas');\n" +
                "c = canvas.getContext('2d');\n" +
                `c.lineWidth = ${style.curve.width};\n`;

            txt += genLine(line);

            code.firstChild.nodeValue = txt;
        }
    } //showCode()

    // dragging

    let drag = null;
    let dpoint: IPoint;

    function dragStart(event) {
        event = mousePos(event);

        // find nearest point
        var dx, dy;
        for (var p in line) {
            dx = line[p].x - event.x;
            dy = line[p].y - event.y;

            if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
                drag = p;
                dpoint = event;
                canvas.style.cursor = 'move';
                return;
            }
        }
    }

    function dragging(event) {
        if (drag) {
            event = mousePos(event);
            line[drag].x += event.x - dpoint.x;
            line[drag].y += event.y - dpoint.y;
            dpoint = event;

            draw();
        }
    }

    function dragStop(event) {
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
        init(canvas.className == 'quadratic');
    }
}

main();
