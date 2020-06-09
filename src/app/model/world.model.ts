export class Tile {
    wallLeft: {
        wallpaperS: string;
        wallLevel: string;
    };
    wallRight: {
        wallpaperS: string;
        wallLevel: string;
    };

    constructor(public floorTile: string) {
    }
}

export class World {
    tile: Tile[][] = [];
    xMax: number;
    yMax: number;

    constructor(x, y) {
        this.xMax = x;
        this.yMax = y;
        for (let x = 0; x < this.xMax; x++) {
            for (let y = 0; y < this.yMax; y++) {
                if (!this.tile[x]) this.tile[x] = [];
                this.tile[x][y] = new Tile('grass');
            }
        }
    }
}