import { intRange } from "../core/math";
import { TileData, WorldData } from "./world.interface";
import { Tile, World } from "./world.model";

export function fromData(data: WorldData): World {
    const world = <World>{
        yMax: data.yMax,
        xMax: data.xMax,
        tile: data.tile.map(row => row.map(til => {
            const o = {} as Tile;
            o.floorTile = til.floorTile;
            if (til.wallLeft)
                o.wallLeft = { wallpaperS: til.wallLeft.wallpaperS, wallLevel: 'high' };
            if (til.wallRight)
                o.wallRight = { wallpaperS: til.wallRight.wallpaperS, wallLevel: 'high' };
            return o;
        }))
    };

    setWallsCorrect(world);
    return world;
}

export function setWallsCorrect(world: World) {
    let isWallX = intRange(0, world.xMax).map(a => false);
    let isWallY = intRange(0, world.yMax).map(a => false);

    for (let x = 0; x < world.xMax; x++) {
        for (let y = 0; y < world.yMax; y++) {
            const tile = world.tile[x][y];
            if (tile.wallLeft) {
                if (!isWallX[x]) {
                    isWallX[x] = true;
                } else {
                    tile.wallLeft.wallLevel = 'low';
                }

            }
            if (tile.wallRight) {
                if (!isWallY[y]) {
                    isWallY[y] = true;
                } else {
                    tile.wallRight.wallLevel = 'low';
                }
            }
        }
    }

    for (let x = 0; x < world.xMax; x++) {
        for (let y = 0; y < world.yMax; y++) {
            const tile = world.tile[x][y];
            if (tile.wallLeft && world.tile[x][y - 1].wallRight && world.tile[x][y - 1].wallRight.wallLevel == 'high') {
                tile.wallLeft.wallLevel = 'half';
            }
            if (tile.wallRight && world.tile[x - 1][y].wallLeft && world.tile[x - 1][y].wallLeft.wallLevel == 'high') {
                world.tile[x][y].wallRight.wallLevel = 'half';
            }
        }
    }

}
export function toData(data: World): WorldData {
    return <WorldData>{
        yMax: data.yMax,
        xMax: data.xMax,
        tile: data.tile.map(row => row.map(til => {
            const o = {} as TileData;
            o.floorTile = til.floorTile;
            if (til.wallLeft)
                o.wallLeft = { wallpaperS: til.wallLeft.wallpaperS };
            if (til.wallRight)
                o.wallRight = { wallpaperS: til.wallRight.wallpaperS };
            return o;
        }))
    };
}