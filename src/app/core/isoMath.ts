
export function toIsoCoord(point: { x: number, y: number }): { x: number, y: number } {

    return {
        x: 16 * (-point.x + point.y) + 400,
        y: 8 * (point.x + point.y) + 0,

    };
}

export function fromIsoCoord(point: { x: number, y: number }): { x: number, y: number } {

    return {
        x: Math.floor((-point.x / 16 + point.y / 8 + 25) / 2),
        y: Math.floor((point.x / 16 + point.y / 8 - 25) / 2),
    };



}
