export const GRAPHSTYLE = {
    curve: {
        width: 6,
        color: 'hsla(216, 91%, 50%, 0.95)',
    },
    circles: {
        width: 1,
        color: '#000',
        fill: 'hsla(60, 93%, 50%, .35)',
    },
    ctrlLine: {
        width: 1,
        color: '',
    },
    point: {
        radius: 15,
        width: 5,
        color: 'hsla(205, 98%, 50%, 0.95)',
        fill: 'rgba(200, 0, 200, .9)',
        startAngle: 0,
        endAngle: 2 * Math.PI,
    },
    cpoint: { // control point
        radius: 10,
        width: 2,
        color: 'hsla(205, 98%, 50%, 0.95)',
        fill: 'rgba(200, 0, 200, .9)',
        startAngle: 0,
        endAngle: 2 * Math.PI,
    }
} as const;

export function hue(h: number) {
    return `hsla(${h}, 100%, 50%, 0.95)`;
}
