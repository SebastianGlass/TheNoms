export interface TileData {
    wallLeft: {
        wallpaperS: string;
    };
    wallRight: {
        wallpaperS: string;
    };
    floorTile: string;

}

export interface WorldData {
    tile: TileData[][];
    xMax: number;
    yMax: number;
}