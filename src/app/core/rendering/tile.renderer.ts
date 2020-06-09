import { GameConfig } from "../../game.config";
import { Tile } from "../../model/world.model";
import { ImgReg } from "./world.renderer";

export const DIRECTIONS = {
    LEFT: 0,
    RIGHT: 1
};

export default class TileRenderer {

    constructor(private imgReg: ImgReg) {
    }

    private renderFloor(context: CanvasRenderingContext2D, tile: Tile, x: number, y: number) {
        this.imgReg.floors.render(tile.floorTile, context, x, y, { grid: GameConfig.showGrid });
    }

    private renderWall(context: CanvasRenderingContext2D, tile: Tile, x: number, y: number) {
        const level = (o) => GameConfig.wallLevel == 'half' ? o : GameConfig.wallLevel
        if (tile.wallLeft) {
            this.imgReg.walls.render(
                tile.wallLeft.wallpaperS,
                context,
                x,
                y,
                {
                    dir: DIRECTIONS.LEFT,
                    wallLevel: level(tile.wallLeft.wallLevel)
                });
        }
        if (tile.wallRight) {
            this.imgReg.walls.render(
                tile.wallRight.wallpaperS,
                context,
                x,
                y,
                {
                    dir: DIRECTIONS.RIGHT,
                    wallLevel: level(tile.wallRight.wallLevel)
                });
        }
    }

    private renderCursor(context: CanvasRenderingContext2D, tile: Tile, x: number, y: number, orgX: number, orgY: number) {

        if (orgX == GameConfig.mousePosTile.x && orgY == GameConfig.mousePosTile.y) {
            const tileImg = this.imgReg['wall_cursor'];
            context.drawImage(tileImg, x + 8, y - 96);
        }

    }

    onTile(context: CanvasRenderingContext2D, tile: Tile): { [key: string]: ({ x, y, orgX, orgY }) => void } {
        return {
            renderFloor: ({ x, y }) => this.renderFloor(context, tile, x, y),
            renderWall: ({ x, y }) => this.renderWall(context, tile, x, y),
            renderCursor: ({ x, y, orgX, orgY }) => this.renderCursor(context, tile, x, y, orgX, orgY)
        }
    }
}