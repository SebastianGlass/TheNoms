export function cross<U, V>(xArr: U[], yArr: V[]): [U, V][] {
    return xArr.reduce((acc, x) => acc.concat(yArr.map(y => [x, y])), []);
}

export function intRange(start: number, end: number): number[] {
    if (start >= end) {
        return [];
    }
    try {
        return Array.from(Array(end - start).keys()).map(a => a + start);
    } catch (e) {
        console.error(e, start, end);
        return [];
    }
}

export function random(n: number): number {
    return Math.floor(n * Math.random());
}

export function indexedGrid(width: number, height: number): number[][] {
    return cross(intRange(0, width), intRange(0, height));
}
