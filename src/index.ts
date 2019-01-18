function main() {

    interface IPoint {
        x: number;
        y: number;
    }

    interface ICPoint {
        p1: IPoint;
        p2: IPoint;
        cp1?: IPoint;
        cp2?: IPoint;
    }

    let canvas: HTMLCanvasElement,
        c: CanvasRenderingContext2D,
        code: HTMLPreElement,
        point: ICPoint,
        style,
        dpoint: IPoint;

    function init(quad: boolean) {
        point = {
            p1: { x: 20, y: 20 }, /* starting point */
            p2: { x: 370, y: 300 } /* end point */
        };

        if (quad) {
            point.cp1 = { x: 370, y: 20 };
        } else {
            point.cp1 = { x: 70, y: 100 };
            point.cp2 = { x: 70, y: 100 };
        }

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

    function draw() {

        c.clearRect(0, 0, canvas.width, canvas.height);

        // bg gradient
        let gradient = c.createLinearGradient(0, 0, 100, 200);
        gradient.addColorStop(0, 'hsla(68, 46%, 50%, .2)');
        gradient.addColorStop(1, 'hsla(58, 100%, 50%, .1)');
        c.fillStyle = gradient;
        c.fillRect(0, 0, 400, 500);

        // lines
        c.lineWidth = style.pline.width;
        c.strokeStyle = style.pline.color;

        c.beginPath();
        c.moveTo(point.p1.x, point.p1.y);
        c.lineTo(point.cp1.x, point.cp1.y);

        if (point.cp2) {
            c.moveTo(point.p2.x, point.p2.y);
            c.lineTo(point.cp2.x, point.cp2.y);
        } else {
            c.lineTo(point.p2.x, point.p2.y);
        }

        c.stroke();

        // curve
        c.lineWidth = style.curve.width;
        c.strokeStyle = style.curve.color;

        c.beginPath();
        c.moveTo(point.p1.x, point.p1.y);

        if (point.cp2) {
            c.bezierCurveTo(point.cp1.x, point.cp1.y, point.cp2.x, point.cp2.y, point.p2.x, point.p2.y);
        } else {
            c.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
        }
        c.stroke();

        // control points
        for (var p in point) {
            c.lineWidth = style.circles.width;
            c.strokeStyle = style.circles.color;
            c.fillStyle = style.circles.fill;

            c.beginPath();
            c.arc(point[p].x, point[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
            c.fill();
            c.stroke();
        }

        showCode();
    }

    function showCode() {

        if (code) {
            code.firstChild.nodeValue =
                "canvas = document.getElementById('canvas');\n" +
                "c = canvas.getContext('2d');\n" +
                `c.lineWidth = ${style.curve.width};\n` +
                "c.beginPath();\n" +
                `c.moveTo(${point.p1.x}, ${point.p1.y});\n` +
                (point.cp2 ?
                    `c.bezierCurveTo(${point.cp1.x}, ${point.cp1.y}, ${point.cp2.x}, ${point.cp2.y}, ${point.p2.x}, ${point.p2.y});` :
                    `c.quadraticCurveTo(${point.cp1.x}, ${point.cp1.y}, ${point.p2.x}, ${point.p2.y});`
                ) +
                "\nc.stroke();";
        }
    } //showCode()

    // dragging

    let drag = null;

    function dragStart(event) {
        event = mousePos(event);

        // find nearest point
        var dx, dy;
        for (var p in point) {
            dx = point[p].x - event.x;
            dy = point[p].y - event.y;

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
            point[drag].x += event.x - dpoint.x;
            point[drag].y += event.y - dpoint.y;
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
