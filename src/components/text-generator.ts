import { AppContext, Scene, SingleCurve, XY } from "./types";
import { GRAPHSTYLE } from "./initials";

const pt = ([x, y]: XY) => `${x},${y}`;
const formatPt = ([x, y]: XY) => `${`${x}`.padStart(3, ' ')},${`${y}`.padStart(3, ' ')}`;
const allToString = (scene: Scene) => JSON.stringify(scene);

function gen1_JSCode(scene: Scene, lineWidth: number) {
    function genLine(line: SingleCurve) {
        const [p1, p2, c1, c2] = line.points;
        const path = c2
            ? `ctx.bezierCurveTo(${c1[0]}, ${c1[1]}, ${c2[0]}, ${c2[1]}, ${p2[0]}, ${p2[1]});`
            : `ctx.quadraticCurveTo(${c1[0]}, ${c1[1]}, ${p2[0]}, ${p2[1]});`;

        return `ctx.beginPath();\nctx.moveTo(${p1[0]}, ${p1[1]});\n${path}\nctx.stroke();`;
    }

    return (
        "canvas = document.getElementById('canvas');\n" +
        "ctx = canvas.getContext('2d');\n" +
        `ctx.lineWidth = ${lineWidth};\n` +
        scene.map((line) => `\n${genLine(line)}`).join('\n')
    );
}

function gen2_PointsArray(scene: Scene) {
    function genLineAsArray(line: SingleCurve) {
        const [p1, p2, c1, c2] = line.points;
        const more = c2 ? ` [${formatPt(c2)}]` : '';
        return `{points: [ [${formatPt(p1)}], [${formatPt(p2)}], [${formatPt(c1)}],${more} ]}`;
    }

    return `const points = [\n${scene.map((line) => `    ${genLineAsArray(line)},`).join('\n')}\n];`;
}

function gen3_Current(scene: Scene) {
    return `'${allToString(scene)}',`; // return `const current = [\n    '${allToString(scene)}',\n];`;
}

function gen4_Persistent(scene: Scene[]) {
    const allCurves = scene.map((sceneCurves, idx) => `   /* ${`${idx + 1}`.padStart(2, ' ')} */ '${allToString(sceneCurves)}',`).join('\n'); // idx 0 for predefined
    return `const persistent = [\n${allCurves}\n];`;
}

// function generateCodeText(scene: Scene, scenes: Scene[]): string {
//     const txt1 = gen1_JSCode(scene, GRAPHSTYLE.curve.width);
//     const txt2 = gen2_PointsArray(scene);
//     const txt3 = gen3_Current(scene);
//     const txt4 = gen4_Persistent(scenes);
//     return `${txt3}\n\n${txt4}\n\n${txt2}\n\n${txt1}\n\n`;
// }

export function initCodeGeneratorEvents(appContext: AppContext) {
    const btns = ['#btn-code0', '#btn-code1', '#btn-code2', '#btn-code3'].map((selector) => document.querySelector(selector) as HTMLButtonElement).filter(Boolean);
    if (btns.length !== 4) {
        console.error('cannot init code buttons');
        return;
    }

    function setActive(id: number) {
        appContext.codeType = id;
        btns.forEach((thisBtn) => thisBtn.dataset.state = +(thisBtn.dataset.code || 0) === id ? 'checked' : 'unchecked');
    }
    appContext.setActiveCodeGenerator = setActive;

    btns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const id = +((event.currentTarget as HTMLElement).dataset.code || 0);
            setActive(id);
            updateGenCode(appContext);
        });
    });

    appContext.btnCopy.addEventListener('click', () => navigator.clipboard.writeText(appContext.code.innerText));
}

export function updateGenCode(appContext: AppContext) {
    const scene = appContext.scenes[appContext.current] || [];
    let txt = ''; //generateCodeText(scene, appContext.scenes)

    switch (appContext.codeType) {
        case 0: { txt = gen3_Current(scene); break; }
        case 1: { txt = gen2_PointsArray(scene); break; }
        case 2: { txt = gen1_JSCode(scene, GRAPHSTYLE.curve.width); break; }
        case 3: { txt = gen4_Persistent(appContext.scenes); break; }
    }

    appContext.code.innerText = txt;
}
