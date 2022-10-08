import { CurvePoints, ILine, IPoint, LinePoints } from "./types";

export function initPersistData(): ILine[][] {
    type OldPoint = {
        p1: IPoint;
        p2: IPoint;
        cp1: IPoint;
        cp2: IPoint;
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
            const newLine: CurvePoints = [[p1.x, p1.y], [p2.x, p2.y], [cp1.x, cp1.y],];
            cp2 && newLine.push([cp2.x, cp2.y]);
            
            //return { points: { p1, p2, cp1, ...(cp2 && { cp2 }) }, color };
            return { points: newLine, color };
        });

        return lines;
    });
    //console.log('oldLines', newLines);

    const newStrings: string[] = [
        '[{"points":{"p1":{"x":106,"y":654},"p2":{"x":39,"y":324},"cp1":{"x":452,"y":334}},"color":"hsla(0, 100%, 50%, 0.95)"},{"points":{"p1":{"x":39,"y":324},"p2":{"x":512,"y":160},"cp1":{"x":60,"y":561}},"color":"hsla(40, 100%, 50%, 0.95)"},{"points":{"p1":{"x":512,"y":160},"p2":{"x":106,"y":655},"cp1":{"x":619,"y":645}},"color":"hsla(80, 100%, 50%, 0.95)"},{"points":{"p1":{"x":145,"y":133},"p2":{"x":212,"y":78},"cp1":{"x":38,"y":55}},"color":"hsla(120, 100%, 50%, 0.95)"},{"points":{"p1":{"x":212,"y":76},"p2":{"x":252,"y":142},"cp1":{"x":477,"y":66}},"color":"hsla(160, 100%, 50%, 0.95)"},{"points":{"p1":{"x":251,"y":140},"p2":{"x":188,"y":187},"cp1":{"x":313,"y":267}},"color":"hsla(200, 100%, 50%, 0.95)"},{"points":{"p1":{"x":189,"y":188},"p2":{"x":144,"y":133},"cp1":{"x":40,"y":326}},"color":"hsla(240, 100%, 50%, 0.95)"}]',
        '[{"points":{"p1":{"x":589,"y":37},"p2":{"x":32,"y":160},"cp1":{"x":51,"y":31},"cp2":{"x":602,"y":178}},"color":"hsla(0, 100%, 50%, 0.95)"},{"points":{"p1":{"x":412,"y":394},"p2":{"x":30,"y":162},"cp1":{"x":313,"y":140},"cp2":{"x":30,"y":378}},"color":"hsla(40, 100%, 50%, 0.95)"},{"points":{"p1":{"x":590,"y":37},"p2":{"x":417,"y":395},"cp1":{"x":325,"y":35},"cp2":{"x":599,"y":402}},"color":"hsla(80, 100%, 50%, 0.95)"}]',
        '[{"points":{"p1":{"x":687,"y":309},"p2":{"x":56,"y":664},"cp1":{"x":51,"y":31},"cp2":{"x":602,"y":178}},"color":"hsla(0, 100%, 50%, 0.95)"},{"points":{"p1":{"x":486,"y":664},"p2":{"x":54,"y":666},"cp1":{"x":98,"y":111},"cp2":{"x":30,"y":378}},"color":"hsla(40, 100%, 50%, 0.95)"},{"points":{"p1":{"x":688,"y":309},"p2":{"x":485,"y":665},"cp1":{"x":99,"y":110},"cp2":{"x":76,"y":478}},"color":"hsla(80, 100%, 50%, 0.95)"}]',
        '[{"points":{"p1":{"x":119,"y":16},"p2":{"x":270,"y":304},"cp1":{"x":9,"y":116},"cp2":{"x":41,"y":293}},"color":"hsla(0, 100%, 50%, 0.95)"},{"points":{"p1":{"x":119,"y":18},"p2":{"x":271,"y":300},"cp1":{"x":89,"y":116},"cp2":{"x":111,"y":281}},"color":"hsla(40, 100%, 50%, 0.95)"},{"points":{"p1":{"x":199,"y":18},"p2":{"x":264,"y":301},"cp1":{"x":169,"y":116},"cp2":{"x":175,"y":195}},"color":"hsla(80, 100%, 50%, 0.95)"},{"points":{"p1":{"x":266,"y":18},"p2":{"x":269,"y":300},"cp1":{"x":262,"y":118},"cp2":{"x":262,"y":197}},"color":"hsla(120, 100%, 50%, 0.95)"},{"points":{"p1":{"x":359,"y":18},"p2":{"x":278,"y":299},"cp1":{"x":365,"y":125},"cp2":{"x":335,"y":195}},"color":"hsla(160, 100%, 50%, 0.95)"},{"points":{"p1":{"x":439,"y":18},"p2":{"x":275,"y":297},"cp1":{"x":409,"y":116},"cp2":{"x":434,"y":265}},"color":"hsla(200, 100%, 50%, 0.95)"},{"points":{"p1":{"x":438,"y":19},"p2":{"x":271,"y":300},"cp1":{"x":525,"y":112},"cp2":{"x":521,"y":277}},"color":"hsla(240, 100%, 50%, 0.95)"}]',
    ];

    newStrings.forEach((str) => {
        type OldLine = {
            points: LinePoints;
            color?: string;
        };

        const oldLines = JSON.parse(str) as OldLine[];

        const newLines2: ILine[] = oldLines.map((oldLine) => {
            const { points: {p1, p2, cp1, cp2} , color } = oldLine;
            const newLine: CurvePoints = [[p1.x, p1.y], [p2.x, p2.y], [cp1.x, cp1.y],];
            cp2 && newLine.push([cp2.x, cp2.y]);

            //return { points: { p1, p2, cp1, ...(cp2 && { cp2 }) }, color };
            return { points: newLine, color };
        });

        newLines.push(newLines2);
    });

    return newLines;
}
