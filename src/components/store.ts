import { ILine } from "./types";

export function initPersistData(): ILine[][] {
    type OldPoint = {
        p1: { x: number; y: number; };
        p2: { x: number; y: number; };
        cp1: { x: number; y: number; };
        cp2: { x: number; y: number; };
        color: string; //hsla
    };

    const oldStrings: string[] = [
        /*7 bezier   */ '[{"p1":{"x":126,"y":174},"p2":{"x":121,"y":429},"cp1":{"x":55,"y":246},"cp2":{"x":80,"y":324},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":177,"y":244},"p2":{"x":122,"y":429},"cp1":{"x":136,"y":287},"cp2":{"x":125,"y":329},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":127,"y":174},"p2":{"x":179,"y":243},"cp1":{"x":155,"y":183},"cp2":{"x":167,"y":209},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":164,"y":138},"p2":{"x":223,"y":229},"cp1":{"x":195,"y":145},"cp2":{"x":216,"y":177},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":166,"y":136},"p2":{"x":261,"y":82},"cp1":{"x":191,"y":98},"cp2":{"x":230,"y":91},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":318,"y":174},"p2":{"x":225,"y":230},"cp1":{"x":293,"y":196},"cp2":{"x":266,"y":215},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":262,"y":83},"p2":{"x":319,"y":175},"cp1":{"x":312,"y":98},"cp2":{"x":320,"y":143},"color":"hsla(240, 100%, 50%, 0.95)"}]',
        /*3 bezier   */ '[{"p1":{"x":133,"y":33},"p2":{"x":32,"y":160},"cp1":{"x":78,"y":51},"cp2":{"x":52,"y":81},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":184,"y":89},"p2":{"x":30,"y":162},"cp1":{"x":119,"y":89},"cp2":{"x":79,"y":119},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":134,"y":33},"p2":{"x":189,"y":90},"cp1":{"x":152,"y":54},"cp2":{"x":165,"y":77},"color":"hsla(80, 100%, 50%, 0.95)"}]',
        /*3 quadratic*/ '[{"p1":{"x":146,"y":92},"p2":{"x":49,"y":282},"cp1":{"x":46,"y":92},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":147,"y":92},"p2":{"x":196,"y":138},"cp1":{"x":177,"y":102},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":197,"y":139},"p2":{"x":48,"y":285},"cp1":{"x":90,"y":143},"color":"hsla(80, 100%, 50%, 0.95)"}]',
        /*7 quadratic*/ '[{"p1":{"x":17,"y":281},"p2":{"x":51,"y":53},"cp1":{"x":9,"y":116},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":51,"y":53},"p2":{"x":112,"y":100},"cp1":{"x":105,"y":72},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":111,"y":100},"p2":{"x":16,"y":282},"cp1":{"x":56,"y":161},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":97,"y":23},"p2":{"x":197,"y":18},"cp1":{"x":154,"y":14},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":198,"y":18},"p2":{"x":234,"y":59},"cp1":{"x":238,"y":28},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":234,"y":59},"p2":{"x":157,"y":74},"cp1":{"x":218,"y":77},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":158,"y":75},"p2":{"x":99,"y":23},"cp1":{"x":180,"y":54},"color":"hsla(240, 100%, 50%, 0.95)"}]',
        /*7 quadratic*/ '[{"p1":{"x":36,"y":279},"p2":{"x":107,"y":84},"cp1":{"x":39,"y":129},"color":"hsla(0, 100%, 50%, 0.95)"},{"p1":{"x":107,"y":84},"p2":{"x":157,"y":133},"cp1":{"x":139,"y":99},"color":"hsla(40, 100%, 50%, 0.95)"},{"p1":{"x":157,"y":133},"p2":{"x":36,"y":280},"cp1":{"x":83,"y":173},"color":"hsla(80, 100%, 50%, 0.95)"},{"p1":{"x":144,"y":54},"p2":{"x":211,"y":16},"cp1":{"x":174,"y":23},"color":"hsla(120, 100%, 50%, 0.95)"},{"p1":{"x":211,"y":14},"p2":{"x":267,"y":78},"cp1":{"x":249,"y":32},"color":"hsla(160, 100%, 50%, 0.95)"},{"p1":{"x":266,"y":76},"p2":{"x":197,"y":105},"cp1":{"x":228,"y":81},"color":"hsla(200, 100%, 50%, 0.95)"},{"p1":{"x":198,"y":106},"p2":{"x":143,"y":54},"cp1":{"x":186,"y":65},"color":"hsla(240, 100%, 50%, 0.95)"}]',
    ];
    const newLines: ILine[][] = oldStrings.map((str) => {
        const oldLine: OldPoint[] = JSON.parse(str);
        const lines: ILine[] = oldLine.map((oldLine) => {
            const { p1, p2, cp1, cp2, color } = oldLine;
            return { points: { p1, p2, cp1, ...(cp2 && { cp2 }) }, color };
        });
        return lines;
    });
    //console.log('oldLines', newLines);

    return newLines;
}