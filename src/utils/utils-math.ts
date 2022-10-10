export function degToRad(degrees: number) {
	return degrees * Math.PI / 180;
}

export function radToDeg(radians: number) {
	return radians * 180 / Math.PI;
}

export function clamp(min: number, val: number, max: number) {
	return Math.min(Math.max(val, min), max);
}
