import { fromIsoCoord, toIsoCoord } from './isoMath';

describe('isoMath', () => {
    it('should be able to transform and retransform points', () => {
        const data = [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 0, y: 20 }, { x: 20, y: 20 }];
        data.forEach(point => {
            const pointTransformed = fromIsoCoord(toIsoCoord(point));
            expect(pointTransformed).toEqual(point);
        })
    });
})